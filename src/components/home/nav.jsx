"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  const [airlinesOpen, setAirlinesOpen] = useState(false);
  const [airportsOpen, setAirportsOpen] = useState(false);
  const [officesOpen, setOfficesOpen] = useState(false);
  const [directoryOpen, setDirectoryOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAirlinesOpen, setMobileAirlinesOpen] = useState(false);
  const [mobileAirportsOpen, setMobileAirportsOpen] = useState(false);
  const [mobileOfficesOpen, setMobileOfficesOpen] = useState(false);

  const navRef = useRef(null);

  const continents = [
    "Africa",
    "Asia",
    "Europe",
    "North America",
    "South America",
    "Oceania",
    "Antarctica",
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
        setMobileAirlinesOpen(false);
        setMobileAirportsOpen(false);
        setMobileOfficesOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
        setMobileAirlinesOpen(false);
        setMobileAirportsOpen(false);
        setMobileOfficesOpen(false);
        setAirlinesOpen(false);
        setAirportsOpen(false);
        setOfficesOpen(false);
        setDirectoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileAirlinesOpen(false);
    setMobileAirportsOpen(false);
    setMobileOfficesOpen(false);
  };

  return (
    <nav ref={navRef} className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <Image
              src="/logo-removebg-preview.png"
              alt="OfficeLookup Logo"
              width={40}
              height={40}
              className="h-10 w-auto object-contain"
            />
            <span className="text-xl sm:text-2xl font-bold text-brand hover:text-brand/80 transition-colors">
              OfficeLookup
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-brand font-medium transition-colors"
            >
              Home
            </Link>

            {/* Directory Dropdown */}
            <div className="relative group">
              <button
                className="text-gray-700 hover:text-brand font-medium flex items-center gap-1 transition-colors"
                onClick={() => {
                  setDirectoryOpen(!directoryOpen);
                  setAirlinesOpen(false);
                  setAirportsOpen(false);
                  setOfficesOpen(false);
                }}
              >
                Directory
                <svg
                  className={`w-4 h-4 transition-transform ${
                    directoryOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {directoryOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100 animate-fadeIn">
                  <Link
                    href="/airlines"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand/5 hover:text-brand transition-colors"
                    onClick={() => setDirectoryOpen(false)}
                  >
                    Airlines
                  </Link>
                  <Link
                    href="/airports"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand/5 hover:text-brand transition-colors"
                    onClick={() => setDirectoryOpen(false)}
                  >
                    Airports
                  </Link>
                  <Link
                    href="/office"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand/5 hover:text-brand transition-colors"
                    onClick={() => setDirectoryOpen(false)}
                  >
                    Offices
                  </Link>
                </div>
              )}
            </div>

            {/* Airlines Dropdown */}
            <div className="relative group">
              <button
                className="text-gray-700 hover:text-brand font-medium flex items-center gap-1 transition-colors"
                onClick={() => {
                  setAirlinesOpen(!airlinesOpen);
                  setAirportsOpen(false);
                  setOfficesOpen(false);
                  setDirectoryOpen(false);
                }}
              >
                Airlines
                <svg
                  className={`w-4 h-4 transition-transform ${
                    airlinesOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {airlinesOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100 animate-fadeIn">
                  {continents.map((c) => (
                    <Link
                      key={c}
                      href={`/airlines/${c.toLowerCase().replace(/\s+/g, "-")}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand/5 hover:text-brand transition-colors"
                      onClick={() => setAirlinesOpen(false)}
                    >
                      {c}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Airports Dropdown */}
            <div className="relative group">
              <button
                className="text-gray-700 hover:text-brand font-medium flex items-center gap-1 transition-colors"
                onClick={() => {
                  setAirportsOpen(!airportsOpen);
                  setAirlinesOpen(false);
                  setOfficesOpen(false);
                  setDirectoryOpen(false);
                }}
              >
                Airports
                <svg
                  className={`w-4 h-4 transition-transform ${
                    airportsOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {airportsOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100 animate-fadeIn">
                  {continents.map((c) => (
                    <Link
                      key={c}
                      href={`/airports/${c.toLowerCase().replace(/\s+/g, "-")}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand/5 hover:text-brand transition-colors"
                      onClick={() => setAirportsOpen(false)}
                    >
                      {c}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Offices Dropdown */}
            <div className="relative group">
              <button
                className="text-gray-700 hover:text-brand font-medium flex items-center gap-1 transition-colors"
                onClick={() => {
                  setOfficesOpen(!officesOpen);
                  setAirlinesOpen(false);
                  setAirportsOpen(false);
                  setDirectoryOpen(false);
                }}
              >
                Offices
                <svg
                  className={`w-4 h-4 transition-transform ${
                    officesOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {officesOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100 animate-fadeIn">
                  {continents.map((c) => (
                    <Link
                      key={c}
                      href={`/office/${c.toLowerCase().replace(/\s+/g, "-")}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand/5 hover:text-brand transition-colors"
                      onClick={() => setOfficesOpen(false)}
                    >
                      {c}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brand transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="bg-white border-t border-gray-200 shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Home Link */}
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand hover:bg-brand/5 transition-colors"
              onClick={closeMobileMenu}
            >
              Home
            </Link>

            {/* Airlines Dropdown */}
            <div>
              <button
                className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand hover:bg-brand/5 transition-colors"
                onClick={() => setMobileAirlinesOpen(!mobileAirlinesOpen)}
              >
                <span>Airlines</span>
                <svg
                  className={`w-5 h-5 transition-transform ${
                    mobileAirlinesOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  mobileAirlinesOpen ? "max-h-96" : "max-h-0"
                }`}
              >
                {continents.map((c) => (
                  <Link
                    key={c}
                    href={`/airlines/${c.toLowerCase().replace(/\s+/g, "-")}`}
                    className="block pl-8 pr-3 py-2 text-sm text-gray-600 hover:text-brand hover:bg-brand/5 rounded-md transition-colors"
                    onClick={closeMobileMenu}
                  >
                    {c}
                  </Link>
                ))}
              </div>
            </div>

            {/* Airports Dropdown */}
            <div>
              <button
                className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand hover:bg-brand/5 transition-colors"
                onClick={() => setMobileAirportsOpen(!mobileAirportsOpen)}
              >
                <span>Airports</span>
                <svg
                  className={`w-5 h-5 transition-transform ${
                    mobileAirportsOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  mobileAirportsOpen ? "max-h-96" : "max-h-0"
                }`}
              >
                {continents.map((c) => (
                  <Link
                    key={c}
                    href={`/airports/${c.toLowerCase().replace(/\s+/g, "-")}`}
                    className="block pl-8 pr-3 py-2 text-sm text-gray-600 hover:text-brand hover:bg-brand/5 rounded-md transition-colors"
                    onClick={closeMobileMenu}
                  >
                    {c}
                  </Link>
                ))}
              </div>
            </div>

            {/* Offices Dropdown */}
            <div>
              <button
                className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand hover:bg-brand/5 transition-colors"
                onClick={() => setMobileOfficesOpen(!mobileOfficesOpen)}
              >
                <span>Offices</span>
                <svg
                  className={`w-5 h-5 transition-transform ${
                    mobileOfficesOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  mobileOfficesOpen ? "max-h-96" : "max-h-0"
                }`}
              >
                {continents.map((c) => (
                  <Link
                    key={c}
                    href={`/office/${c.toLowerCase().replace(/\s+/g, "-")}`}
                    className="block pl-8 pr-3 py-2 text-sm text-gray-600 hover:text-brand hover:bg-brand/5 rounded-md transition-colors"
                    onClick={closeMobileMenu}
                  >
                    {c}
                  </Link>
                ))}
              </div>
            </div>

            {/* Directory Link */}
            <Link
              href="/directory"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand hover:bg-brand/5 transition-colors"
              onClick={closeMobileMenu}
            >
              Directory
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
