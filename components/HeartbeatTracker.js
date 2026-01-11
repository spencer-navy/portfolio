// components/HeartbeatTracker.js
'use client';

import { useEffect } from 'react';
import { initializeHeartbeatTracking } from '@/lib/trackEvent';

export default function HeartbeatTracker() {
  useEffect(() => {
    // Initialize once when component mounts
    initializeHeartbeatTracking();
    console.log('[HeartbeatTracker] Initialized');
  }, []);

  return null; // This component doesn't render anything
}