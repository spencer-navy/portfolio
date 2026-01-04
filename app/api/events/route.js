// app/api/events/route.js
// API endpoint for capturing user events and storing them in MongoDB

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { headers } from 'next/headers';

export async function POST(request) {
  try {
    // Parse the incoming event data from the client
    const eventData = await request.json();
    
    // Get server-side data (IP address, user agent, etc.)
    const headersList = await headers();
    const ipAddress = headersList.get('x-forwarded-for') || 
                      headersList.get('x-real-ip') || 
                      'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';
    const referrer = headersList.get('referer') || 'direct';
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('analytics'); // Database name
    const collection = db.collection('events'); // Collection name
    
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
    
    // Insert the event into MongoDB
    const result = await collection.insertOne(event);
    
    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        eventId: result.insertedId 
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Error storing event:', error);
    
    // Return error response
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to store event' 
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS requests for CORS (if needed)
export async function OPTIONS(request) {
  return NextResponse.json({}, { status: 200 });
}