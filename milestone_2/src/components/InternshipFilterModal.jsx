"use client";

import { useState, useEffect, useRef } from 'react';
import { INDUSTRIES } from '../../constants';
import SearchableSelect from './SearchableSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faFilter, faXmark } from '@fortawesome/free-solid-svg-icons';
import ActionButton from './shared/ActionButton';

// Updated slider configuration with 1-month steps
const DURATION_CONFIG = {
  min: 1,
  max: 12,
  step: 1,
  // For displaying the value in proper format
  formatDuration: (months) => {
    return months === 1 ? "1 month" : `${months} months`;
  },
  // For parsing durations from internship duration strings
  parseDuration: (durationStr) => {
    if (!durationStr) return null;
    const match = durationStr.match(/(\d+)/);
    return match ? parseInt(match[1]) : null;
  }
};

export default function InternshipFilterModal({ open, onClose, initialFilters, onApplyFilters }) {
  const [filters, setFilters] = useState({
    industry: '',
    duration: '',
    isPaid: null,
    ...initialFilters
  });

  const [sliderValue, setSliderValue] = useState(DURATION_CONFIG.min);
  const sliderRef = useRef(null);

  // Reset filters when modal opens with new initialFilters
  useEffect(() => {
    if (open) {
      const newFilters = {
        industry: '',
        duration: '',
        isPaid: null,
        ...initialFilters
      };

      setFilters(newFilters);

      // Set slider value based on initialFilters.duration if it exists
      if (initialFilters?.duration) {
        const parsedDuration = DURATION_CONFIG.parseDuration(initialFilters.duration);
        if (parsedDuration) {
          setSliderValue(parsedDuration);
        } else {
          setSliderValue(DURATION_CONFIG.min);
        }
      } else {
        setSliderValue(DURATION_CONFIG.min);
      }
    }
  }, [open, initialFilters]);

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setSliderValue(value);
    setFilters({
      ...filters,
      duration: DURATION_CONFIG.formatDuration(value)
    });
  };

  const handleApplyFilters = () => {
    // Prepare filters for proper duration matching
    const appliedFilters = { ...filters };

    // Only include duration filter if there's a value
    if (sliderValue > 0) {
      appliedFilters.duration = DURATION_CONFIG.formatDuration(sliderValue);
    }

    onApplyFilters(appliedFilters);
    onClose();
  };

  const handleResetFilters = () => {
    const resetFilters = {
      industry: '',
      duration: '',
      isPaid: null
    };
    setFilters(resetFilters);
    setSliderValue(DURATION_CONFIG.min);
    onApplyFilters(resetFilters);
    onClose();
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
    setSliderValue(DURATION_CONFIG.min);
  };

  const clearPaidFilter = () => {
    setFilters({
      ...filters,
      isPaid: null
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-metallica-blue-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg p-6 animate-slideUp">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-metallica-blue-800 flex items-center">
            <FontAwesomeIcon icon={faFilter} className="mr-2" />
            Filter Internships
          </h2>
          <button
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {/* Active Filters Display */}
        {(filters.industry || filters.duration || filters.isPaid !== null) && (
          <div className="mb-4 flex flex-wrap gap-2">
            <div className="text-sm text-gray-500 mr-1 flex items-center">Active filters:</div>

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
          </div>
        )}

        <div className="space-y-6">
          {/* Industry Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex justify-between">
              <span>Industry</span>
              {filters.industry && (
                <button
                  className="text-xs text-metallica-blue-600 hover:text-metallica-blue-800 flex items-center"
                  onClick={clearIndustryFilter}
                >
                  Clear <FontAwesomeIcon icon={faXmark} className="ml-1" />
                </button>
              )}
            </label>
            <SearchableSelect
              name="industry"
              value={filters.industry}
              options={INDUSTRIES.map(i => ({ label: i, value: i }))}
              onChange={e => setFilters({ ...filters, industry: e.target.value })}
              placeholder="Select industry"
            />
          </div>

          {/* Duration Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex justify-between">
              <span>Duration</span>
              {filters.duration && (
                <button
                  className="text-xs text-metallica-blue-600 hover:text-metallica-blue-800 flex items-center"
                  onClick={clearDurationFilter}
                >
                  Clear <FontAwesomeIcon icon={faXmark} className="ml-1" />
                </button>
              )}
            </label>
            <div className="mt-2 px-2">
              <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                <span>1 month</span>
                <span>12 months</span>
              </div>
              <div className="relative">
                <input
                  ref={sliderRef}
                  type="range"
                  min={DURATION_CONFIG.min}
                  max={DURATION_CONFIG.max}
                  step={DURATION_CONFIG.step}
                  value={sliderValue}
                  onChange={handleSliderChange}
                  className="w-full h-2 bg-[#D9F0F4] rounded-lg appearance-none cursor-pointer"
                  style={{
                    WebkitAppearance: 'none',
                    outline: 'none'
                  }}
                />
                {/* Custom styling for the slider thumb */}
                <style jsx>{`
                  input[type=range]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    background: #3298BA;
                    border-radius: 50%;
                    cursor: pointer;
                    border: 2px solid white;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
                  }
                  
                  input[type=range]::-moz-range-thumb {
                    width: 20px;
                    height: 20px;
                    background: #3298BA;
                    border-radius: 50%;
                    cursor: pointer;
                    border: 2px solid white;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
                  }
                `}</style>
              </div>
              <div className="text-center mt-2 text-metallica-blue-700 font-medium">
                {DURATION_CONFIG.formatDuration(sliderValue)}
              </div>

              {/* Duration tick marks - now showing all 12 months */}
              <div className="flex justify-between mt-1">
                {Array.from(
                  { length: DURATION_CONFIG.max },
                  (_, i) => DURATION_CONFIG.min + i
                ).map((month) => (
                  <div
                    key={month}
                    className="h-1 w-1 bg-metallica-blue-300 rounded-full"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Paid/Unpaid Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex justify-between">
              <span>Payment Status</span>
              {filters.isPaid !== null && (
                <button
                  className="text-xs text-metallica-blue-600 hover:text-metallica-blue-800 flex items-center"
                  onClick={clearPaidFilter}
                >
                  Clear <FontAwesomeIcon icon={faXmark} className="ml-1" />
                </button>
              )}
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setFilters({ ...filters, isPaid: true })}
                className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-colors border ${filters.isPaid === true
                  ? 'bg-[#D9F0F4] text-[#2a5f74] border-2 border-[#3298BA]'
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
              >
                Paid
              </button>
              <button
                type="button"
                onClick={() => setFilters({ ...filters, isPaid: false })}
                className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-colors border ${filters.isPaid === false
                  ? 'bg-[#D9F0F4] text-[#2a5f74] border-2 border-[#3298BA]'
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
              >
                Unpaid
              </button>
              <button
                type="button"
                onClick={() => setFilters({ ...filters, isPaid: null })}
                className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-colors border ${filters.isPaid === null
                  ? 'bg-[#D9F0F4] text-[#2a5f74] border-2 border-[#3298BA]'
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
              >
                All
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <ActionButton
              buttonType="reject"
              text="Reset All Filters"
              onClick={handleResetFilters}
              buttonClassName="w-fit"
            />
            <ActionButton
              buttonType="accept"
              text="Apply Filters"
              onClick={handleApplyFilters}
              buttonClassName="w-fit"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 