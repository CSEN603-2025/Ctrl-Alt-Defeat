"use client";

import dynamic from 'next/dynamic';

// Dynamically import the Calls component with no SSR
const Calls = dynamic(() => import('./Calls'), {
  ssr: false,
});

// Simple client component wrapper
export default function ClientCalls() {
  return <Calls />;
}