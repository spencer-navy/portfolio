// app/projects/real-time-event-analytics/page.js

'use client'

import { useEffect, useState, useRef } from 'react';
import Navigation from '../../../components/Navigation';
import styles from './RealTimeAnalytics.module.css';
import { trackEvent } from '@/lib/trackEvent';
import { trackPageView } from '@/lib/trackEvent';


export default function RealTimeEventAnalytics() {
    // Track page entry time for "time on page" calculation
    const entryTime = useRef(Date.now());
    
    // Track maximum scroll depth reached (0-100%)
    const [maxScrollDepth, setMaxScrollDepth] = useState(0);
    
    // Track which scroll milestones have been viewed (25%, 50%, 75%, 100%)
    const viewedSections = useRef(new Set());

    // Track page view when component mounts
useEffect(() => {
    trackPageView({ 
        page: 'project-detail',
        projectId: 'proj_005',
        projectTitle: 'Real-Time Event Analytics Pipeline'
    });
}, []);

    // Track time on page when user leaves - FIXED VERSION
    useEffect(() => {
        const handleBeforeUnload = () => {
            const timeOnPage = Math.round((Date.now() - entryTime.current) / 1000);
            
            // FIXED: Use Blob with correct content type for sendBeacon
            const eventData = {
                eventType: 'page_exit',
                page: window.location.pathname,
                sessionId: sessionStorage.getItem('analytics_session_id'),
                metadata: {
                    projectId: 'proj_005',
                    timeOnPage: timeOnPage,
                    maxScrollDepth: maxScrollDepth
                }
            };
            
            // Create Blob with application/json type - this is CRITICAL
            const blob = new Blob([JSON.stringify(eventData)], {
                type: 'application/json'
            });
            
            navigator.sendBeacon('/api/events', blob);
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [maxScrollDepth]);

    // Handle CTA button clicks
    const handleCTAClick = (ctaName, ctaUrl) => {
        trackEvent('cta_click', {
            projectId: 'proj_005',
            ctaName: ctaName,
            ctaUrl: ctaUrl,
            timeBeforeClick: Math.round((Date.now() - entryTime.current) / 1000)
        });
    };

    return (
        <>
            <Navigation />
            
            <main className={styles.main}>
                <div className={styles.container}>
                    
                    {/* ===== HERO SECTION ===== */}
                    <section className={styles.hero}>
                        <div className={styles.breadcrumb}>
                            <a href="/projects" className={styles.breadcrumbLink}>Projects</a>
                            <span className={styles.breadcrumbSeparator}>/</span>
                            <span className={styles.breadcrumbCurrent}>Real-Time Event Analytics Pipeline</span>
                        </div>
                        
                        <h1 className={styles.title}>Real-Time Event Analytics Pipeline</h1>
                        
                        <p className={styles.subtitle}>
                            Production-ready event tracking infrastructure capturing user behavior for analytics and future ML-powered recommendations
                        </p>
                        
                        <div className={styles.tags}>
                            <span className={styles.tag}>MongoDB</span>
                            <span className={styles.tag}>Node.js</span>
                            <span className={styles.tag}>Next.js</span>
                            <span className={styles.tag}>NoSQL</span>
                            <span className={styles.tag}>Event-Driven Architecture</span>
                        </div>
                    </section>

                    {/* ===== OVERVIEW SECTION ===== */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Overview</h2>
                        
                        <p className={styles.text}>
                            This portfolio site includes a sophisticated event tracking system that captures every user 
                            interaction—from project filter clicks to scrolling down my book list — and stores them 
                            in a MongoDB NoSQL database. The system was designed from the ground up with data science principles 
                            in mind: flexible schema for evolving requirements, server-side data enrichment for accuracy, and a structure optimized for 
                            future machine learning applications.
                        </p>
                        
                        <p className={styles.text}>
                            Unlike basic analytics solutions, by building this website from scratch using Next.js (React), this end-to-end system 
                            gives me complete control over the data pipeline, enabling custom feature engineering and recommendation algorithms 
                            tailored to portfolio browsing behavior.
                        </p>
                    </section>

                    {/* ===== PROBLEM & SOLUTION SECTION ===== */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Problem & Solution</h2>
                        
                        <div className={styles.grid}>
                            <div className={styles.card}>
                                <h3 className={styles.cardTitle}>The Challenge</h3>
                                <p className={styles.text}>
                                    Standard analytics tools like Google Analytics provide high-level metrics but lack the granular, 
                                    structured data needed for ML applications. I needed a system that could:
                                </p>
                                <ul className={styles.list}>
                                    <li>Capture detailed interaction data (which filters users apply, which projects they view)</li>
                                    <li>Store data in a queryable format for feature engineering</li>
                                    <li>Support future collaborative filtering and recommendation algorithms</li>
                                    <li>Maintain privacy while collecting behavioral insights</li>
                                </ul>
                            </div>
                            
                            <div className={styles.card}>
                                <h3 className={styles.cardTitle}>The Solution</h3>
                                <p className={styles.text}>
                                    I built a custom event tracking pipeline using Next.js API routes and MongoDB that:
                                </p>
                                <ul className={styles.list}>
                                    <li>Captures client-side events via lightweight JavaScript utility</li>
                                    <li>Enriches data server-side with IP geolocation, timestamps, and user agent info</li>
                                    <li>Stores events in flexible NoSQL schema designed for analytics queries</li>
                                    <li>Tracks session-based behavior without requiring user authentication</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* ===== TECHNICAL ARCHITECTURE SECTION ===== */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Technical Architecture</h2>
                        
                        <div className={styles.architectureFlow}>
                            <div className={styles.flowStep}>
                                <div className={styles.flowNumber}>1</div>
                                <h4>Client-Side Capture</h4>
                                <p className={styles.smallText}>User interacts with site (clicks filter, views project)</p>
                                <code className={styles.inlineCode}>trackEvent(&apos;filter_click&apos;, metadata)</code>
                            </div>
                            
                            <div className={styles.flowArrow}>→</div>
                            
                            <div className={styles.flowStep}>
                                <div className={styles.flowNumber}>2</div>
                                <h4>API Route</h4>
                                <p className={styles.smallText}>Server validates, enriches with IP/timestamp</p>
                                <code className={styles.inlineCode}>/api/events (POST)</code>
                            </div>
                            
                            <div className={styles.flowArrow}>→</div>
                            
                            <div className={styles.flowStep}>
                                <div className={styles.flowNumber}>3</div>
                                <h4>MongoDB Atlas</h4>
                                <p className={styles.smallText}>Event stored in NoSQL database</p>
                                <code className={styles.inlineCode}>analytics.events</code>
                            </div>
                            
                            <div className={styles.flowArrow}>→</div>
                            
                            <div className={styles.flowStep}>
                                <div className={styles.flowNumber}>4</div>
                                <h4>Future: ML Pipeline</h4>
                                <p className={styles.smallText}>Recommendation engine queries event data</p>
                                <code className={styles.inlineCode}>Collaborative filtering</code>
                            </div>
                        </div>
                    </section>

                    {/* ===== COMPLETE TECH STACK SECTION ===== */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Complete Technology Stack</h2>
                        <p className={styles.text}>
                            The event tracking system is built on top of a modern full-stack web application. Here&apos;s the complete technology stack powering this portfolio site:
                        </p>
                        
                        <div className={styles.grid}>
                            <div className={styles.card}>
                                <h3 className={styles.cardTitle}>Frontend Layer</h3>
                                <ul className={styles.list}>
                                    <li><strong>Next.js 16:</strong> React framework with App Router for server and client components</li>
                                    <li><strong>React 19:</strong> UI library for building interactive components</li>
                                    <li><strong>CSS Modules:</strong> Scoped styling preventing conflicts</li>
                                    <li><strong>Vercel Analytics:</strong> Performance monitoring</li>
                                </ul>
                            </div>
                            
                            <div className={styles.card}>
                                <h3 className={styles.cardTitle}>Backend Layer</h3>
                                <ul className={styles.list}>
                                    <li><strong>Next.js API Routes:</strong> Serverless functions handling requests</li>
                                    <li><strong>Node.js:</strong> JavaScript runtime for server-side execution</li>
                                    <li><strong>MongoDB Driver:</strong> Native Node.js driver for database operations</li>
                                </ul>
                            </div>
                            
                            <div className={styles.card}>
                                <h3 className={styles.cardTitle}>Data Layer</h3>
                                <ul className={styles.list}>
                                    <li><strong>MongoDB Atlas:</strong> Cloud-hosted NoSQL database (AWS us-east-1)</li>
                                    <li><strong>Database:</strong> analytics</li>
                                    <li><strong>Collection:</strong> events</li>
                                    <li><strong>Connection:</strong> Singleton pattern for efficiency</li>
                                </ul>
                            </div>
                            
                            <div className={styles.card}>
                                <h3 className={styles.cardTitle}>Deployment & Hosting</h3>
                                <ul className={styles.list}>
                                    <li><strong>Vercel:</strong> Serverless deployment platform</li>
                                    <li><strong>GitHub:</strong> Version control and CI/CD pipeline</li>
                                    <li><strong>Environment Variables:</strong> Secure credential management</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* ===== DETAILED ARCHITECTURE SECTION ===== */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Detailed Architecture</h2>
                        <p className={styles.text}>
                            This diagram shows the complete data flow from user interaction to database storage, including all intermediate processing steps:
                        </p>
                        
                        <div className={styles.card} style={{padding: '2.5rem', marginTop: '2rem'}}>
                            <h4 style={{marginBottom: '1.5rem', fontSize: '1.2rem', color: '#2c352b'}}>
                                User Interaction → Data Storage Flow
                            </h4>
                            
                            <div style={{marginBottom: '2rem'}}>
                                <strong style={{color: '#5a6b58'}}>1. Client-Side Event Capture</strong>
                                <ul className={styles.list} style={{marginTop: '0.5rem'}}>
                                    <li>User clicks filter button on /projects page</li>
                                    <li>React onClick handler fires</li>
                                    <li>trackEvent() function called with event type and metadata</li>
                                    <li>Session ID retrieved from sessionStorage (or created if new session)</li>
                                </ul>
                            </div>
                            
                            <div style={{marginBottom: '2rem'}}>
                                <strong style={{color: '#5a6b58'}}>2. HTTP Request to API</strong>
                                <ul className={styles.list} style={{marginTop: '0.5rem'}}>
                                    <li>Client constructs event payload with: eventType, page, sessionId, metadata</li>
                                    <li>fetch() sends POST request to /api/events</li>
                                    <li>Request includes keepalive flag to ensure completion</li>
                                    <li>Headers automatically include user agent, referer</li>
                                </ul>
                            </div>
                            
                            <div style={{marginBottom: '2rem'}}>
                                <strong style={{color: '#5a6b58'}}>3. Next.js API Route Processing</strong>
                                <ul className={styles.list} style={{marginTop: '0.5rem'}}>
                                    <li>Serverless function spins up on Vercel infrastructure</li>
                                    <li>Parses JSON payload from request body</li>
                                    <li>Reads headers to extract IP address (x-forwarded-for), user agent</li>
                                    <li>Adds authoritative server timestamp</li>
                                    <li>Constructs complete event document</li>
                                </ul>
                            </div>
                            
                            <div style={{marginBottom: '2rem'}}>
                                <strong style={{color: '#5a6b58'}}>4. MongoDB Connection</strong>
                                <ul className={styles.list} style={{marginTop: '0.5rem'}}>
                                    <li>Retrieves connection from singleton client promise</li>
                                    <li>Connects to MongoDB Atlas cluster in AWS us-east-1</li>
                                    <li>Selects &apos;analytics&apos; database</li>
                                    <li>Accesses &apos;events&apos; collection</li>
                                </ul>
                            </div>
                            
                            <div>
                                <strong style={{color: '#5a6b58'}}>5. Data Persistence</strong>
                                <ul className={styles.list} style={{marginTop: '0.5rem'}}>
                                    <li>insertOne() writes event document to MongoDB</li>
                                    <li>MongoDB assigns unique _id (ObjectId)</li>
                                    <li>Document immediately available for queries</li>
                                    <li>API returns success response with event ID to client</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* ===== KEY FEATURES SECTION ===== */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Key Features</h2>
                        
                        <div className={styles.features}>
                            <div className={styles.feature}>
                                <h3 className={styles.featureTitle}>🎯 Flexible NoSQL Schema</h3>
                                <p className={styles.text}>
                                    Designed with a base event structure and flexible metadata object, allowing new event types without schema migrations. Each event captures both client data (what happened) and server data (context).
                                </p>
                            </div>
                            
                            <div className={styles.feature}>
                                <h3 className={styles.featureTitle}>🔒 Server-Side Enrichment</h3>
                                <p className={styles.text}>
                                    Critical data like timestamps and IP addresses are added server-side to prevent client-side manipulation. Ensures data integrity for accurate analytics.
                                </p>
                            </div>
                            
                            <div className={styles.feature}>
                                <h3 className={styles.featureTitle}>📊 Session Tracking</h3>
                                <p className={styles.text}>
                                    Uses sessionStorage to group events by user visit without requiring login. Enables session-based analysis: &quot;What did users do during their visit?&quot;
                                </p>
                            </div>
                            
                            <div className={styles.feature}>
                                <h3 className={styles.featureTitle}>🤖 ML-Ready Design</h3>
                                <p className={styles.text}>
                                    Schema includes stable identifiers (project IDs, ISBNs) and captures interaction context (active filters, result counts) needed for collaborative filtering and content-based recommendations.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ===== IMPLEMENTATION HIGHLIGHTS SECTION ===== */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Implementation Highlights</h2>
                        
                        <h3 className={styles.subsectionTitle}>Event Tracking Utility</h3>
                        <pre className={styles.codeBlock}>
{`// lib/trackEvent.js - Client-side tracking utility
export async function trackEvent(eventType, metadata = {}) {
  const eventData = {
    eventType,
    page: window.location.pathname,
    sessionId: getSessionId(),
    metadata
  };
  
  // Fire-and-forget for performance
  fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData),
    keepalive: true  // Ensure completion even if user navigates away
  });
}`}
                        </pre>

                        <h3 className={styles.subsectionTitle}>Server-Side API Route</h3>
                        <pre className={styles.codeBlock}>
{`// app/api/events/route.js - Server enrichment & storage
export async function POST(request) {
  const eventData = await request.json();
  const headersList = await headers();
  
  const event = {
    ...eventData,
    ipAddress: headersList.get('x-forwarded-for'),
    userAgent: headersList.get('user-agent'),
    timestamp: new Date()  // Server timestamp (authoritative)
  };
  
  const client = await clientPromise;
  await client.db('analytics')
              .collection('events')
              .insertOne(event);
}`}
                        </pre>

                        <h3 className={styles.subsectionTitle}>MongoDB Event Schema</h3>
                        <pre className={styles.codeBlock}>
{`{
  eventType: "filter_click",
  page: "/projects",
  sessionId: "session_1704312345678_a3k9d2m1x",
  timestamp: ISODate("2026-01-03T18:30:45Z"),
  ipAddress: "73.142.28.91",
  userAgent: "Mozilla/5.0...",
  metadata: {
    filterType: "technology",
    filterValue: "Machine Learning",
    filterId: "ml",
    resultCount: 8
  }
}`}
                        </pre>
                    </section>

                    {/* ===== LIVE DATA SECTION ===== */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Live Data Collection</h2>
                        <p className={styles.text}>
                            The system is currently live on this portfolio site, collecting real user interaction data. Every click you make—including viewing this page—is being captured and stored in MongoDB Atlas.
                        </p>
                        
                        <div className={styles.statsGrid}>
                            <div className={styles.statCard}>
                                <div className={styles.statNumber}>Real-time</div>
                                <div className={styles.statLabel}>Event Capture</div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statNumber}>~50ms</div>
                                <div className={styles.statLabel}>API Response Time</div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statNumber}>5 Types</div>
                                <div className={styles.statLabel}>Event Categories</div>
                            </div>
                        </div>
                    </section>

                    {/* ===== FUTURE ENHANCEMENTS SECTION ===== */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Future Enhancements</h2>
                        
                        <div className={styles.roadmap}>
                            <div className={styles.roadmapItem}>
                                <h4>Phase 1: Recommendation Engine</h4>
                                <p className={styles.text}>
                                    Build collaborative filtering algorithm: &quot;Users who viewed this project also viewed...&quot;
                                </p>
                            </div>
                            <div className={styles.roadmapItem}>
                                <h4>Phase 2: Analytics Dashboard</h4>
                                <p className={styles.text}>
                                    Create visualization dashboard showing popular projects, filter effectiveness, and user journey flows
                                </p>
                            </div>
                            <div className={styles.roadmapItem}>
                                <h4>Phase 3: A/B Testing Framework</h4>
                                <p className={styles.text}>
                                    Add variant tracking to test different UI layouts and measure engagement impact
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ===== KEY TAKEAWAYS SECTION ===== */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Key Takeaways</h2>
                        <ul className={styles.list}>
                            <li><strong>Design for evolution:</strong> The flexible NoSQL schema allows adding new event types without breaking existing data</li>
                            <li><strong>Server-side validation matters:</strong> Client data can&apos;t be trusted—server enrichment ensures accuracy</li>
                            <li><strong>Think ahead:</strong> Designing with ML in mind (stable IDs, contextual metadata) sets up future capabilities</li>
                            <li><strong>Performance trade-offs:</strong> Fire-and-forget tracking doesn&apos;t block UI, but requires careful error handling</li>
                        </ul>
                    </section>

                    {/* ===== CLOSING CTA SECTION ===== */}
                    <section className={styles.section} style={{textAlign: 'center', paddingTop: '3rem', paddingBottom: '4rem'}}>
                        <div style={{
                            background: 'white',
                            borderRadius: '16px',
                            padding: '4rem 3rem',
                            border: '2px solid #e2e8f0',
                            maxWidth: '800px',
                            margin: '0 auto'
                        }}>
                            <h2 className={styles.sectionTitle} style={{marginBottom: '1rem'}}>
                                Interested in More Projects?
                            </h2>
                            <p className={styles.text} style={{marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem'}}>
                                This event tracking system is just one example of my work combining data engineering, full-stack development, and machine learning principles. Explore more projects showcasing Python, GIS, statistical modeling, and data visualization.
                            </p>
                            
                            <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
                                <a 
                                    href="/projects" 
                                    className={styles.button}
                                    onClick={() => handleCTAClick('View All Projects', '/projects')}
                                >
                                    ← View All Projects
                                </a>
                                <a 
                                    href="https://github.com/spencer-navy/portfolio" 
                                    className={styles.button}
                                    style={{background: 'white', color: '#5a6b58', border: '2px solid #5a6b58'}}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => handleCTAClick('View on GitHub', 'https://github.com/spencer-navy/portfolio')}
                                >
                                    View on GitHub →
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}