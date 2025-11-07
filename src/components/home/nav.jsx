"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);
  const [selectedMobileContinent, setSelectedMobileContinent] = useState(null);
  const [selectedMobileCountry, setSelectedMobileCountry] = useState(null);

  // API data states
  const [dropdownData, setDropdownData] = useState({
    airlines: {},
    airports: {},
  });
  const [continents, setContinents] = useState([]);
  const [countries, setCountries] = useState({});
  const [locationData, setLocationData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [allAirlinesData, setAllAirlinesData] = useState([]);
  const [allAirportsData, setAllAirportsData] = useState([]);
  const [popularSearches, setPopularSearches] = useState([]);
  const [quickFilters, setQuickFilters] = useState([]);

  const router = useRouter();
  const pathname = usePathname();

  // API Integration Functions using getData routes
  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [airlinesResponse, airportsResponse] = await Promise.all([
        fetch("/api/getData/airLine"),
        fetch("/api/getData/airPort"),
      ]);

      if (airlinesResponse.ok && airportsResponse.ok) {
        const airlinesData = await airlinesResponse.json();
        const airportsData = await airportsResponse.json();

        setAllAirlinesData(airlinesData);
        setAllAirportsData(airportsData);

        // Process data to extract continents
        const airlineContinents = [
          ...new Set(
            airlinesData
              .map((item) => item.Continent)
              .filter((c) => c && c.trim())
          ),
        ];
        const airportContinents = [
          ...new Set(
            airportsData
              .map((item) => item.Continent)
              .filter((c) => c && c.trim())
          ),
        ];
        const allContinents = [
          ...new Set([...airlineContinents, ...airportContinents]),
        ].sort();

        setContinents(allContinents);

        // Process countries for each continent
        const countriesData = {};
        allContinents.forEach((continent) => {
          const airlineCountries = [
            ...new Set(
              airlinesData
                .filter((item) => item.Continent === continent)
                .map((item) => item.Country)
                .filter((c) => c && c.trim())
            ),
          ];
          const airportCountries = [
            ...new Set(
              airportsData
                .filter((item) => item.Continent === continent)
                .map((item) => item.Country)
                .filter((c) => c && c.trim())
            ),
          ];
          countriesData[continent] = [
            ...new Set([...airlineCountries, ...airportCountries]),
          ].sort();
        });
        setCountries(countriesData);

        // Process location data for continent-country combinations
        const locationDataMap = {};
        allContinents.forEach((continent) => {
          countriesData[continent].forEach((country) => {
            const locationKey = `${continent}-${country}`;

            // Get cities from both airlines and airports
            const airlineCities = [
              ...new Set(
                airlinesData
                  .filter(
                    (item) =>
                      item.Continent === continent && item.Country === country
                  )
                  .map((item) => item.City)
                  .filter((c) => c && c.trim())
              ),
            ];
            const airportCities = [
              ...new Set(
                airportsData
                  .filter(
                    (item) =>
                      item.Continent === continent && item.Country === country
                  )
                  .map((item) => item.City)
                  .filter((c) => c && c.trim())
              ),
            ];
            const cities = [
              ...new Set([...airlineCities, ...airportCities]),
            ].sort();

            // Get airlines and airports for this location
            const airlines = airlinesData
              .filter(
                (item) =>
                  item.Continent === continent &&
                  item.Country === country &&
                  item.Name &&
                  item.Name.trim()
              )
              .map((airline) => ({
                name: airline.Name,
                city: airline.City,
                iata: airline.IATA,
                icao: airline.ICAO,
                website: airline.Website,
              }))
              .sort((a, b) => a.name.localeCompare(b.name));

            const airports = airportsData
              .filter(
                (item) =>
                  item.Continent === continent &&
                  item.Country === country &&
                  item.Name &&
                  item.Name.trim()
              )
              .map((airport) => ({
                name: airport.Name,
                city: airport.City,
                iata: airport.IATA,
                icao: airport.ICAO,
                website: airport.Website,
              }))
              .sort((a, b) => a.name.localeCompare(b.name));

            locationDataMap[locationKey] = {
              cities,
              airlines,
              airports,
            };
          });
        });
        setLocationData(locationDataMap);

        // Generate dynamic popular searches from actual data
        const dynamicPopularSearches = [];

        // Get some popular airlines (first 4 with valid names)
        const popularAirlines = airlinesData
          .filter((airline) => airline.Name && airline.Name.trim())
          .slice(0, 4)
          .map((airline) => ({
            term: airline.Name,
            type: "airline",
            icon: "✈️",
          }));

        // Get some popular airports (first 4 with valid names)
        const popularAirports = airportsData
          .filter((airport) => airport.Name && airport.Name.trim())
          .slice(0, 4)
          .map((airport) => ({
            term: airport.Name,
            type: "airport",
            icon: "🛬",
          }));

        // Combine and shuffle the results
        const combinedSearches = [...popularAirlines, ...popularAirports];
        const shuffled = combinedSearches.sort(() => Math.random() - 0.5);
        setPopularSearches(shuffled.slice(0, 8));

        // Generate dynamic quick filters based on actual continents
        const dynamicQuickFilters = [];

        // Add filters for each continent that has data
        allContinents.slice(0, 3).forEach((continent) => {
          dynamicQuickFilters.push({
            term: `Airlines in ${continent}`,
            filter: "airlines",
            continent: continent,
          });
          dynamicQuickFilters.push({
            term: `Airports in ${continent}`,
            filter: "airports",
            continent: continent,
          });
        });

        // Add a general international filter
        dynamicQuickFilters.push({
          term: "International Airports",
          filter: "airports",
          type: "international",
        });

        setQuickFilters(dynamicQuickFilters.slice(0, 4));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load all data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  // Navigation items configuration
  const navItems = [
    { href: "/", label: "Home", exact: true },
    { href: "/directory", label: "Directory" },
    { href: "/airlines", label: "Airlines", hasDropdown: true },
    { href: "/airports", label: "Airports", hasDropdown: true },
    { href: "/offices", label: "Offices", hasDropdown: true },
  ];

  // Dropdown handlers
  const handleDropdownToggle = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
      setSelectedContinent(null);
      setSelectedCountry(null);
    } else {
      setActiveDropdown(dropdown);
      setSelectedContinent(null);
      setSelectedCountry(null);
    }
  };

  const handleContinentSelect = (continent) => {
    setSelectedContinent(continent);
    setSelectedCountry(null);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  // Mobile dropdown handlers
  const handleMobileDropdownToggle = (dropdown) => {
    if (activeMobileDropdown === dropdown) {
      setActiveMobileDropdown(null);
      setSelectedMobileContinent(null);
      setSelectedMobileCountry(null);
    } else {
      setActiveMobileDropdown(dropdown);
      setSelectedMobileContinent(null);
      setSelectedMobileCountry(null);
    }
  };

  const handleMobileContinentSelect = (continent) => {
    setSelectedMobileContinent(continent);
    setSelectedMobileCountry(null);
  };

  const handleMobileCountrySelect = (country) => {
    setSelectedMobileCountry(country);
  };

  const handleCityClick = (city, type) => {
    const cleanCity = city.split("(")[0].trim();
    router.push(
      `/directory?search=${encodeURIComponent(cleanCity)}&type=${type}`
    );
    // Close all dropdowns
    setActiveDropdown(null);
    setSelectedContinent(null);
    setSelectedCountry(null);
    setActiveMobileDropdown(null);
    setSelectedMobileContinent(null);
    setSelectedMobileCountry(null);
    setIsMobileMenuOpen(false);
  };

  const handleItemClick = (item, type) => {
    router.push(`/directory?search=${encodeURIComponent(item)}&type=${type}`);
    // Close all dropdowns
    setActiveDropdown(null);
    setSelectedContinent(null);
    setSelectedCountry(null);
    setActiveMobileDropdown(null);
    setSelectedMobileContinent(null);
    setSelectedMobileCountry(null);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle search functionality
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to directory with search query
      router.push(
        `/directory?search=${encodeURIComponent(searchQuery.trim())}`
      );
      setSearchQuery("");
      setShowSuggestions(false);
      setIsSearchFocused(false);
      setIsMobileMenuOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.filter) {
      // Handle quick filter suggestions
      let url = `/directory?type=${suggestion.filter}`;
      if (suggestion.continent) {
        url += `&continent=${encodeURIComponent(suggestion.continent)}`;
      }
      if (suggestion.country) {
        url += `&country=${encodeURIComponent(suggestion.country)}`;
      }
      router.push(url);
    } else {
      // Handle regular search suggestions
      router.push(`/directory?search=${encodeURIComponent(suggestion.term)}`);
    }
    setSearchQuery("");
    setShowSuggestions(false);
    setIsSearchFocused(false);
    setIsMobileMenuOpen(false);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim().length > 0) {
      // Create dynamic suggestions from actual data
      const airlineSuggestions = allAirlinesData
        .filter(
          (airline) =>
            airline.Name &&
            airline.Name.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 3)
        .map((airline) => ({
          term: airline.Name,
          type: "airline",
          icon: "✈️",
        }));

      const airportSuggestions = allAirportsData
        .filter(
          (airport) =>
            airport.Name &&
            airport.Name.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 3)
        .map((airport) => ({
          term: airport.Name,
          type: "airport",
          icon: "🛬",
        }));

      // Also search in cities
      const citySuggestions = [];
      Object.values(locationData).forEach((location) => {
        location.cities.forEach((city) => {
          if (
            city.toLowerCase().includes(value.toLowerCase()) &&
            !citySuggestions.some((s) => s.term === city) &&
            citySuggestions.length < 2
          ) {
            citySuggestions.push({
              term: city,
              type: "city",
              icon: "📍",
            });
          }
        });
      });

      const filtered = [
        ...airlineSuggestions,
        ...airportSuggestions,
        ...citySuggestions,
      ];
      setSuggestions(filtered.slice(0, 6)); // Show max 6 suggestions
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    setShowSuggestions(true);
    if (searchQuery.trim().length === 0) {
      setSuggestions(popularSearches.slice(0, 6));
    }
  };

  const handleSearchBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => {
      setIsSearchFocused(false);
      setShowSuggestions(false);
    }, 200);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit(e);
    }
  };

  // Check if current path is active
  const isActiveLink = (href, exact = false) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  // Close mobile menu and dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
      // Close suggestions when clicking outside
      if (showSuggestions && !event.target.closest(".search-container")) {
        setShowSuggestions(false);
        setIsSearchFocused(false);
      }
      // Close dropdowns when clicking outside
      if (activeDropdown && !event.target.closest(".dropdown-container")) {
        setActiveDropdown(null);
        setSelectedContinent(null);
        setSelectedCountry(null);
      }
      // Close mobile dropdowns when clicking outside
      if (
        activeMobileDropdown &&
        !event.target.closest(".mobile-dropdown-container")
      ) {
        setActiveMobileDropdown(null);
        setSelectedMobileContinent(null);
        setSelectedMobileCountry(null);
      }
    };

    if (
      isMobileMenuOpen ||
      showSuggestions ||
      activeDropdown ||
      activeMobileDropdown
    ) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMobileMenuOpen, showSuggestions, activeDropdown, activeMobileDropdown]);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 right-0 z-50">
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
            {navItems.map((item) => (
              <div key={item.href} className="relative dropdown-container">
                {item.hasDropdown ? (
                  <>
                    <button
                      onClick={() =>
                        handleDropdownToggle(item.label.toLowerCase())
                      }
                      className={`flex items-center gap-1 font-medium transition-colors ${
                        isActiveLink(item.href, item.exact) ||
                        activeDropdown === item.label.toLowerCase()
                          ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                          : "text-gray-700 hover:text-blue-600"
                      }`}
                    >
                      {item.label}
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          activeDropdown === item.label.toLowerCase()
                            ? "rotate-180"
                            : ""
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

                    {/* Dropdown Menu */}
                    {activeDropdown === item.label.toLowerCase() && (
                      <div className="absolute top-full mt-2 w-full min-w-[600px] max-w-[1200px] bg-white border border-gray-200 rounded-lg shadow-xl z-50 left-0 xl:left-1/2 xl:transform xl:-translate-x-1/2">
                        <div className="flex flex-col lg:flex-row min-h-64 max-h-96">
                          {/* Continents Column */}
                          <div className="w-full lg:w-2/3 border-r-0 lg:border-r border-gray-200 border-b lg:border-b-0">
                            <div className="px-3 lg:px-4 py-2 lg:py-3 border-b border-gray-100 bg-gray-50">
                              <h3 className="text-xs lg:text-sm font-semibold text-gray-900">
                                1. Choose Continent
                              </h3>
                            </div>
                            <div className="p-2 max-h-32 lg:max-h-full overflow-y-auto">
                              <div className="grid grid-cols-2 lg:grid-cols-1 gap-1">
                                {continents.map((continent) => (
                                  <button
                                    key={continent}
                                    onClick={() =>
                                      handleContinentSelect(continent)
                                    }
                                    className={`w-full text-left px-2 lg:px-3 py-1.5 lg:py-2 text-xs lg:text-sm rounded-md transition-colors ${
                                      selectedContinent === continent
                                        ? "bg-blue-100 text-blue-700 font-medium"
                                        : "text-gray-700 hover:bg-gray-100"
                                    }`}
                                  >
                                    {continent}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Countries Column */}
                          <div className="w-full lg:w-2/3 border-r-0 lg:border-r border-gray-200 border-b lg:border-b-0">
                            <div className="px-3 lg:px-4 py-2 lg:py-3 border-b border-gray-100 bg-gray-50">
                              <h3 className="text-xs lg:text-sm font-semibold text-gray-900">
                                2. Choose Country
                              </h3>
                            </div>
                            <div className="p-2 max-h-32 lg:max-h-full overflow-y-auto">
                              {selectedContinent ? (
                                <div className="space-y-1">
                                  {(countries[selectedContinent] || []).map(
                                    (country) => (
                                      <button
                                        key={country}
                                        onClick={() =>
                                          handleCountrySelect(country)
                                        }
                                        className={`w-full text-left px-2 lg:px-3 py-1.5 lg:py-2 text-xs lg:text-sm rounded-md transition-colors ${
                                          selectedCountry === country
                                            ? "bg-green-100 text-green-700 font-medium"
                                            : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                      >
                                        {country}
                                      </button>
                                    )
                                  )}
                                </div>
                              ) : (
                                <div className="px-2 lg:px-3 py-4 text-xs lg:text-sm text-gray-500 text-center">
                                  Select a continent first
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Cities/Items Column */}
                          <div className="w-full lg:w-2/3">
                            <div className="px-3 lg:px-4 py-2 lg:py-3 border-b border-gray-100 bg-gray-50">
                              <h3 className="text-xs lg:text-sm font-semibold text-gray-900">
                                3.{" "}
                                {item.label.toLowerCase() === "airlines"
                                  ? "Cities & Airlines"
                                  : "Cities & Airports"}
                              </h3>
                            </div>
                            <div className="p-2 max-h-48 lg:max-h-64 overflow-y-auto">
                              {selectedCountry && selectedContinent ? (
                                <div className="space-y-3">
                                  {/* Cities */}
                                  <div>
                                    <h4 className="text-xs font-medium text-gray-500 mb-2 px-2 lg:px-3">
                                      CITIES
                                    </h4>
                                    <div className="space-y-1">
                                      {(() => {
                                        const locationKey = `${selectedContinent}-${selectedCountry}`;
                                        const data = locationData[locationKey];
                                        return data ? (
                                          data.cities.map((city, idx) => (
                                            <button
                                              key={idx}
                                              onClick={() =>
                                                handleCityClick(
                                                  city,
                                                  item.label.toLowerCase()
                                                )
                                              }
                                              className="w-full text-left px-2 lg:px-3 py-1 lg:py-1.5 text-xs lg:text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-700 rounded transition-colors flex items-center gap-1 lg:gap-2"
                                            >
                                              <svg
                                                className="w-3 h-3 flex-shrink-0"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                              >
                                                <path
                                                  fillRule="evenodd"
                                                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                  clipRule="evenodd"
                                                />
                                              </svg>
                                              <span className="truncate">
                                                {city}
                                              </span>
                                            </button>
                                          ))
                                        ) : (
                                          <div className="px-2 lg:px-3 py-2 text-xs lg:text-sm text-gray-500 text-center">
                                            Loading cities...
                                          </div>
                                        );
                                      })()}
                                    </div>
                                  </div>

                                  {/* Airlines/Airports */}
                                  <div>
                                    <h4 className="text-xs font-medium text-gray-500 mb-2 px-2 lg:px-3">
                                      {item.label.toLowerCase() === "airlines"
                                        ? "AIRLINES"
                                        : "AIRPORTS"}
                                    </h4>
                                    <div className="space-y-1">
                                      {(() => {
                                        const locationKey = `${selectedContinent}-${selectedCountry}`;
                                        const data = locationData[locationKey];
                                        const itemsArray = data
                                          ? item.label.toLowerCase() ===
                                            "airlines"
                                            ? data.airlines
                                            : data.airports
                                          : [];

                                        return itemsArray.length > 0 ? (
                                          itemsArray.map((itemData, idx) => (
                                            <button
                                              key={idx}
                                              onClick={() =>
                                                handleItemClick(
                                                  itemData.name,
                                                  item.label.toLowerCase()
                                                )
                                              }
                                              className="w-full text-left px-2 lg:px-3 py-1 lg:py-1.5 text-xs lg:text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded transition-colors flex items-center gap-1 lg:gap-2"
                                            >
                                              <span className="text-sm flex-shrink-0">
                                                {item.label.toLowerCase() ===
                                                "airlines"
                                                  ? "✈️"
                                                  : "🛬"}
                                              </span>
                                              <span className="truncate">
                                                {itemData.name}
                                              </span>
                                            </button>
                                          ))
                                        ) : (
                                          <div className="px-2 lg:px-3 py-2 text-xs lg:text-sm text-gray-500 text-center">
                                            {data
                                              ? "No items found"
                                              : "Loading..."}
                                          </div>
                                        );
                                      })()}
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="px-2 lg:px-3 py-4 text-xs lg:text-sm text-gray-500 text-center">
                                  Select a continent and country first
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t border-gray-200 px-3 lg:px-4 py-2 lg:py-3 bg-gray-50">
                          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                            <p className="text-xs text-gray-600">
                              Browse {item.label.toLowerCase()} by location
                            </p>
                            <Link
                              href="/directory"
                              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                              onClick={() => {
                                setActiveDropdown(null);
                                setSelectedContinent(null);
                                setSelectedCountry(null);
                              }}
                            >
                              View All {item.label} →
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`font-medium transition-colors ${
                      isActiveLink(item.href, item.exact)
                        ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center">
            <div className="relative search-container">
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className={`h-4 w-4 transition-colors ${
                      isSearchFocused ? "text-blue-500" : "text-gray-400"
                    }`}
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
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  onKeyPress={handleSearchKeyPress}
                  placeholder="Search airlines, airports..."
                  className={`w-64 xl:w-80 pl-10 pr-4 py-2 border rounded-lg text-gray-900 placeholder-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isSearchFocused
                      ? "border-blue-500 bg-white"
                      : "border-gray-300 bg-gray-50 hover:bg-white"
                  }`}
                  autoComplete="off"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSuggestions([]);
                    }}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="h-4 w-4"
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
                  </button>
                )}
              </form>

              {/* Search Suggestions Dropdown */}
              {showSuggestions && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                  {searchQuery.trim().length === 0 ? (
                    <>
                      {/* Popular Searches */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          Popular Searches
                        </h4>
                        <div className="space-y-1">
                          {popularSearches.slice(0, 4).map((item, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(item)}
                              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors flex items-center gap-2"
                            >
                              <span className="text-base">{item.icon}</span>
                              <span>{item.term}</span>
                              <span className="ml-auto text-xs text-gray-500 capitalize">
                                {item.type}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Quick Filters */}
                      <div className="px-4 py-3">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          Quick Filters
                        </h4>
                        <div className="space-y-1">
                          {quickFilters.map((filter, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(filter)}
                              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors flex items-center gap-2"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>{filter.term}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Search Results */
                    <div className="px-4 py-3">
                      {suggestions.length > 0 ? (
                        <>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">
                            Suggestions
                          </h4>
                          <div className="space-y-1">
                            {suggestions.map((item, index) => (
                              <button
                                key={index}
                                onClick={() => handleSuggestionClick(item)}
                                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors flex items-center gap-2"
                              >
                                <span className="text-base">{item.icon}</span>
                                <span>{item.term}</span>
                                <span className="ml-auto text-xs text-gray-500 capitalize">
                                  {item.type}
                                </span>
                              </button>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="px-3 py-4 text-sm text-gray-500 text-center">
                          No suggestions found for "{searchQuery}"
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMobileMenu();
            }}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <span className="sr-only">
              {isMobileMenuOpen ? "Close main menu" : "Open main menu"}
            </span>
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
          <div className="lg:hidden" onClick={(e) => e.stopPropagation()}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 bg-white">
              {/* Mobile Search */}
              <div className="mb-4 relative search-container">
                <form onSubmit={handleSearchSubmit} className="relative">
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
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                    onKeyPress={handleSearchKeyPress}
                    placeholder="Search airlines, airports..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 bg-gray-50 hover:bg-white focus:bg-white"
                    autoComplete="off"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setSuggestions([]);
                      }}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      <svg
                        className="h-4 w-4"
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
                    </button>
                  )}
                </form>

                {/* Mobile Search Suggestions */}
                {showSuggestions && (
                  <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                    {searchQuery.trim().length === 0 ? (
                      <>
                        {/* Popular Searches - Mobile */}
                        <div className="px-3 py-2 border-b border-gray-100">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">
                            Popular
                          </h4>
                          <div className="space-y-1">
                            {popularSearches.slice(0, 3).map((item, index) => (
                              <button
                                key={index}
                                onClick={() => handleSuggestionClick(item)}
                                className="w-full text-left px-2 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors flex items-center gap-2"
                              >
                                <span className="text-sm">{item.icon}</span>
                                <span>{item.term}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Quick Filters - Mobile */}
                        <div className="px-3 py-2">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">
                            Filters
                          </h4>
                          <div className="space-y-1">
                            {quickFilters.slice(0, 2).map((filter, index) => (
                              <button
                                key={index}
                                onClick={() => handleSuggestionClick(filter)}
                                className="w-full text-left px-2 py-1.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 rounded transition-colors flex items-center gap-2"
                              >
                                <svg
                                  className="w-3 h-3"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span>{filter.term}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      /* Mobile Search Results */
                      <div className="px-3 py-2">
                        {suggestions.length > 0 ? (
                          <>
                            <h4 className="text-sm font-medium text-gray-900 mb-2">
                              Suggestions
                            </h4>
                            <div className="space-y-1">
                              {suggestions.map((item, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleSuggestionClick(item)}
                                  className="w-full text-left px-2 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors flex items-center gap-2"
                                >
                                  <span className="text-sm">{item.icon}</span>
                                  <span>{item.term}</span>
                                </button>
                              ))}
                            </div>
                          </>
                        ) : (
                          <div className="px-2 py-3 text-sm text-gray-500 text-center">
                            No suggestions for "{searchQuery}"
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-1">
                {navItems.map((item) => (
                  <div key={item.href} className="mobile-dropdown-container">
                    {item.hasDropdown ? (
                      <div className="space-y-1">
                        <button
                          onClick={() =>
                            handleMobileDropdownToggle(item.label.toLowerCase())
                          }
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium transition-colors ${
                            isActiveLink(item.href, item.exact) ||
                            activeMobileDropdown === item.label.toLowerCase()
                              ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600"
                              : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                          }`}
                        >
                          <span>{item.label}</span>
                          <svg
                            className={`w-4 h-4 transition-transform ${
                              activeMobileDropdown === item.label.toLowerCase()
                                ? "rotate-180"
                                : ""
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

                        {/* Mobile Dropdown Content */}
                        {activeMobileDropdown === item.label.toLowerCase() && (
                          <div className="ml-2 mt-2 bg-gray-50 rounded-lg overflow-hidden">
                            {/* Mobile Three-Step Process */}

                            {/* Step 1: Continents */}
                            <div className="p-3 border-b border-gray-200">
                              <h4 className="text-sm font-medium text-gray-900 mb-2">
                                1. Select Continent
                              </h4>
                              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                                {continents.map((continent) => (
                                  <button
                                    key={continent}
                                    onClick={() =>
                                      handleMobileContinentSelect(continent)
                                    }
                                    className={`px-2 py-2 text-sm rounded-md transition-colors text-left ${
                                      selectedMobileContinent === continent
                                        ? "bg-blue-100 text-blue-700 font-medium"
                                        : "text-gray-700 hover:bg-gray-200 bg-white"
                                    }`}
                                  >
                                    <span className="block truncate">
                                      {continent}
                                    </span>
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Step 2: Countries */}
                            {selectedMobileContinent && (
                              <div className="p-3 border-b border-gray-200 max-h-40 overflow-y-auto">
                                <h4 className="text-sm font-medium text-gray-900 mb-2">
                                  2. Select Country
                                </h4>
                                <div className="space-y-1">
                                  {(
                                    countries[selectedMobileContinent] || []
                                  ).map((country) => (
                                    <button
                                      key={country}
                                      onClick={() =>
                                        handleMobileCountrySelect(country)
                                      }
                                      className={`w-full text-left px-2 py-2 text-sm rounded-md transition-colors ${
                                        selectedMobileCountry === country
                                          ? "bg-green-100 text-green-700 font-medium"
                                          : "text-gray-700 hover:bg-gray-200 bg-white"
                                      }`}
                                    >
                                      <span className="block truncate">
                                        {country}
                                      </span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Step 3: Cities and Airlines/Airports */}
                            {selectedMobileCountry &&
                              selectedMobileContinent && (
                                <div className="p-3 max-h-64 overflow-y-auto">
                                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                                    3. Choose Destination
                                  </h4>

                                  {/* Cities */}
                                  <div className="mb-4">
                                    <h5 className="text-xs font-medium text-gray-500 mb-2 px-1">
                                      CITIES
                                    </h5>
                                    <div className="space-y-1">
                                      {(() => {
                                        const locationKey = `${selectedMobileContinent}-${selectedMobileCountry}`;
                                        const data = locationData[locationKey];
                                        return data ? (
                                          data.cities.map((city, idx) => (
                                            <button
                                              key={idx}
                                              onClick={() =>
                                                handleCityClick(
                                                  city,
                                                  item.label.toLowerCase()
                                                )
                                              }
                                              className="w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-orange-100 hover:text-orange-700 rounded transition-colors flex items-center gap-2 bg-white"
                                            >
                                              <svg
                                                className="w-3 h-3 flex-shrink-0"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                              >
                                                <path
                                                  fillRule="evenodd"
                                                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                  clipRule="evenodd"
                                                />
                                              </svg>
                                              <span className="truncate text-xs">
                                                {city}
                                              </span>
                                            </button>
                                          ))
                                        ) : (
                                          <div className="px-2 py-2 text-xs text-gray-500 text-center">
                                            Loading cities...
                                          </div>
                                        );
                                      })()}
                                    </div>
                                  </div>

                                  {/* Airlines/Airports */}
                                  <div>
                                    <h5 className="text-xs font-medium text-gray-500 mb-2 px-1">
                                      {item.label.toLowerCase() === "airlines"
                                        ? "AIRLINES"
                                        : "AIRPORTS"}
                                    </h5>
                                    <div className="space-y-1">
                                      {(() => {
                                        const locationKey = `${selectedMobileContinent}-${selectedMobileCountry}`;
                                        const data = locationData[locationKey];
                                        const itemsArray = data
                                          ? item.label.toLowerCase() ===
                                            "airlines"
                                            ? data.airlines
                                            : data.airports
                                          : [];

                                        return itemsArray.length > 0 ? (
                                          itemsArray.map((itemData, idx) => (
                                            <button
                                              key={idx}
                                              onClick={() =>
                                                handleItemClick(
                                                  itemData.name,
                                                  item.label.toLowerCase()
                                                )
                                              }
                                              className="w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded transition-colors flex items-center gap-2 bg-white"
                                            >
                                              <span className="text-sm flex-shrink-0">
                                                {item.label.toLowerCase() ===
                                                "airlines"
                                                  ? "✈️"
                                                  : "🛬"}
                                              </span>
                                              <span className="text-xs truncate">
                                                {itemData.name}
                                              </span>
                                            </button>
                                          ))
                                        ) : (
                                          <div className="px-2 py-2 text-xs text-gray-500 text-center">
                                            {data
                                              ? "No items found"
                                              : "Loading..."}
                                          </div>
                                        );
                                      })()}
                                    </div>
                                  </div>

                                  {/* View All Link */}
                                  <div className="mt-4 pt-3 border-t border-gray-200">
                                    <Link
                                      href={item.href}
                                      className="block w-full text-center px-2 py-2 text-sm text-blue-600 hover:text-blue-800 font-medium bg-white rounded-md hover:bg-blue-50 transition-colors"
                                      onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setActiveMobileDropdown(null);
                                        setSelectedMobileContinent(null);
                                        setSelectedMobileCountry(null);
                                      }}
                                    >
                                      View All {item.label} →
                                    </Link>
                                  </div>
                                </div>
                              )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                          isActiveLink(item.href, item.exact)
                            ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600"
                            : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
