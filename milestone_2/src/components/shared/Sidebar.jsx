'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faHome,
  faSearch,
  faClipboardList,
  faBriefcase,
  faUser,
  faGraduationCap,
  faChartBar,
  faBuilding,
  faList,
  faFolder,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';
import ActionButton from './ActionButton';
import { useDispatch } from 'react-redux';
import { LOGOUT_USER } from '@/store/authReducer';

// Icon mapping for different menu items
const iconMap = {
  home: faHome,
  browse: faSearch,
  applied: faClipboardList,
  'my-internships': faBriefcase,
  profile: faUser,
  students: faGraduationCap,
  reports: faChartBar,
  companies: faBuilding,
  listings: faList,
  applications: faFolder,
  logout: faRightFromBracket
};

// Map of sidebar items for different user types
const sidebarConfig = {
  student: [
    { id: 'home', iconId: 'home', label: 'Dashboard', path: '/dashboard/student', isPage: false },
    { id: 'browse', iconId: 'browse', label: 'Browse Internships', path: '/dashboard/student/browse-internships', isPage: false },
    { id: 'applied', iconId: 'applied', label: 'Applied Internships', path: '/dashboard/student/applied-internships', isPage: false },
    { id: 'my-internships', iconId: 'my-internships', label: 'My Internships', path: '/dashboard/student/my-internships', isPage: false },
    { id: 'profile', iconId: 'profile', label: 'Profile', path: '/dashboard/student/profile', isPage: false },
  ],
  faculty: [
    { id: 'home', iconId: 'home', label: 'Dashboard', path: '/dashboard/faculty', isPage: false },
    { id: 'students', iconId: 'students', label: 'Students', path: '/dashboard/faculty/students', isPage: false },
    { id: 'reports', iconId: 'reports', label: 'Reports', path: '/dashboard/faculty/reports', isPage: false },
    { id: 'profile', iconId: 'profile', label: 'Profile', path: '/dashboard/faculty/profile', isPage: false },
  ],
  company: [
    { id: 'home', iconId: 'home', label: 'Dashboard', path: '/dashboard/company', isPage: false },
    { id: 'listings', iconId: 'listings', label: 'Internship Listings', path: '/dashboard/company/listings', isPage: false },
    { id: 'applications', iconId: 'applications', label: 'Applications', path: '/dashboard/company/applications', isPage: false },
    { id: 'profile', iconId: 'profile', label: 'Profile', path: '/dashboard/company/profile', isPage: false },
  ],
  scad: [
    { id: 'home', iconId: 'home', label: 'Dashboard', path: '/dashboard/scad', isPage: false },
    { id: 'companies', iconId: 'companies', label: 'Companies', path: '/dashboard/scad/companies', isPage: false },
    { id: 'students', iconId: 'students', label: 'Students', path: '/dashboard/scad/students', isPage: false },
    { id: 'reports', iconId: 'reports', label: 'Reports', path: '/dashboard/scad/reports', isPage: false },
    { id: 'profile', iconId: 'profile', label: 'Profile', path: '/dashboard/scad/profile', isPage: false },
  ],
};

