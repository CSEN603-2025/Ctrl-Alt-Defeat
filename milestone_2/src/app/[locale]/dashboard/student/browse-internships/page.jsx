// View a list of suggested companies based on my job interests, industry and recommendations from past interns

'use client';
import { useState } from 'react';
import InternshipList from '@/components/shared/InternshipList';
import { getRegularInternships, getRecommendedInternships } from "../../../../../../constants/internshipData";

export default function BrowseInternshipsPage() {
  const [filterType, setFilterType] = useState('all');

  const internshipsToDisplay = filterType === 'all'
    ? getRegularInternships()
    : getRecommendedInternships();

  return (
    <div className="container mx-auto px-4 pt-0 pb-8">
      <InternshipList
        title="INTERNSHIP OPPORTUNITIES"
        internships={internshipsToDisplay}
        type="regular"
        customFilterPanel={
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setFilterType('all')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors border
                ${filterType === 'all'
                  ? 'bg-[#D9F0F4] text-[#2a5f74] border-2 border-[#3298BA]'
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}
              `}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('recommended')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors border
                ${filterType === 'recommended'
                  ? 'bg-[#D9F0F4] text-[#2a5f74] border-2 border-[#3298BA]'
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}
              `}
            >
              Recommended
            </button>
          </div>
        }
      />
    </div>
  );
}
