'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MOCK_USERS } from '../../../../../constants/mockData';
import StudentProfile from '@/components/StudentProfile';
import dynamic from 'next/dynamic';
import { useCallFunctions } from '@/components/Calls';

// Dynamically import CallManager with no SSR
const CallManager = dynamic(() => import('@/components/CallManager'), {
  ssr: false,
});

export default function StudentDashboard() {
  const router = useRouter();
  const [currentStudent, setCurrentStudent] = useState(null);
  const [showScadAdmin, setShowScadAdmin] = useState(false);
  const { receiveCall, initiateCall } = useCallFunctions();
  
  // Create SCAD admin contacts for student to call
  const scadContacts = [
    {
      id: 'scad_admin',
      name: MOCK_USERS.scad?.name || 'SCAD Admin',
      profileImage: MOCK_USERS.scad?.profileImage || "/images/scad-icon.png",
      role: 'scad'
    }
  ];

  useEffect(() => {
    // Check if user is logged in and is a student
    const userSession = sessionStorage.getItem('userSession') || localStorage.getItem('userSession');
    if (!userSession) {
      router.push('/en/auth/login');
      return;
    }

    const userData = JSON.parse(userSession);
    if (userData.role !== 'student') {
      router.push('/en');
      return;
    }

    setCurrentStudent(userData);
    
    // Show SCAD admin immediately - removing the delay
    setShowScadAdmin(true);
    
    console.log('Student dashboard mounted - call functionality should be available');
    
    return () => {
      // No timeouts to clear now
    };
  }, [router]);

  if (!currentStudent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-grow">
        <StudentProfile />
      </div>
      {/* Always show the CallManager */}
      <div className="z-10">
        <CallManager contacts={scadContacts} />
      </div>
    </div>
  );
}