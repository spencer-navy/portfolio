// lib/trackEvent.js
// Enhanced client-side event tracking with batched heartbeats

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

  const cachedReferrer = sessionStorage.getItem('analytics_original_referrer');

  if (cachedReferrer) {
    return cachedReferrer;
  }

  const currentReferrer = document.referrer || '';
  const currentHost = window.location.hostname;

  let originalReferrer = '';

  if (currentReferrer) {
    try {
      const referrerUrl = new URL(currentReferrer);
      const isExternalReferrer = referrerUrl.hostname !== currentHost;
      originalReferrer = isExternalReferrer ? currentReferrer : '';
    } catch (e) {
      originalReferrer = currentReferrer;
    }
  }

  if (originalReferrer) {
    sessionStorage.setItem('analytics_original_referrer', originalReferrer);
  }

  return originalReferrer;
}

function isLocalhost() {
  if (typeof window === 'undefined') return false;
  const hostname = window.location.hostname;
  return hostname === 'localhost' || hostname === '127.0.0.1';
}

// Track recent events to prevent duplicates
const recentEvents = new Map();

// Core event tracking function
export async function trackEvent(eventType, metadata = {}) {
  // Skip if not in browser or on localhost
  if (typeof window === 'undefined' || isLocalhost()) {
    return;
  }

  try {
    const referrer = getOriginalReferrer();

    // Create a unique key for this event
    const eventKey = `${eventType}_${window.location.pathname}_${JSON.stringify(metadata)}`;
    const now = Date.now();

    // Check if we recently sent this exact event (within 2 seconds)
    const lastSent = recentEvents.get(eventKey);
    if (lastSent && (now - lastSent) < 2000) {
      console.log('[DEBUG] Skipping duplicate event:', eventKey);
      return;
    }

    // Record this event
    recentEvents.set(eventKey, now);

    // Clean up old entries
    if (recentEvents.size > 50) {
      const oldestKey = recentEvents.keys().next().value;
      recentEvents.delete(oldestKey);
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
    // Silently fail
    console.error('[trackEvent] Error:', error);
  }
}

// ============================================================================
// HEARTBEAT TRACKER CLASS
// Tracks user engagement with batched heartbeats and smart flushing
// ============================================================================

class HeartbeatTracker {
  constructor() {
    if (typeof window === 'undefined' || isLocalhost()) {
      this.disabled = true;
      return;
    }

    this.disabled = false;
    this.currentPage = window.location.pathname;
    this.heartbeatCount = 0;
    this.batchStartTime = Date.now();
    this.pageLoadTime = Date.now();
    this.heartbeatInterval = null;
    this.batchFlushInterval = null;
    this.isPageVisible = true;

    this.init();
  }

  init() {
    if (this.disabled) return;

    console.log('[HeartbeatTracker] Initialized for', this.currentPage);

    // Start counting heartbeats every 5 seconds
    this.startHeartbeat();

    // Track page visibility (pause when hidden)
    this.setupVisibilityTracking();

    // Flush batch on navigation
    this.setupNavigationTracking();

    // Flush on page exit
    this.setupExitTracking();

    // Track scroll milestones
    this.setupScrollTracking();
  }

  startHeartbeat() {
    // Count heartbeats every 5 seconds (stored locally)
    this.heartbeatInterval = setInterval(() => {
      if (this.isPageVisible) {
        this.heartbeatCount++;
        console.log(`💓 Heartbeat ${this.heartbeatCount} on ${this.currentPage}`);
      }
    }, 5000);

    // Flush batch every 30 seconds (send to server)
    this.batchFlushInterval = setInterval(() => {
      this.flushBatch();
    }, 30000);
  }

  setupVisibilityTracking() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        console.log('[HeartbeatTracker] Page hidden - pausing heartbeats');
        this.isPageVisible = false;

        // Flush current batch when user leaves
        this.flushBatch();

        trackEvent('page_hidden', {
          page: this.currentPage,
          timeOnPage: Math.floor((Date.now() - this.pageLoadTime) / 1000)
        });
      } else {
        console.log('[HeartbeatTracker] Page visible - resuming heartbeats');
        this.isPageVisible = true;

        trackEvent('page_visible', {
          page: this.currentPage,
          timeOnPage: Math.floor((Date.now() - this.pageLoadTime) / 1000)
        });
      }
    });
  }

  setupNavigationTracking() {
    // Detect navigation clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && link.href) {
        try {
          const newPage = new URL(link.href).pathname;

          // If navigating to different page on same site
          if (newPage !== this.currentPage && link.href.includes(window.location.origin)) {
            console.log(`🔄 Navigation detected: ${this.currentPage} → ${newPage}`);

            // FLUSH BATCH before navigation
            this.flushBatch();

            // Track navigation
            trackEvent('navigation_click', {
              from: this.currentPage,
              to: newPage,
              linkText: link.textContent.trim().substring(0, 100)
            });

            // Update current page
            this.currentPage = newPage;
            this.pageLoadTime = Date.now();
          }
        } catch (e) {
          // Invalid URL, ignore
        }
      }
    });
  }

  setupExitTracking() {
    window.addEventListener('beforeunload', () => {
      // Flush any remaining heartbeats
      this.flushBatch(true);

      // Track final exit
      const eventData = {
        eventType: 'page_exit',
        page: this.currentPage,
        sessionId: getSessionId(),
        referrer: getOriginalReferrer(),
        metadata: {
          totalTimeOnPage: Math.floor((Date.now() - this.pageLoadTime) / 1000)
        }
      };

      // Use sendBeacon with Blob (guaranteed to send even when closing)
      const blob = new Blob([JSON.stringify(eventData)], {
        type: 'application/json'
      });
      navigator.sendBeacon('/api/events', blob);
    });
  }

  setupScrollTracking() {
    let milestones = { 25: false, 50: false, 75: false, 90: false };

    window.addEventListener('scroll', () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

      Object.keys(milestones).forEach(milestone => {
        if (scrollPercent >= milestone && !milestones[milestone]) {
          milestones[milestone] = true;

          const secondsSinceLoad = Math.floor((Date.now() - this.pageLoadTime) / 1000);

          console.log(`📜 Scroll milestone: ${milestone}% at ${secondsSinceLoad}s`);

          trackEvent('scroll_milestone', {
            page: this.currentPage,
            milestone: parseInt(milestone),
            secondsSinceLoad: secondsSinceLoad,
            scrollPercent: Math.floor(scrollPercent)
          });

          // Flush batch on major milestones (optional - reduces batching efficiency)
          // Uncomment if you want immediate flushing on 50% and 90%
          // if (milestone >= 50) {
          //   this.flushBatch();
          // }
        }
      });
    }, { passive: true });
  }

