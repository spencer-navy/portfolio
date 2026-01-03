# MongoDB Event Tracking Schema Documentation

## Overview
This document defines the schema for the event tracking system used to capture user behavior on abigailspencer.dev. The data collected feeds into analytics and will support future recommendation engine development.

**Database:** `analytics`  
**Collection:** `events`  
**Document Model:** Flexible schema with required base fields and event-specific metadata

---

## Design Principles

### 1. **Use Stable Identifiers**
- All entities (projects, books, visualizations) use stable IDs rather than mutable fields like titles
- Example: `bookId` + `isbn` instead of just `bookTitle`
- **Rationale:** Titles can change, contain typos, or be inconsistent. IDs enable reliable joins and prevent duplicate counting when building recommendation models

### 2. **Denormalize for Query Performance**
- Store both ID and descriptive fields (e.g., `projectId` AND `projectTitle`)
- **Rationale:** NoSQL best practice - avoid joins. Including human-readable fields makes queries more performant and data easier to analyze without lookups

### 3. **Server-Side Enrichment**
- Client sends minimal data; server adds IP, user agent, referrer, and authoritative timestamp
- **Rationale:** Client-side data can be manipulated or inaccurate (wrong system time, spoofed data). Server-side enrichment ensures data integrity

### 4. **Flexible Metadata Object**
- Each event type can have custom fields in a `metadata` object
- **Rationale:** Allows schema to evolve without migrations. New event types or additional tracking don't require database changes

### 5. **Session-Based Tracking**
- Events grouped by `sessionId` (stored in sessionStorage)
- **Rationale:** Enables session-based analytics ("what did this user do during their visit?") without requiring login/authentication

---

## Base Event Schema

Every event document contains these required fields:

```javascript
{
  _id: ObjectId,              // MongoDB auto-generated unique identifier
  eventType: String,          // Type of event (see Event Types section)
  page: String,               // Page path where event occurred (e.g., "/projects")
  sessionId: String,          // Session identifier (persists for browser tab lifetime)
  timestamp: ISODate,         // Server timestamp (UTC, authoritative)
  ipAddress: String,          // Client IP address (from x-forwarded-for header)
  userAgent: String,          // Browser user agent string
  referrer: String,           // HTTP referer header (where user came from)
  metadata: Object            // Event-specific additional data (varies by eventType)
}
```

### Field Descriptions

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `_id` | ObjectId | Yes (auto) | MongoDB unique identifier | `507f1f77bcf86cd799439011` |
| `eventType` | String | Yes | Event type identifier | `"filter_click"` |
| `page` | String | Yes | Current page path | `"/projects"` |
| `sessionId` | String | Yes | Session identifier | `"session_1704312345678_a3k9d2m1x"` |
| `timestamp` | ISODate | Yes | Server UTC timestamp | `ISODate("2026-01-03T18:00:00Z")` |
| `ipAddress` | String | Yes | Client IP address | `"192.168.1.1"` |
| `userAgent` | String | Yes | Browser user agent | `"Mozilla/5.0..."` |
| `referrer` | String | Yes | HTTP referer | `"https://google.com"` or `"direct"` |
| `metadata` | Object | No | Event-specific data | `{ filterValue: "Python" }` |

---

## Event Types

### 1. `filter_click`

Fired when user clicks a filter button on the Projects page.

**Purpose:** Track filter usage patterns, identify popular technologies, measure filter effectiveness

**Metadata Structure:**
```javascript
{
  eventType: "filter_click",
  page: "/projects",
  sessionId: "session_123...",
  timestamp: ISODate("2026-01-03T18:00:00Z"),
  ipAddress: "192.168.1.1",
  userAgent: "Mozilla/5.0...",
  referrer: "direct",
  metadata: {
    filterType: String,      // Always "technology" (for future expansion to other filter types)
    filterValue: String,     // Human-readable filter label ("Python", "SQL", etc.)
    filterId: String,        // Filter identifier ("python", "sql", etc.)
    resultCount: Number,     // Total items shown after filtering (projects + visualizations)
    projectCount: Number,    // Number of projects matching this filter
    vizCount: Number         // Number of visualizations matching this filter
  }
}
```

