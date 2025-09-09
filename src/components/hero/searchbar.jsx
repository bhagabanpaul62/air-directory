import React from "react";

function Searchbar() {
  return (
    <div className="relative w-[30vw]">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <input
        className="bg-white text-black rounded-2xl placeholder:text-gray-500 focus:ring-blue-600 focus:outline-none focus:ring-2 w-full h-[6vh] pl-12 pr-5 transition-all duration-200"
        placeholder="Search airlines, airports, locations..."
      />
    </div>
  );
}

export default Searchbar;
