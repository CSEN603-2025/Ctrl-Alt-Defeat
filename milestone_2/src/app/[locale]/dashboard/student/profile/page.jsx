'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentProfileRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the main dashboard with a query parameter to show profile
    router.push('/en/dashboard/student#profile');
  }, [router]);

  return (
    <div className="h-full w-full flex items-center justify-center">
      <p>Redirecting to profile view...</p>
    </div>
  );
}