export default function Sidebar({ userType, onViewChange, currentView }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [prevView, setPrevView] = useState(currentView);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const sidebarItems = sidebarConfig[userType] || [];

  // Extract locale from pathname
  const locale = pathname.split('/')[1] || 'en';

  // Add locale to paths
  const localizedItems = sidebarItems.map(item => ({
    ...item,
    path: `/${locale}${item.path}`
  }));

  // Check for mobile devices and set initial state
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-collapse on mobile
      if (window.innerWidth < 768) {
        setIsExpanded(false);
      }
    };

    // Set on first load
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar when view changes
  useEffect(() => {
    if (currentView !== prevView) {
      setIsExpanded(false);
      setPrevView(currentView);
    }
  }, [currentView, prevView]);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  // Handle view change with auto-collapse
  const handleViewChange = (itemId) => {
    // Call the parent's onViewChange
    if (onViewChange) {
      onViewChange(itemId);
    }

    // Auto-collapse sidebar after navigation
    setIsExpanded(false);
  };

  // Determine active item based on current pathname or view
  const getIsActive = (item) => {
    if (item.isPage) {
      // For path-based navigation, compare with pathname
      return pathname === item.path || pathname.startsWith(item.path + '/');
    } else if (onViewChange) {
      // For view-based navigation, compare with currentView
      return currentView === item.id;
    }
    return false;
  };

  // Handle logout
  const handleLogout = () => {
    dispatch({ type: LOGOUT_USER });

    // Clear session and local storage
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('userSession');
      localStorage.removeItem('userSession');
      sessionStorage.removeItem('welcomeShown'); // Also clear welcomeShown flag
    }

    router.push(`/${locale}/`);
  };

  return (
    <div
      className={`bg-[#E2F4F7] h-screen flex flex-col border-r border-[#5DB2C7] sticky top-0 transform transition-all duration-300 ease-in-out ${isExpanded ? 'w-64' : 'w-20'}`}
      style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}
    >
      {/* Sidebar Header */}
      <div className="p-3 border-b border-[#5DB2C7] flex items-center justify-between">
        {/* Logo and Optional Portal Text */}
        <div className={`flex items-center transition-all duration-300 ease-in-out ${isExpanded ? 'justify-start' : 'justify-center flex-grow'}`}>
          <Image
            src="/logos/internhub-logo.png"
            alt="InternHub Logo"
            width={32}
            height={32}
            className={`transition-all duration-300 ease-in-out ${isExpanded ? 'mr-2' : 'mr-0'}`}
          />
          <div
            className={`font-young-serif font-bold whitespace-nowrap transition-all duration-300 ease-in-out text-lg ${isExpanded ? 'opacity-100 max-w-xs' : 'opacity-0 max-w-0 overflow-hidden'}`}
          >
            <span className="text-[#B0BEC5]">Intern</span>
            <span className="text-[#2a5f74]">Hub</span>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="text-[#5DB2C7] hover:bg-[#D9F0F4] p-2 rounded-full transition-all duration-300 hover:scale-105 ml-2 flex-shrink-0"
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          <FontAwesomeIcon
            icon={isExpanded ? faChevronLeft : faChevronRight}
            className="transition-transform duration-300 ease-in-out"
            size="sm"
          />
        </button>
      </div>

      {/* Sidebar Content (Navigation Items) */}
      <div className="flex-1 overflow-y-auto pt-2 overflow-x-hidden">
        <ul className="space-y-1 px-2">
          {localizedItems.map(item => {
            const isActive = getIsActive(item);
            const icon = iconMap[item.iconId] || faHome;

            const commonClasses = "w-full flex items-center p-3 rounded-lg transition-all duration-300 ease-in-out text-sm";
            const activeClasses = "bg-[#D9F0F4] text-[#2a5f74] border-2 border-[#3298BA] shadow-md";
            const inactiveClasses = "hover:bg-[#D9F0F4] text-[#2a5f74] hover:shadow-sm";
            const alignmentClass = isExpanded ? "justify-start" : "justify-center";

            const itemContent = (
              <>
                <span className={`flex-shrink-0 flex items-center ${isExpanded ? 'w-6' : 'w-auto'} justify-center`}>
                  <FontAwesomeIcon icon={icon} size="lg" className={`transition-all duration-300 ease-in-out ${isActive ? 'text-[#3298BA]' : 'text-[#2a5f74]'}`} />
                </span>
                <span
                  className={`whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'ml-3 opacity-100 max-w-[150px]' : 'ml-0 opacity-0 max-w-0'
                    }`}
                >
                  {item.label}
                </span>
              </>
            );

            if (item.isPage) {
              return (
                <li key={item.id}>
                  <Link
                    href={item.path}
                    className={`${commonClasses} ${alignmentClass} ${isActive ? activeClasses : inactiveClasses}`}
                    onClick={() => !isExpanded && setIsExpanded(false)} // Keep expanded if clicking on mobile for views, collapse for pages
                  >
                    {itemContent}
                  </Link>
                </li>
              );
            } else if (onViewChange) {
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleViewChange(item.id)} // handleViewChange already collapses sidebar
                    className={`${commonClasses} ${alignmentClass} ${isActive ? activeClasses : inactiveClasses}`}
                  >
                    {itemContent}
                  </button>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>

      {/* Sidebar Footer (Logout Button) */}
      <div className={`w-full p-3 border-t border-[#5DB2C7] transition-all duration-300 ease-in-out flex ${isExpanded ? 'justify-start' : 'justify-center'}`}>
        {isExpanded ? (
          <ActionButton
            buttonType="reject"
            onClick={handleLogout}
            icon={faRightFromBracket}
            text="Logout"
            buttonClassName="flex items-center justify-center p-2.5 text-sm font-bold"
            iconClassName="mr-2"
            style={{
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '9999px',
              width: '100%'
            }}
          />
        ) : (
          <button
            onClick={handleLogout}
            className="p-2.5 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-red-700/20"
            style={{ color: '#e74c3c' }}
            aria-label="Logout"
          >
            <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
          </button>
        )}
      </div>
    </div>
  );
} 