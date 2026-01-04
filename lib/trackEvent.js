// lib/trackEvent.js
// Client-side utility for tracking user events

// Generate a session ID that persists during the browser session
function getSessionId() {
  if (typeof window === 'undefined') return null;
  
  let sessionId = sessionStorage.getItem('analytics_session_id');
  
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  
  return sessionId;
}

// Main tracking function - this is what you'll call to send events
export async function trackEvent(eventType, metadata = {}) {
  // Only run in browser
  if (typeof window === 'undefined') {
    console.log('[trackEvent] Skipping - not in browser');
    return;
  }

  try {
    const page = window.location.pathname;
    
    const eventData = {
      eventType,
      page,
      sessionId: getSessionId(),
      metadata
    };
    
    console.log('[trackEvent] Sending event:', eventData);
    
    // Send event to our API endpoint
    const response = await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
      keepalive: true
    });
    
    // Check if request was successful
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error('[trackEvent] API error:', response.status, errorData);
      return;
    }
    
    const result = await response.json();
    console.log('[trackEvent] Success:', result);
    
  } catch (error) {
    console.error('[trackEvent] Failed:', error);
  }
}

// Convenience function for page views
export function trackPageView(metadata = {}) {
  trackEvent('page_view', metadata);
}

// Convenience function for clicks
export function trackClick(elementName, metadata = {}) {
  trackEvent('click', {
    element: elementName,
    ...metadata
  });
}