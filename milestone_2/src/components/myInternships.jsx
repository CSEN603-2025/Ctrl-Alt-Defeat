"use client";
import { useState } from 'react';
import CardTable from './shared/CardTable';
import DatePicker from './DatePicker';
import InternshipRow from './shared/InternshipRow';
import { mockInternships } from '../../constants/index';

export default function MyInternships() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedDate, setSelectedDate] = useState(null);

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

    return matchesSearch && matchesStatus && matchesDate;
  };

  return (
    <div className="w-full px-4 py-6 space-y-4">
      <div className="w-full max-w-3xl mx-auto">
        {/* First CardTable for Title and Search Bar */}
        <CardTable
          title="MY INTERNSHIPS"
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
            {['all', 'current', 'completed', 'evaluated'].map((tab) => (
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

        {/* Second CardTable for Internship Cards */}
        <CardTable
          data={mockInternships}
          filterFunction={filterFunction}
          emptyMessage="No internships found matching your criteria."
          searchConfig={{
            hideSearchBar: true
          }}
          filterConfig={{ showFilter: false }}
          renderCard={(internship) => (
            <InternshipRow
              key={internship.id}
              internship={internship}
              className="mb-3"
            />
          )}
        />
      </div>
    </div>
  );
}