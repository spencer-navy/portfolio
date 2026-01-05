// app/api/events/route.js
// API endpoint for capturing user events and storing them in MongoDB

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { geolocation } from '@vercel/functions';

export async function POST(request) {
  console.log('[API /api/events] POST request received');
  
  try {
    // Parse the incoming event data from the client
    const eventData = await request.json();
    console.log('[API /api/events] Event data:', eventData);
    
    // Get IP address
    const ipAddress = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referrer = request.headers.get('referer') || 'direct';

    // Extract location using the Vercel helper
    // This automatically handles the headers and decoding for you
    const geo = geolocation(request);


    // // Get geolocation data from Vercel headers
    // const geo = {
    //   city: request.headers.get('x-vercel-ip-city') || 'unknown',
    //   country: request.headers.get('x-vercel-ip-country') || 'unknown',
    //   region: request.headers.get('x-vercel-ip-country-region') || 'unknown',
    //   latitude: request.headers.get('x-vercel-ip-latitude') || null,
    //   longitude: request.headers.get('x-vercel-ip-longitude') || null,
    // };
    
    // // Decode city name (Vercel encodes it)
    // if (geo.city !== 'unknown') {
    //   geo.city = decodeURIComponent(geo.city);
    // }
    
    console.log('[API /api/events] Geolocation:', geo);
    console.log('[API /api/events] Connecting to MongoDB...');
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('analytics');
    const collection = db.collection('events');
    
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
      
      // Geolocation data
      location: {
        city: geo.city,
        country: geo.country,
        region: geo.region,
        latitude: geo.latitude,
        longitude: geo.longitude,
      },
      
      timestamp: new Date(),
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
    
    // Return error response
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to store event',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

// Test endpoint to verify MongoDB connection and see geolocation
export async function GET(request) {
  console.log('[API /api/events] GET request received');
  
  try {
    console.log('[API /api/events] Testing MongoDB connection...');
    
    const client = await clientPromise;
    const db = client.db('analytics');
    
    // Get recent events
    const events = await db.collection('events')
      .find({})
      .sort({ timestamp: -1 })
      .limit(10)
      .toArray();
    
    console.log('[API /api/events] Found', events.length, 'recent events');
    
    // Extract geolocation data using the Vercel helper
    const geo = geolocation(request);

    // // Show requester's geolocation for testing
    // const geo = {
    //   city: decodeURIComponent(request.headers.get('x-vercel-ip-city') || 'unknown'),
    //   country: request.headers.get('x-vercel-ip-country') || 'unknown',
    //   region: request.headers.get('x-vercel-ip-country-region') || 'unknown',
    // };
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connection successful',
      // We use || 'unknown' because geolocation() returns undefined if not found
      yourLocation: {
        city: geo.city || 'unknown',
        country: geo.country || 'unknown',
        region: geo.region || 'unknown',
        latitude: geo.latitude || null,
        longitude: geo.longitude || null,
      },
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