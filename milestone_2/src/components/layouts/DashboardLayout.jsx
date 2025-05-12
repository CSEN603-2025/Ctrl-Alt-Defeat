'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/shared/Sidebar';

export default function DashboardLayout({
  children,
  userType,
  title,
  showSidebar = true,
  currentViewId,
  onViewChange,
}) {
  const { currentUser, isAuthenticated } = useSelector(state => state.auth);
  const router = useRouter();

  // Authentication check
  useEffect(() => {
    // Check session storage as fallback
    const userSessionData = sessionStorage.getItem('userSession') || localStorage.getItem('userSession');

    if (!isAuthenticated && !userSessionData) {
      router.push(`/en/auth/login?userType=${userType}`);
      return;
    }

    // If we have user data in session
    if (userSessionData) {
      const userData = JSON.parse(userSessionData);

      // Verify user role
      if (userData.role !== userType) {
        router.push('/en');
        return;
      }
    } else if (isAuthenticated && currentUser?.role !== userType) {
      // Verify Redux user role
      router.push('/en');
      return;
    }
  }, [isAuthenticated, currentUser, router, userType]);

  // Determine content based on whether view components are provided
  const renderContent = () => {
    return children;
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-metallica-blue-50 to-white">
      {showSidebar && (
        <Sidebar
          userType={userType}
          onViewChange={onViewChange}
          currentView={currentViewId}
        />
      )}

      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6 min-h-screen flex flex-col">
          <div className="mb-6">
            <h1 className="text-2xl font-medium text-[#2a5f74] font-ibm-plex-sans">
              {userType.charAt(0).toUpperCase() + userType.slice(1)} Portal
            </h1>
          </div>

          <div className="bg-metallica-blue-50 rounded-xl shadow-sm overflow-hidden border border-gray-200 flex-1">
            {title && (
              <div className="w-full px-4 pt-6 pb-2">
                <div className="w-full max-w-3xl mx-auto">
                  <h2 className="text-3xl font-bold text-left text-[#2a5f74] relative">
                    {title}
                    <span className="absolute bottom-0 left-0 w-24 h-1 bg-[#2a5f74]"></span>
                  </h2>
                </div>
              </div>
            )}
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
} 