flushBatch(useBeacon = false) {
  if (this.heartbeatCount === 0) return;

  const now = Date.now();
  const actualDuration = Math.floor((now - this.batchStartTime) / 1000);

  console.log(`📤 Flushing batch: ${this.heartbeatCount} intervals = ${this.heartbeatCount * 5}s on ${this.currentPage}`);

  const eventData = {
    eventType: 'heartbeat_batch',
    page: this.currentPage,
    sessionId: getSessionId(),
    referrer: getOriginalReferrer(),
    metadata: {
      intervals: this.heartbeatCount,
      totalSeconds: this.heartbeatCount * 5,
      actualDuration: actualDuration,
      startTime: new Date(this.batchStartTime).toISOString(),
      endTime: new Date(now).toISOString()
    }
  };

  if (useBeacon) {
    // Use Blob for sendBeacon to set proper content type
    const blob = new Blob([JSON.stringify(eventData)], {
      type: 'application/json'
    });
    navigator.sendBeacon('/api/events', blob);
  } else {
    fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
      keepalive: true
    }).catch(err => console.error('[HeartbeatTracker] Flush error:', err));
  }

  // Reset batch
  this.heartbeatCount = 0;
  this.batchStartTime = now;
}

  destroy() {
    if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
    if (this.batchFlushInterval) clearInterval(this.batchFlushInterval);
  }
}

// Initialize heartbeat tracker (singleton)
let heartbeatTracker = null;

export function initializeHeartbeatTracking() {
  if (typeof window !== 'undefined' && !isLocalhost() && !heartbeatTracker) {
    heartbeatTracker = new HeartbeatTracker();
    console.log('[HeartbeatTracker] ✅ Initialized');
  }
}

// ============================================================================
// CONVENIENCE FUNCTIONS
// ============================================================================

export function trackPageView(metadata = {}) {
  trackEvent('page_view', metadata);
}

export function trackClick(elementName, metadata = {}) {
  trackEvent('click', { element: elementName, ...metadata });
}

export function trackProjectClick(projectId, projectTitle, metadata = {}) {
  trackEvent('project_click', {
    projectId,
    projectTitle,
    secondsSinceLoad: Math.floor((Date.now() - (heartbeatTracker?.pageLoadTime || Date.now())) / 1000),
    ...metadata
  });
}

export function trackFilterClick(filterId, filterValue, resultCount, metadata = {}) {
  trackEvent('filter_click', {
    filterId,
    filterValue,
    resultCount,
    ...metadata
  });
}

export function trackVisualizationClick(vizId, vizTitle, metadata = {}) {
  trackEvent('visualization_click', {
    vizId,
    vizTitle,
    secondsSinceLoad: Math.floor((Date.now() - (heartbeatTracker?.pageLoadTime || Date.now())) / 1000),
    ...metadata
  });
}

export function trackBookClick(bookId, isbn, bookTitle, section, position) {
  trackEvent('book_click', {
    bookId,
    isbn,
    bookTitle,
    section,
    position
  });
}

export function trackResumeDownload() {
  trackEvent('resume_download', {
    downloadedAt: new Date().toISOString()
  });
}

export function trackContactClick() {
  trackEvent('contact_click', {
    clickedAt: new Date().toISOString()
  });
}