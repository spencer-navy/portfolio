// lib/trackEvent.js
// Simple client-side event tracking utility

function getSessionId() {
  if (typeof window === 'undefined') return null;

  let sessionId = sessionStorage.getItem('analytics_session_id');

  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }

  return sessionId;
}

function getOriginalReferrer() {
  if (typeof window === 'undefined') return '';

  // Check if we already captured the original referrer in this session
  let originalReferrer = sessionStorage.getItem('analytics_original_referrer');

  if (originalReferrer === null) {
    // First time in this session - capture the referrer
    const currentReferrer = document.referrer || '';
    const currentHost = window.location.hostname;

    // Store the referrer if it exists
    // Filter: only keep it if it's NOT from the same site
    if (currentReferrer) {
      // Check if the referrer is from an external site
      try {
        const referrerUrl = new URL(currentReferrer);
        const isExternalReferrer = referrerUrl.hostname !== currentHost;
        originalReferrer = isExternalReferrer ? currentReferrer : '';
      } catch (e) {
        // If URL parsing fails, store the referrer as-is
        originalReferrer = currentReferrer;
      }
    } else {
      originalReferrer = ''; // Direct visit
    }

    sessionStorage.setItem('analytics_original_referrer', originalReferrer);
  }

  return originalReferrer;
}

function isLocalhost() {
  if (typeof window === 'undefined') return false;
  const hostname = window.location.hostname;
  return hostname === 'localhost' || hostname === '127.0.0.1';
}

export async function trackEvent(eventType, metadata = {}) {
  // Skip if not in browser or on localhost
  if (typeof window === 'undefined' || isLocalhost()) {
    return;
  }

  try {
    const referrer = getOriginalReferrer();

    // Debug: log referrer info (remove this later)
    if (process.env.NODE_ENV === 'development') {
      console.log('[trackEvent] Referrer captured:', {
        documentReferrer: document.referrer,
        storedReferrer: referrer,
        currentUrl: window.location.href
      });
    }

    const eventData = {
      eventType,
      page: window.location.pathname,
      sessionId: getSessionId(),
      referrer: referrer,
      metadata
    };

    await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
      keepalive: true
    });

  } catch (error) {
    // Silently fail - don't break the user experience
  }
}

export function trackPageView(metadata = {}) {
  trackEvent('page_view', metadata);
}

export function trackClick(elementName, metadata = {}) {
  trackEvent('click', { element: elementName, ...metadata });
}