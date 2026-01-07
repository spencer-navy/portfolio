// app/api/events/route.js
// API endpoint for capturing user events and storing them in MongoDB

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { geolocation } from '@vercel/functions';

// POST /api/events
// Receives event data from the client, enriches it with geolocation and request info, and stores it in MongoDB
export async function POST(request) {
  try {
    // Parse the incoming event data from the client
    const eventData = await request.json();

    // Get the host to check if it's localhost
    const host = request.headers.get('host') || '';

    // Skip storing events from localhost/development
    const isLocalhost = host.includes('localhost') ||
                       host.includes('127.0.0.1');
    
    if (isLocalhost) {
      // Return success but don't store in MongoDB
      return NextResponse.json(
        { 
          success: true, 
          message: 'Localhost event ignored',
          stored: false
        },
        { status: 200 }
      );
    }
    
    // Get IP address
    const ipAddress = request.headers.get('x-forwarded-for') ||
                      request.headers.get('x-real-ip') ||
                      'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Detect bots and automated tools
    const botPatterns = [
      'vercel-screenshot',
      'bot',
      'crawler',
      'spider',
      'scraper',
      'lighthouse',
      'pingdom',
      'uptimerobot',
      'headless'
    ];

    const isBot = botPatterns.some(pattern =>
      userAgent.toLowerCase().includes(pattern)
    );

    // Extract location using the Vercel helper
    const geo = geolocation(request);
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('analytics');
    const collection = db.collection('events');
    
    // Get current time in Eastern Time (ET handles both EST and EDT automatically)
    const timestamp = new Date();
    const etTimestamp = new Date(timestamp.toLocaleString('en-US', {
      timeZone: 'America/New_York'
    }));

    // Construct the complete event document
    const event = {
      // Client-provided data
      eventType: eventData.eventType,
      page: eventData.page,
      sessionId: eventData.sessionId,
      metadata: eventData.metadata || {},
      referrer: eventData.referrer || '',

      // Server-enriched data
      ipAddress: ipAddress,
      userAgent: userAgent,
      isBot: isBot, // Flag to identify bot traffic

      // Geolocation data
      location: {
        city: geo.city || 'unknown',
        country: geo.country || 'unknown',
        region: geo.region || 'unknown',
        latitude: geo.latitude || null,
        longitude: geo.longitude || null,
      },

      timestamp: etTimestamp,
      timestampUTC: timestamp, // Keep UTC for reference
    };

    // Insert the event into MongoDB
    const result = await collection.insertOne(event);
    
    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        eventId: result.insertedId,
        stored: true
      },
      { status: 201 }
    );
    
  } catch (error) {
    // Only log errors in production (important for debugging)
    console.error('[API /api/events] Error:', error.message);
    
    // Return error response
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to store event',
        // Only include error details in development
        message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint for testing
export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db('analytics');
    
    // Get recent events
    const events = await db.collection('events')
      .find({})
      .sort({ timestamp: -1 })
      .limit(10)
      .toArray();
    
    // Show requester's geolocation
    const geo = geolocation(request);
    
    return NextResponse.json({
      success: true,
      yourLocation: {
        city: geo.city || 'unknown',
        country: geo.country || 'unknown',
        region: geo.region || 'unknown',
      },
      eventCount: events.length,
      recentEvents: events
    });
    
  } catch (error) {
    console.error('[API /api/events] GET Error:', error.message);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch events'
      },
      { status: 500 }
    );
  }
}