"use client";

export default function SearchBar({ searchTerm, setSearchTerm, placeholder = "Search..." }) {
  return (
    <div className="relative w-full flex justify-center items-center">
      <div className="relative w-full">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-3 pl-9 pr-4 appearance-none bg-white/80 backdrop-blur-sm border-2 border-gray-300 hover:border-[#5DB2C7] hover:cursor-pointer text-sm text-gray-800 rounded-full shadow-sm focus:outline-none focus:ring-1 focus:ring-[#5DB2C7] focus:border-[#5DB2C7] transition-all duration-300"
        />
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {searchTerm && (
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center"
            onClick={() => setSearchTerm('')}
          >
            <svg
              className="w-4 h-4 text-gray-500 hover:text-gray-700"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 12 12M1 13 13 1"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}