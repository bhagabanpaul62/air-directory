"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function Searchbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [popularSearches, setPopularSearches] = useState([]);
  const [quickFilters, setQuickFilters] = useState([]);
  const [allAirlinesData, setAllAirlinesData] = useState([]);
  const [allAirportsData, setAllAirportsData] = useState([]);
  const [locationData, setLocationData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

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

            locationDataMap[locationKey] = {
              cities,
              airlines: [],
              airports: [],
            };
          });
        });
        setLocationData(locationDataMap);

        // Generate dynamic popular searches from actual data
        const popularAirlines = airlinesData
          .filter((airline) => airline.Name && airline.Name.trim())
          .slice(0, 4)
          .map((airline) => ({
            term: airline.Name,
            type: "airline",
            icon: "✈️",
          }));

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

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl search-container">
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
          <svg
            className={`h-4 w-4 sm:h-5 sm:w-5 transition-colors ${
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
          placeholder="Search airlines, airports, locations..."
          className={`bg-white text-black rounded-xl sm:rounded-2xl placeholder:text-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 w-full h-10 sm:h-12 md:h-14 pl-10 sm:pl-12 pr-4 sm:pr-5 text-sm sm:text-base ${
            isSearchFocused
              ? "focus:ring-blue-600 bg-white"
              : "focus:ring-blue-600 bg-white hover:bg-gray-50"
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
            className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-400 hover:text-gray-600"
          >
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5"
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
  );
}

export default Searchbar;
