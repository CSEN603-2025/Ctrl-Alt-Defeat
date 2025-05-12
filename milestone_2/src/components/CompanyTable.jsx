"use client";
import React, { useState } from 'react';
import SearchBar from './shared/SearchBar';
import IndustryFilter from './IndustryFilter';
import CompanyDetails from './CompanyDetails';
import CompanyDetailsModal from './CompanyDetailsModal';
import { INDUSTRIES } from '../../constants';
import CompanyRow from './CompanyRow';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";

export default function CompanyTable({ companies }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCompany, setModalCompany] = useState(null);

  // Updated filtering logic
  const filteredCompanies = companies.filter(company => {
    const nameMatch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const industrySearchMatch = company.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const industryFilterMatch = selectedIndustry ? company.industry === selectedIndustry : true;

    return (nameMatch || industrySearchMatch) && industryFilterMatch;
  });

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    setIsExpanded(false);
  };

  const handleExpand = () => setIsExpanded(true);
  const handleCollapse = () => setIsExpanded(false);

  const handleRowClick = (company) => {
    setSelectedCompany(company);
  };

  const handleCloseSidebar = () => {
    setSelectedCompany(null);
    setIsExpanded(false);
  };

  // Modal logic
  const handleExpandModal = (company) => {
    setModalCompany(company);
    setModalOpen(true);
  };
  const handleCloseModal = (actionTaken = false) => {
    setModalOpen(false);
    setModalCompany(null);

    // If an action was taken (accept/reject), also close the sidebar
    if (actionTaken) {
      handleCloseSidebar();
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      {/* Header Section */}
      <div className="w-full max-w-6xl mb-8 mx-auto">
        <h1 className="text-3xl font-bold mb-0 text-left text-[#2a5f74] relative">
          Company Applications
          <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#2a5f74]"></span>
        </h1>

        {/* Moved Filter Controls Container */}
      </div>

      <div className={`relative flex w-full justify-center transition-all duration-600 ${selectedCompany ? 'pr-[420px]' : ''}`}>
        {/* Table Section */}
        <div className={`w-full max-w-6xl ${selectedCompany ? 'max-w-4xl' : ''} text-sm transition-all duration-600`}>
          {/* Filter Controls Container */}
          <div className={`w-full max-w-6xl ${selectedCompany ? 'max-w-4xl' : ''} flex flex-col md:flex-row justify-between gap-4 bg-metallica-blue-100/50 backdrop-blur-sm p-3 rounded-2xl border border-gray-100 shadow-sm mb-6 transition-all duration-600`}>
            <div className="w-full md:w-1/3">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>

            {/* Industry Filter Dropdown */}
            <div className="w-full md:w-1/3">
              <IndustryFilter
                selectedIndustry={selectedIndustry}
                setSelectedIndustry={setSelectedIndustry}
                industries={INDUSTRIES}
              />
            </div>
          </div>
          {/* Column Headers */}
          <div className="grid grid-cols-12 gap-2 mb-3 px-4 text-xs font-medium text-gray-500 tracking-wide">
            <div className="col-span-5">COMPANY</div>
            <div className={`col-span-5 pl-0 ${selectedCompany ? "sm:pl-0 md:pl-1 lg:pl-8" : "sm:pl-6 md:pl-8 lg:pl-14"}`}>INDUSTRY</div>
            <div className="col-span-2 text-right">SIZE</div>
          </div>

          {/* Company Rows */}
          <div className="space-y-2">
            {filteredCompanies.map((company) => (
              <CompanyRow
                key={company.name}
                company={company}
                onClick={handleRowClick}
                selected={
                  (selectedCompany && selectedCompany.name === company.name) ||
                  (modalCompany && modalCompany.name === company.name && modalOpen)
                }
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredCompanies.length === 0 && (
            <div className="p-16 text-center">
              <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-gray-500 font-medium">No companies found matching your criteria</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filter</p>
            </div>
          )}
        </div>

        {/* Sidebar for Company Details */}
        {selectedCompany && (
          <div
            // bg-[#002a38]
            className={`fixed top-0 right-0 h-screen w-1/3 bg-metallica-blue-100/70 backdrop-blur-md shadow-xl z-50 flex flex-col border-l border-metallica-blue-100 ${isExpanded ? 'animate-slide-out' : 'animate-slide-in'}`}
            style={{ minWidth: 420, maxWidth: 500 }}
          >
            <div className="flex justify-end p-4 gap-4">
              <button
                onClick={() => handleExpandModal(selectedCompany)}
                className="companyrow-size-badge bg-white/80 text-metallica-blue-700 !border !border-metallica-blue-400 px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 hover:bg-white"
              >
                Expand
              </button>
              <button
                onClick={handleCloseSidebar}
                className="h-8 w-8 flex items-center justify-center rounded-full bg-white/80 border border-gray-200 text-gray-500 hover:text-gray-800 hover:bg-white transition-colors duration-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute top-0 left-0 px-4 py-2 bg-metallica-blue-700 text-white text-lg font-bold rounded-br-lg">
                Company Details
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <CompanyDetails
                variant="big"
                companyName={selectedCompany.name}
                companyEmail={selectedCompany.email}
                companyLogo={selectedCompany.logo}
                industry={selectedCompany.industry}
                size={selectedCompany.size}
                documentation={selectedCompany.documentation}
                onExpand={() => { }}
                onCollapse={handleCloseSidebar}
                onExpandModal={() => handleExpandModal(selectedCompany)}
              />
            </div>
          </div>
        )}
      </div>
      {/* Company Details Modal */}
      <CompanyDetailsModal
        open={modalOpen}
        onClose={handleCloseModal}
        companyName={modalCompany?.name}
        companyEmail={modalCompany?.email}
        companyLogo={modalCompany?.logo}
        industry={modalCompany?.industry}
        size={modalCompany?.size}
        documentation={modalCompany?.documentation}
      />
      <style jsx global>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slide-out {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
        .animate-slide-in {
          animation: slide-in 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-slide-out {
          animation: slide-out 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        body {
          background: #f8fafc;
        }
      `}</style>
    </div>
  );
}