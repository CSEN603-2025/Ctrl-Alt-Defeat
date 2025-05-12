"use client";
import { useState } from 'react';
import CardTable from './CardTable';
import DatePicker from '../DatePicker';
import InternshipRow from './InternshipRow';
import NoResults from './NoResults';

const statusColors = {
  // Applied internship statuses
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-400',
  accepted: 'bg-green-100 text-green-800 border-green-400',
  finalized: 'bg-purple-100 text-purple-800 border-purple-400',
  rejected: 'bg-red-100 text-red-800 border-red-400',

  // My internship statuses
  current: 'bg-blue-100 text-blue-800 border-blue-400',
  completed: 'bg-green-100 text-green-800 border-green-400',
  evaluated: 'bg-purple-100 text-purple-800 border-purple-400',
};

export default function InternshipList({
  title = "INTERNSHIPS",
  internships = [],
  type = "regular", // "regular", "my", "applied"
  statuses = [],
  customFilterPanel,
  onApplicationCompleted,
  appliedInternshipIds = new Set(),
  showDatePicker = true,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedDate, setSelectedDate] = useState(null);

  // Default statuses if none provided
  const displayStatuses = statuses.length > 0 ? statuses :
    type === "my" ? ['current', 'completed', 'evaluated'] :
      type === "applied" ? ['pending', 'accepted', 'finalized', 'rejected'] :
        [];

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
      (type === "applied" && internship.appliedDate && new Date(internship.appliedDate).toDateString() === new Date(selectedDate).toDateString()) ||
      (type !== "applied" && internship.startDate && new Date(internship.startDate).toDateString() === new Date(selectedDate).toDateString())
    );

    // For "applied" type, only show internships with applied statuses
    if (type === "applied") {
      const isApplied = displayStatuses.includes(internship.status?.toLowerCase());
      return matchesSearch && matchesStatus && matchesDate && isApplied;
    }

    // For "my" type, only show internships with my statuses
    if (type === "my") {
      const isMine = displayStatuses.includes(internship.status?.toLowerCase());
      return matchesSearch && matchesStatus && matchesDate && isMine;
    }

    // For regular internships, show all
    return matchesSearch && matchesStatus && matchesDate;
  };

  return (
    <div className="w-full px-4 py-6 space-y-4">
      <div className="w-full max-w-3xl mx-auto">
        {/* First CardTable for Search Bar only */}
        <CardTable
          title=""
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

        {/* Custom Filter Panel (e.g., All/Recommended) */}
        {customFilterPanel && (
          <div className="py-2 mb-4">{customFilterPanel}</div>
        )}

        {/* Status Tabs and Date Picker Row */}
        {displayStatuses.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2 mb-4">
            {/* Status Tabs */}
            <div className="flex flex-wrap gap-2">
              {['all', ...displayStatuses].map((tab) => (
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

            {showDatePicker && (
              <DatePicker
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
              />
            )}
          </div>
        )}

        {/* Internship Cards */}
        <CardTable
          data={internships}
          filterFunction={filterFunction}
          emptyMessage={
            <NoResults
              mainMessage={`No internships found matching your criteria`}
              subMessage="Try adjusting your search or filter"
            />
          }
          searchConfig={{
            hideSearchBar: true
          }}
          filterConfig={{ showFilter: false }}
          renderCard={(internship) => (
            <InternshipRow
              key={internship.id}
              internship={internship}
              type={type}
              statusColors={statusColors}
              onApplicationCompleted={onApplicationCompleted}
              isApplied={appliedInternshipIds.has(internship.id)}
            />
          )}
        />
      </div>
    </div>
  );
} 