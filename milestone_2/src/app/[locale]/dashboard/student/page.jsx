// View a list of suggested companies based on my job interests, industry and recommendations from past interns

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import InternshipList from '@/components/shared/InternshipList';
import StudentProfile from '@/components/StudentProfile';
import InternshipFilterModal from '@/components/InternshipFilterModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faXmark } from '@fortawesome/free-solid-svg-icons';
import { getRecommendedInternshipsForStudent } from '../../../../../constants/internshipData';
import { getRegularInternships, getRecommendedInternships, getAppliedInternships, getMyInternships } from '../../../../../constants/internshipData';

// Dashboard Home View Component
function DashboardHomeView({ onApplicationCompleted, appliedInternshipIds }) {
  const [personalizedInternships, setPersonalizedInternships] = useState([]);
  const { currentUser, isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    const userData = currentUser || JSON.parse(sessionStorage.getItem('userSession') || localStorage.getItem('userSession') || '{}');
    if (userData) {
      const recommendations = getRecommendedInternshipsForStudent(userData);
      setPersonalizedInternships(recommendations);
    }
  }, [currentUser]);

  return (
    <div className="container mx-auto px-4 pt-0 pb-8">
      <InternshipList
        title=""
        internships={personalizedInternships}
        type="regular"
        onApplicationCompleted={onApplicationCompleted}
        appliedInternshipIds={appliedInternshipIds}
      />
    </div>
  );
}