**Example Document:**
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  eventType: "filter_click",
  page: "/projects",
  sessionId: "session_1704312345678_a3k9d2m1x",
  timestamp: ISODate("2026-01-03T18:30:45Z"),
  ipAddress: "73.142.28.91",
  userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...",
  referrer: "https://google.com",
  metadata: {
    filterType: "technology",
    filterValue: "Python",
    filterId: "python",
    resultCount: 8,
    projectCount: 4,
    vizCount: 4
  }
}
```

**Analytics Use Cases:**
- Which filters are most popular?
- Which filters return the most/fewest results?
- Do users filter before clicking projects, or browse "All"?
- Filter effectiveness: resultCount = 0 suggests poor filter design

---

### 2. `project_click`

Fired when user clicks on a project card.

**Purpose:** Track project popularity, understand navigation patterns, identify which filters lead to clicks

**Metadata Structure:**
```javascript
{
  eventType: "project_click",
  page: "/projects",
  sessionId: "session_123...",
  timestamp: ISODate("2026-01-03T18:00:00Z"),
  ipAddress: "192.168.1.1",
  userAgent: "Mozilla/5.0...",
  referrer: "direct",
  metadata: {
    projectTitle: String,    // Human-readable project name
    projectId: String,       // Stable project identifier ("proj_001", "proj_002", etc.)
    activeFilter: String     // Which filter was active when clicked ("all", "python", etc.)
  }
}
```

**Example Document:**
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439012"),
  eventType: "project_click",
  page: "/projects",
  sessionId: "session_1704312345678_a3k9d2m1x",
  timestamp: ISODate("2026-01-03T18:31:02Z"),
  ipAddress: "73.142.28.91",
  userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...",
  referrer: "https://google.com",
  metadata: {
    projectTitle: "Marketing Analytics Dashboard",
    projectId: "proj_001",
    activeFilter: "python"
  }
}
```

**Analytics Use Cases:**
- Which projects are most popular?
- Do users click projects after filtering or from "All" view?
- Sequential behavior: Did they filter → click, or click immediately?
- A/B testing: Does filter usage increase engagement?

**Future Recommendation Engine:**
- "Users who clicked project X also clicked project Y"
- "Projects clicked after 'Python' filter" → suggest Python-related projects
- Session-based collaborative filtering

---

### 3. `visualization_click`

Fired when user clicks on a visualization card.

**Purpose:** Track visualization popularity, understand which visualizations resonate with users

**Metadata Structure:**
```javascript
{
  eventType: "visualization_click",
  page: "/projects",
  sessionId: "session_123...",
  timestamp: ISODate("2026-01-03T18:00:00Z"),
  ipAddress: "192.168.1.1",
  userAgent: "Mozilla/5.0...",
  referrer: "direct",
  metadata: {
    vizTitle: String,        // Human-readable visualization name
    vizId: String,           // Stable visualization identifier ("viz_001", "viz_002", etc.)
    activeFilter: String     // Which filter was active when clicked ("all", "python", etc.)
  }
}
```

