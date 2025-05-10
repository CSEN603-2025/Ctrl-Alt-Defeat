'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MOCK_COMPANIES, MOCK_USERS } from '../../../../../constants/mockData';
import CompanyTable from '@/components/CompanyTable';
import dynamic from 'next/dynamic';
import { useCallFunctions } from '@/components/Calls';

// Dynamically import CallManager with no SSR
const CallManager = dynamic(() => import('@/components/CallManager'), {
  ssr: false,
});

export default function ScadDashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const { receiveCall } = useCallFunctions();
  
  // Create student contacts for SCAD to call
  const studentContacts = MOCK_USERS.students.map(student => ({
    id: student.id || `student_${student.name.replace(/\s/g, '_').toLowerCase()}`,
    name: student.name,
    profileImage: student.profileImage || "/images/student-icon.png",
    role: 'student'
  }));

  useEffect(() => {
    // Check if user is logged in
    const userSession = sessionStorage.getItem('userSession') || localStorage.getItem('userSession');
    if (!userSession) {
      router.push('/en/auth/login');
      return;
    }

    // Verify user role
    const userData = JSON.parse(userSession);
    if (userData.role !== 'scad') {
      router.push('/en');
      return;
    }
    
    setCurrentUser(userData);
    
    // Simulate receiving a call after 20 seconds for testing purposes (can be removed in production)
    const incomingCallTimer = setTimeout(() => {
      // Pick a random student to simulate a call from
      const randomStudent = MOCK_USERS.students[Math.floor(Math.random() * MOCK_USERS.students.length)];
      receiveCall(randomStudent);
    }, 20000);
    
    return () => clearTimeout(incomingCallTimer);
  }, [router, receiveCall]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-metallica-blue-50 to-white px-8 py-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-medium text-metallica-blue-00 mb-2 font-ibm-plex-sans">SCAD Dashboard</h1>
        <CompanyTable companies={MOCK_COMPANIES} />
      </div>
      
      {/* Call Manager Component */}
      <div className="z-10">
        <CallManager contacts={studentContacts} />
      </div>
    </div>
  );
}