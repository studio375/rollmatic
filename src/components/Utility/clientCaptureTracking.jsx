'use client';
import { captureTracking, getTracking } from '@/helpers/tracking/tracking';
import { useEffect } from 'react';


export default function ClientCaptureTracking() {
  useEffect(() => { captureTracking(); }, []);
  return null;
}