**Example Document:**
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439013"),
  eventType: "visualization_click",
  page: "/projects",
  sessionId: "session_1704312345678_a3k9d2m1x",
  timestamp: ISODate("2026-01-03T18:31:15Z"),
  ipAddress: "73.142.28.91",
  userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...",
  referrer: "https://google.com",
  metadata: {
    vizTitle: "Customer Segmentation Analysis",
    vizId: "viz_002",
    activeFilter: "python"
  }
}
```

**Analytics Use Cases:**
- Which visualizations get the most engagement?
- Are visualizations clicked more/less than projects?
- Filter context: Do users find visualizations via filters or browsing?

---

### 4. `page_view`

Fired when user loads a page. *(Planned - not yet implemented)*

**Purpose:** Track overall site traffic, page popularity, navigation paths

**Metadata Structure:**
```javascript
{
  eventType: "page_view",
  page: "/projects",
  sessionId: "session_123...",
  timestamp: ISODate("2026-01-03T18:00:00Z"),
  ipAddress: "192.168.1.1",
  userAgent: "Mozilla/5.0...",
  referrer: "https://google.com",
  metadata: {
    timeOnPage: Number,      // Seconds spent on page (sent on page exit)
    scrollDepth: Number      // How far user scrolled (0.0 - 1.0)
  }
}
```

---

### 5. `book_click`

Fired when user clicks on a book in the reading list (About page). *(Planned - not yet implemented)*

**Purpose:** Track reading interest, support book recommendation engine

**Metadata Structure:**
```javascript
{
  eventType: "book_click",
  page: "/about",
  sessionId: "session_123...",
  timestamp: ISODate("2026-01-03T18:00:00Z"),
  ipAddress: "192.168.1.1",
  userAgent: "Mozilla/5.0...",
  referrer: "direct",
  metadata: {
    bookId: Number,          // Internal book identifier (from books data)
    isbn: String,            // ISBN-13 (stable, universal identifier)
    bookTitle: String,       // Human-readable title (denormalized)
    section: String,         // Which reading list section ("currently-reading", "want-to-read", etc.)
    position: Number         // Position in that section (0-indexed)
  }
}
```

**Why both `bookId` and `isbn`?**
- `bookId`: Fast lookups in internal book data
- `isbn`: Universal identifier for external enrichment (covers, reviews, prices)
- Both provide redundancy if one changes

**Example Document:**
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439014"),
  eventType: "book_click",
  page: "/about",
  sessionId: "session_1704312345678_a3k9d2m1x",
  timestamp: ISODate("2026-01-03T18:32:00Z"),
  ipAddress: "73.142.28.91",
  userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...",
  referrer: "direct",
  metadata: {
    bookId: 42,
    isbn: "978-1449373320",
    bookTitle: "Designing Data-Intensive Applications",
    section: "currently-reading",
    position: 2
  }
}
```

**Future Recommendation Engine:**
- "Users who clicked this book also clicked..."
- Content-based filtering using book metadata (genre, topics)
- Collaborative filtering: similar users' reading patterns

---

## Indexes

**Current Indexes:** None (using default `_id` index only)

**Recommended Indexes for Production:**

```javascript
// Compound index for filtering by event type and time range
db.events.createIndex({ eventType: 1, timestamp: -1 })

// Index for session-based queries
db.events.createIndex({ sessionId: 1, timestamp: 1 })

// Index for page-specific analytics
db.events.createIndex({ page: 1, timestamp: -1 })

// Index for filter analysis (sparse index - only filter_click events)
db.events.createIndex({ "metadata.filterId": 1 }, { sparse: true })

// Index for project popularity analysis (sparse index - only project_click events)
db.events.createIndex({ "metadata.projectId": 1 }, { sparse: true })
```

**Rationale:**
- Common query patterns: filter by eventType, aggregate by time
- Session analysis requires sessionId + timestamp ordering
- Sparse indexes save space (only index documents with those fields)

---

## Data Retention

**Current Policy:** Indefinite retention (no automatic deletion)

**Future Considerations:**
- GDPR compliance: May need 90-day retention for EU visitors
- Storage costs: MongoDB Atlas free tier has 512MB limit
- Recommendation models: Keep 6-12 months of data for training

**Recommended Strategy:**
- Keep last 12 months of raw events
- Aggregate older data into summary statistics
- Archive to S3/cold storage if needed

---

## Privacy & Security

### IP Address Handling
- **Current:** Full IP addresses stored
- **Future Consideration:** Hash or truncate IPs for privacy (e.g., store only `/24` network)
- **GDPR Note:** IP addresses are PII in EU - may need consent or anonymization

### Session Tracking
- Uses sessionStorage (data cleared when tab closes)
- No persistent user tracking across sessions
- No cross-site tracking