// Using the actual page components for each view
function BrowseInternshipsView({ onApplicationCompleted, appliedInternshipIds }) {
  const [filterType, setFilterType] = useState('all');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    industry: '',
    duration: '',
    isPaid: null
  });
  const [filteredInternships, setFilteredInternships] = useState([]);

  // Get internships based on "all" or "recommended" filter type
  const baseInternships = filterType === 'all'
    ? getRegularInternships()
    : getRecommendedInternships();

  // Apply additional filters (industry, duration, paid/unpaid)
  useEffect(() => {
    let result = [...baseInternships];

    // Filter by industry
    if (filters.industry) {
      result = result.filter(internship =>
        internship.industry === filters.industry
      );
    }

    // Filter by duration
    if (filters.duration) {
      result = result.filter(internship => {
        // Parse the duration value from the filter (e.g., "3 months" -> 3)
        const filterDurationMatch = filters.duration.match(/(\d+)/);
        const filterDurationMonths = filterDurationMatch ? parseInt(filterDurationMatch[1]) : 0;

        // Parse the internship duration (e.g., "3 months", "6-8 months", etc.)
        const internshipDurationMatch = internship.duration.match(/(\d+)/);
        const internshipDurationMonths = internshipDurationMatch ? parseInt(internshipDurationMatch[1]) : 0;

        // If we have valid numbers for both, compare them
        if (filterDurationMonths > 0 && internshipDurationMonths > 0) {
          return internshipDurationMonths === filterDurationMonths;
        }

        return true;
      });
    }

    // Filter by paid status
    if (filters.isPaid !== null) {
      result = result.filter(internship =>
        internship.paid === filters.isPaid
      );
    }

    setFilteredInternships(result);
  }, [baseInternships, filters]);

  // Check if any filters are active
  const hasActiveFilters = filters.industry || filters.duration || filters.isPaid !== null;

  // Handle applying filters from modal
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  // Clear individual filters
  const clearIndustryFilter = () => {
    setFilters({
      ...filters,
      industry: ''
    });
  };

  const clearDurationFilter = () => {
    setFilters({
      ...filters,
      duration: ''
    });
  };

  const clearPaidFilter = () => {
    setFilters({
      ...filters,
      isPaid: null
    });
  };

  const clearAllFilters = () => {
    setFilters({
      industry: '',
      duration: '',
      isPaid: null
    });
  };

  return (
    <div className="container mx-auto px-4 pt-0 pb-8">
      <InternshipList
        title=""
        internships={hasActiveFilters ? filteredInternships : baseInternships}
        type="regular"
        onApplicationCompleted={onApplicationCompleted}
        appliedInternshipIds={appliedInternshipIds}
        customFilterPanel={
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${filterType === 'all'
                    ? 'bg-[#D9F0F4] text-[#2a5f74] border-2 border-[#3298BA]'
                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterType('recommended')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${filterType === 'recommended'
                    ? 'bg-[#D9F0F4] text-[#2a5f74] border-2 border-[#3298BA]'
                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  Recommended
                </button>
              </div>
              <button
                onClick={() => setIsFilterModalOpen(true)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border flex items-center gap-1 ml-2 
                  ${hasActiveFilters
                    ? 'bg-[#D9F0F4] text-[#2a5f74] border-2 border-[#3298BA]'
                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
              >
                <FontAwesomeIcon icon={faFilter} className="mr-1" />
                {hasActiveFilters ? 'Filters Applied' : 'Filter'}
                {hasActiveFilters && (
                  <span className="inline-flex items-center justify-center w-5 h-5 bg-[#3298BA] text-white rounded-full text-xs ml-1">
                    {Object.values(filters).filter(f => f !== '' && f !== null).length}
                  </span>
                )}
              </button>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-500">Active filters:</span>

                {filters.industry && (
                  <div className="bg-[#D9F0F4] text-[#2a5f74] px-3 py-1 rounded-full text-sm flex items-center">
                    Industry: {filters.industry}
                    <button
                      className="ml-2 text-[#2a5f74] hover:text-[#1a3f54]"
                      onClick={clearIndustryFilter}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>
                )}

                {filters.duration && (
                  <div className="bg-[#D9F0F4] text-[#2a5f74] px-3 py-1 rounded-full text-sm flex items-center">
                    Duration: {filters.duration}
                    <button
                      className="ml-2 text-[#2a5f74] hover:text-[#1a3f54]"
                      onClick={clearDurationFilter}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>
                )}

                {filters.isPaid !== null && (
                  <div className="bg-[#D9F0F4] text-[#2a5f74] px-3 py-1 rounded-full text-sm flex items-center">
                    {filters.isPaid ? 'Paid' : 'Unpaid'}
                    <button
                      className="ml-2 text-[#2a5f74] hover:text-[#1a3f54]"
                      onClick={clearPaidFilter}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>
                )}

                <button
                  className="text-xs text-metallica-blue-600 hover:text-metallica-blue-800 ml-2 underline"
                  onClick={clearAllFilters}
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        }
      />

      {/* Filter Modal */}
      <InternshipFilterModal
        open={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        initialFilters={filters}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
}

function AppliedInternshipsView() {
  return (
    <div className="container mx-auto px-4 pt-0 pb-8">
      <InternshipList
        title=""
        internships={getAppliedInternships()}
        type="applied"
        statuses={['pending', 'accepted', 'finalized', 'rejected']}
        showDatePicker={false}
      />
    </div>
  );
}

function MyInternshipsView() {
  return (
    <div className="container mx-auto px-4 pt-0 pb-8">
      <InternshipList
        title=""
        internships={getMyInternships()}
        type="my"
        statuses={['current', 'completed', 'evaluated']}
      />
    </div>
  );
}

function ProfileView() {
  return (
    <div className="p-6">
      <StudentProfile />
    </div>
  );
}

// Define the page components map with all views including profile
const viewComponents = {
  'home': DashboardHomeView,
  'browse': BrowseInternshipsView,
  'applied': AppliedInternshipsView,
  'my-internships': MyInternshipsView,
  'profile': ProfileView
};

export default function StudentDashboardPage() {
  const [appliedIdsSet, setAppliedIdsSet] = useState(new Set());

  const handleApplicationCompleted = (internshipId) => {
    setAppliedIdsSet(prevSet => new Set(prevSet).add(internshipId));
  };

  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash && viewComponents[hash]) {
        return hash;
      }
    }
    return 'home';
  });

  const getInitialTitle = (viewId) => {
    switch (viewId) {
      case 'home':
        return "RECOMMENDED OPPORTUNITIES";
      case 'browse':
        return "INTERNSHIP OPPORTUNITIES";
      case 'applied':
        return "APPLIED INTERNSHIPS";
      case 'my-internships':
        return "MY INTERNSHIPS";
      case 'profile':
        return "MY PROFILE";
      default:
        return "RECOMMENDED OPPORTUNITIES";
    }
  };
  const [currentTitle, setCurrentTitle] = useState(() => getInitialTitle(currentView));

  const handleViewChange = (viewId) => {
    setCurrentView(viewId);
    setCurrentTitle(getInitialTitle(viewId));
  };

  useEffect(() => {
    const handleHashChange = () => {
      if (typeof window !== 'undefined') {
        const hash = window.location.hash.replace('#', '');
        if (hash && viewComponents[hash] && hash !== currentView) {
          handleViewChange(hash);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentView]);

  const CurrentViewComponent = viewComponents[currentView];

  // Prepare props for the current view component
  let viewProps = {};
  if (currentView === 'home' || currentView === 'browse') {
    viewProps = {
      onApplicationCompleted: handleApplicationCompleted,
      appliedInternshipIds: appliedIdsSet,
    };
  }

  return (
    <DashboardLayout
      userType="student"
      title={currentTitle} // Pass title directly
      currentViewId={currentView} // Pass currentViewId for sidebar active state
      onViewChange={handleViewChange} // For sidebar navigation
    >
      {CurrentViewComponent && <CurrentViewComponent {...viewProps} />}
    </DashboardLayout>
  );
}
