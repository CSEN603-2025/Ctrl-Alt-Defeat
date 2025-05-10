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
  const { receiveCall } = useCallFunctions();
  
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
    
    // Simulate receiving a call after 15 seconds for testing purposes
    // This can be removed or commented out in production
    const incomingCallTimer = setTimeout(() => {
      receiveCall(MOCK_USERS.scad);
    }, 15000);
    
    return () => clearTimeout(incomingCallTimer);
  }, [router, receiveCall]);

  if (!currentStudent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-grow">
        <StudentProfile />
      </div>
      <div className="z-10">
        <CallManager contacts={scadContacts} />
      </div>
    </div>
  );
}