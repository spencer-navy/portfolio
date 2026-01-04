// app/api/events/route.js
// API endpoint for capturing user events and storing them in MongoDB

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request) {
  console.log('[API /api/events] POST request received');
  
  try {
    // Parse the incoming event data from the client
    const eventData = await request.json();
    console.log('[API /api/events] Event data:', eventData);
    
    // Get server-side data (IP address, user agent, etc.)
    const ipAddress = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referrer = request.headers.get('referer') || 'direct';
    
    console.log('[API /api/events] Connecting to MongoDB...');
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('analytics'); // Database name
    const collection = db.collection('events'); // Collection name
    
    console.log('[API /api/events] MongoDB connected');
    
    // Construct the complete event document
    const event = {
      // Client-provided data
      eventType: eventData.eventType,
      page: eventData.page,
      sessionId: eventData.sessionId,
      metadata: eventData.metadata || {},
      
      // Server-enriched data
      ipAddress: ipAddress,
      userAgent: userAgent,
      referrer: referrer,
      timestamp: new Date(), // Server timestamp (more reliable than client)
    };
    
    console.log('[API /api/events] Inserting event:', event);
    
    // Insert the event into MongoDB
    const result = await collection.insertOne(event);
    
    console.log('[API /api/events] Event inserted:', result.insertedId);
    
    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        eventId: result.insertedId 
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('[API /api/events] Error:', error);
    console.error('[API /api/events] Error stack:', error.stack);
    
    // Return error response with more details
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to store event',
        message: error.message,
        // In production, you might want to remove this for security:
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

// Optional: Test endpoint to verify MongoDB connection
export async function GET(request) {
  console.log('[API /api/events] GET request received');
  
  try {
    console.log('[API /api/events] Testing MongoDB connection...');
    
    const client = await clientPromise;
    const db = client.db('analytics');
    
    // Try to get recent events
    const events = await db.collection('events')
      .find({})
      .sort({ timestamp: -1 })
      .limit(5)
      .toArray();
    
    console.log('[API /api/events] Found', events.length, 'recent events');
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connection successful',
      eventCount: events.length,
      recentEvents: events
    });
    
  } catch (error) {
    console.error('[API /api/events] GET Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'MongoDB connection failed',
        message: error.message
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS requests for CORS (if needed)
export async function OPTIONS(request) {
  return NextResponse.json({}, { status: 200 });
}