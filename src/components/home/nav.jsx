"use client";

import { useState } from "react";
import Link from "next/link";

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 right-0 z-50" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">AD</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">
              Airdir
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/airlines"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/airlines"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Airlines
            </Link>
            <Link
              href="/airports"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Airports
            </Link>
           
            <Link
              href="/directory"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Turms 
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-400"
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
                type="text"
                placeholder="Search..."
                className="w-64 xl:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-black text-black"
              />
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {!isMobileMenuOpen ? (
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              {/* Mobile Search */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-4 w-4 text-gray-400"
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
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-black text-black"
                  />
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <Link
                href="/airlines"
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Airlines
              </Link>
              <Link
                href="/airports"
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Airports
              </Link>
              <Link
                href="/offices"
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Offices
              </Link>
              <Link
                href="/directory"
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Directory
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
