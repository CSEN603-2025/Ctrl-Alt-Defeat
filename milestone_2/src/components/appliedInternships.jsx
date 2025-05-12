"use client";
import { useState } from 'react';
import CardTable from './shared/CardTable';
import DatePicker from './DatePicker';
import InternshipRow from './shared/InternshipRow';
import { MOCK_APPLIED_INTERNSHIPS } from '../../constants/mockData';
import InfoCard from './shared/InfoCard';
import StatusBadge from './shared/StatusBadge';
import { useRouter } from 'next/navigation';

const APPLIED_STATUSES = ['pending', 'accepted', 'finalized', 'rejected'];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-400',
  accepted: 'bg-green-100 text-green-800 border-green-400',
  finalized: 'bg-purple-100 text-purple-800 border-purple-400',
  rejected: 'bg-red-100 text-red-800 border-red-400',
};

function AppliedInternshipRow({ internship, statusColors }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHeightAnimating, setIsHeightAnimating] = useState(false);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const router = useRouter();

  const handleToggle = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsHeightAnimating(true);
      setTimeout(() => {
        setIsDescriptionVisible(true);
      }, 400);
    } else {
      setIsDescriptionVisible(false);
      setTimeout(() => {
        setIsHeightAnimating(false);
        setIsOpen(false);
      }, 600);
    }
  };

  return (
    <div className="mb-3 w-full max-w-3xl mx-auto">
      {/* Header Row (Click to Expand) */}
      <div className="relative">
        <button
          onClick={handleToggle}
          className={`group flex flex-col p-4 w-full bg-[#E2F4F7] rounded-lg border-2 border-[#5DB2C7] hover:shadow-md transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] gap-4 relative font-['IBM_Plex_Sans'] ${isHeightAnimating ? 'pb-8' : ''} overflow-hidden`}
        >
          {/* Top Row */}
          <div className="flex items-start gap-4">
            {/* Left: Logo and Company */}
            <div className="flex flex-col items-center w-24 flex-shrink-0 space-y-3">
              <div className="w-12 h-12 rounded-full bg-gray-300"></div>
              <p className="text-sm font-medium text-gray-500 text-center">{internship.company}</p>
            </div>

            {/* Center: Job Details */}
            <div className="flex-1 min-w-0 ml-2">
              <div className="flex flex-col space-y-1">
                <h3 className="text-lg font-bold text-gray-800 text-left">{internship.title}</h3>
                <div className="flex flex-col space-y-2">
                  <p className="text-sm text-gray-600 text-left">{internship.type}</p>
                  <div className="inline-flex">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-800">
                      {internship.jobSetting}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Compensation & Status */}
            <div className="flex flex-col items-end w-32 flex-shrink-0 space-y-2">
              <span className={`font-semibold text-sm ${internship.paid ? 'text-green-600' : 'text-gray-600'}`}>
                {internship.paid ? '$ Paid' : 'Unpaid'}
              </span>
              <StatusBadge color={statusColors[internship.status?.toLowerCase()] || ''}>
                {internship.status?.charAt(0).toUpperCase() + internship.status?.slice(1)}
              </StatusBadge>
            </div>

            {/* Chevron Icon */}
            <span className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 h-5 w-5 text-gray-500 transition-transform duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'rotate-180' : ''}`}>▼</span>

            {/* Applied Date */}
            <span className="absolute bottom-2 right-2 text-xs text-gray-500">
              applied {internship.appliedDate}
            </span>
          </div>

          {/* Expanded Company Details (Left Aligned) */}
          {isHeightAnimating && (
            <div className="mt-4 flex flex-col p-4 w-full text-left space-y-1 transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]">
              <p className={`text-sm text-gray-700 transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${isDescriptionVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>{internship.description}</p>
            </div>
          )}
        </button>
      </div>

      {/* Collapsible Content */}
      <div className={`overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] transform-gpu ${isOpen ? 'max-h-[2000px]' : 'max-h-0'}`}>
        <div className={`px-4 py-4 bg-white rounded-b-lg border border-t-0 border-[#5DB2C7] mt-1 font-['IBM_Plex_Sans'] transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] transform-gpu origin-top ${isOpen ? 'translate-y-0 scale-y-100' : 'translate-y-[-100%] scale-y-0'}`}>
          {/* Section 1 & 2 */}
          <div className="flex flex-col md:flex-row gap-6 mb-4">
            {/* Left */}
            <div className="flex-1 space-y-4 p-3">
              {/* Start Date & Duration */}
              <div className="space-y-2">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Start Date:</span> {internship.startDate}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Duration:</span> {internship.duration}
                </p>
              </div>
              {/* Skills */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-600">Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {internship.skills?.map((skill, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#E2F4F7] text-[#5DB2C7] border border-[#5DB2C7]">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
            {/* Right */}
            <div className="flex-1 space-y-1 p-3">
              {/* Job Description Title */}
              <h4 className="text-sm font-semibold text-gray-600 mb-1">Job Description</h4>
              <div className="border border-[#5DB2C7] rounded-md p-2">
                <p className="text-sm text-gray-600">{internship.description}</p>
              </div>
              {/* Requirements Title */}
              <h4 className="text-sm font-semibold text-gray-600 mb-1">Requirements</h4>
              <div className="border border-[#5DB2C7] rounded-md p-2">
                <p className="text-sm text-gray-600">{internship.requirements || "N/A"}</p>
              </div>
            </div>
          </div>
          {/* Bottom */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-t border-gray-400 mt-6 pt-3">
            <div className="flex flex-col">
              <p className="text-base font-bold text-gray-800">{internship.rate || "Rate not specified"}</p>
              <p className="text-xs text-gray-500 mt-0.5">applied {internship.appliedDate}</p>
            </div>
            <button className="px-4 py-2 bg-[#5DB2C7] text-white rounded-lg hover:bg-[#4796a8] transition w-full sm:w-auto text-sm" onClick={() => router.push(`/dashboard/student/applied-internships/${internship.id}`)}>
              View Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AppliedInternships() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedDate, setSelectedDate] = useState(null);
  const router = useRouter();

  const filterFunction = (internship) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      internship.title.toLowerCase().includes(searchLower) ||
      internship.company.toLowerCase().includes(searchLower) ||
      (internship.skills && internship.skills.some(skill =>
        skill.toLowerCase().includes(searchLower))
      );

    const matchesStatus =
      activeTab === 'all' ||
      internship.status?.toLowerCase() === activeTab;

    const matchesDate = !selectedDate || (
      internship.startDate &&
      new Date(internship.startDate).toDateString() === new Date(selectedDate).toDateString()
    );

    // Only show internships with applied statuses
    const isApplied = APPLIED_STATUSES.includes(internship.status?.toLowerCase());
    return matchesSearch && matchesStatus && matchesDate && isApplied;
  };

  return (
    <div className="w-full px-4 py-6 space-y-4">
      <div className="w-full max-w-3xl mx-auto">
        {/* First CardTable for Title and Search Bar */}
        <CardTable
          title="APPLIED INTERNSHIPS"
          data={[]}
          filterFunction={() => true}
          emptyMessage=""
          searchConfig={{
            searchTerm: searchTerm,
            onSearchChange: setSearchTerm,
            placeholder: 'Search by job title, company, or skills...',
            hideSearchBar: false
          }}
          filterConfig={{ showFilter: false }}
          renderCard={() => null}
        />

        {/* Status Tabs and Date Picker Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2">
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-2">
            {['all', ...APPLIED_STATUSES].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${activeTab === tab
                    ? 'bg-[#D9F0F4] text-[#2a5f74] border-2 border-[#3298BA]'
                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                  }`}
              >
                {tab === 'all' ? 'All' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <DatePicker
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
        </div>

        {/* Internship Cards using InfoCard and StatusBadge */}
        <div className="w-full space-y-3">
          {MOCK_APPLIED_INTERNSHIPS.filter(filterFunction).map((internship) => (
            <AppliedInternshipRow
              key={internship.id}
              internship={internship}
              statusColors={statusColors}
            />
          ))}
          {MOCK_APPLIED_INTERNSHIPS.filter(filterFunction).length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No applied internships found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 