// lib/trackEvent.js
// Client-side utility for tracking user events

// Generate a session ID that persists during the browser session
function getSessionId() {
  // Check if we're running in the browser (not during server-side rendering)
  // 'window' only exists in the browser, not on the Node.js server
  if (typeof window === 'undefined') return null;
  
  // Try to get an existing session ID from sessionStorage
  // sessionStorage persists data only for the current browser tab/window
  // (unlike localStorage which persists across tabs and browser restarts)
  let sessionId = sessionStorage.getItem('analytics_session_id');
  
  // If no session ID exists yet, create a new one
  if (!sessionId) {
    // Create unique ID using current timestamp + random string
    // Date.now() gives milliseconds since 1970 (e.g., 1704312345678)
    // Math.random().toString(36) converts random number to base-36 string (0-9, a-z)
    // .substr(2, 9) takes 9 characters starting at position 2 (removes "0.")
    // Result looks like: "session_1704312345678_a3k9d2m1x"
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Save this session ID to sessionStorage so all events in this session use the same ID
    // This lets us group events from the same visit together in MongoDB
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  
  // Return the session ID (either existing or newly created)
  return sessionId;
}

// Main tracking function - this is what you'll call to send events
export async function trackEvent(eventType, metadata = {}) {
  try {
    // Get the current page path from the browser's URL
    // e.g., if URL is "https://abigailspencer.dev/projects", page = "/projects"
    // typeof window check prevents errors during server-side rendering
    const page = typeof window !== 'undefined' ? window.location.pathname : '';
    
    // Construct the event payload that matches our MongoDB schema
    const eventData = {
      eventType,           // e.g., "filter_click", "page_view", "book_click"
      page,                // Current page path
      sessionId: getSessionId(),  // Session ID to group events from same visit
      metadata             // Event-specific data (filter values, book IDs, etc.)
    };
    
    // Send event to our API endpoint using fetch
    // We deliberately DON'T await this - "fire and forget" pattern
    // This prevents tracking from slowing down the user interface
    fetch('/api/events', {
      method: 'POST',      // POST request to send data
      headers: {
        'Content-Type': 'application/json',  // Tell server we're sending JSON
      },
      body: JSON.stringify(eventData),  // Convert JavaScript object to JSON string
      
      // keepalive: true ensures the request completes even if user navigates away
      // Normally, if user clicks a link before fetch finishes, the request is cancelled
      // keepalive prevents that, ensuring we don't lose tracking data
      keepalive: true
    }).catch(error => {
      // If tracking fails (network error, API down, etc.), just log it
      // We DON'T throw the error or show it to the user
      // Tracking failures shouldn't break the user experience
      console.error('Event tracking failed:', error);
    });
    
  } catch (error) {
    // Catch any unexpected errors (e.g., sessionStorage not available)
    // Again, silently fail - don't break the app if tracking has issues
    console.error('Event tracking error:', error);
  }
}

// Convenience function for page views
// Instead of: trackEvent('page_view', {...})
// You can do: trackPageView({...})
export function trackPageView(metadata = {}) {
  trackEvent('page_view', metadata);
}

// Convenience function for clicks
// Automatically adds "element" field to metadata
// Instead of: trackEvent('click', {element: 'button', ...})
// You can do: trackClick('button', {...})
export function trackClick(elementName, metadata = {}) {
  trackEvent('click', {
    element: elementName,  // Name of what was clicked
    ...metadata            // Spread operator: merge in any additional metadata
  });
}