### Data Access
- Database credentials in `.env.local` (not committed to git)
- Production: Environment variables in Vercel
- MongoDB Network Access: Currently `0.0.0.0/0` (allow all) - should restrict in production

---

## Future Enhancements

### Event Types to Add
1. **`search_query`** - Track site search behavior (if search is added)
2. **`external_link_click`** - Track outbound link clicks (LinkedIn, GitHub, etc.)
3. **`contact_form_submit`** - Track contact form usage
4. **`resume_download`** - Track resume downloads

### Metadata Enhancements
1. **Device type** - Parse user agent to detect mobile/desktop/tablet
2. **Geographic data** - Use IP geolocation API to add country/city
3. **UTM parameters** - Track campaign sources (utm_source, utm_medium, etc.)
4. **A/B test variants** - Track which UI variant user saw

### Recommendation Engine Features
1. **Collaborative filtering:** "Users like you also viewed..."
2. **Content-based filtering:** "Projects similar to X..."
3. **Session-based recommendations:** "Based on your current browsing..."
4. **Trending content:** "Popular this week..."

---

## Example Queries

### Most clicked projects (last 30 days)
```javascript
db.events.aggregate([
  {
    $match: {
      eventType: "project_click",
      timestamp: { $gte: ISODate("2025-12-03T00:00:00Z") }
    }
  },
  {
    $group: {
      _id: "$metadata.projectId",
      clicks: { $sum: 1 },
      projectTitle: { $first: "$metadata.projectTitle" }
    }
  },
  {
    $sort: { clicks: -1 }
  },
  {
    $limit: 10
  }
])
```

### Filter effectiveness (result counts)
```javascript
db.events.aggregate([
  {
    $match: { eventType: "filter_click" }
  },
  {
    $group: {
      _id: "$metadata.filterId",
      avgResults: { $avg: "$metadata.resultCount" },
      totalClicks: { $sum: 1 }
    }
  },
  {
    $sort: { totalClicks: -1 }
  }
])
```

### Session reconstruction (user journey)
```javascript
db.events.find({ 
  sessionId: "session_1704312345678_a3k9d2m1x" 
}).sort({ 
  timestamp: 1 
})
```

### Filter → Click correlation
```javascript
db.events.aggregate([
  {
    $match: {
      sessionId: "session_1704312345678_a3k9d2m1x",
      eventType: { $in: ["filter_click", "project_click"] }
    }
  },
  {
    $sort: { timestamp: 1 }
  }
])
```

---

## Schema Evolution

NoSQL schemas can evolve without migrations, but consistency is important:

### Adding New Fields
✅ **Safe:** Add new fields to `metadata` object
```javascript
// Old events still work, new events have additional data
metadata: {
  projectId: "proj_001",
  projectTitle: "...",
  activeFilter: "python",
  newField: "new value"  // ← Safe to add
}
```

### Changing Field Names
⚠️ **Risky:** Requires handling both old and new field names in queries
```javascript
// Bad: Renaming breaks existing queries
metadata.projectId → metadata.project_id  // Don't do this

// Good: Add new field, deprecate old one gradually
metadata.projectId  // Keep for backward compatibility
metadata.project_id  // New standardized name
```

### Removing Fields
⚠️ **Consider:** Old documents may still have deprecated fields
```javascript
// Documents with old schema will persist
// Queries should handle missing fields gracefully
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-03 | Initial schema design with filter_click, project_click, visualization_click |
| 1.1 | TBD | Add page_view and book_click event types |
| 2.0 | TBD | Add recommendation engine features |

---

## References

- [MongoDB Best Practices for Schema Design](https://www.mongodb.com/docs/manual/data-modeling/)
- [Event Schema Design for Analytics](https://segment.com/docs/connections/spec/)
- [GDPR Compliance for Analytics](https://gdpr.eu/cookies/)

---

**Author:** Abigail Spencer  
**Last Updated:** January 3, 2026  
**Repository:** github.com/[your-username]/portfolio