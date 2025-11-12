"use client";
import { useState, useEffect } from "react";
import Card from "./Card";

// Helper function to create URL-friendly slug
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function Recommendation({ data, text, type, api, itemsPerPage = 8, items }) {
  // If items prop is provided (server-rendered), use it directly
  if (items && items.length > 0) {
    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <Card
              Name={item.Name}
              Background_Image={item.Background_Image}
              Country={item.Country}
              city={item.City}
              IATA={item.IATA}
              ICAO={item.ICAO}
              key={`${item._id}-${i}`}
              id={item._id}
              type={item.type}
              continent={item.continent}
              slug={item.slug}
            />
          ))}
        </div>
      </div>
    );
  }

  // Otherwise use client-side fetching (legacy support)
  return (
    <LegacyRecommendation
      data={data}
      text={text}
      type={type}
      api={api}
      itemsPerPage={itemsPerPage}
    />
  );
}

function LegacyRecommendation({ data, text, type, api, itemsPerPage = 8 }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [mainData, setMainData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, data.Country]);

  const fetchData = async (page) => {
    setLoading(true);
    try {
      // Fetch data with pagination parameters
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getData/${api}?country=${data.Country}&page=${page}&limit=${itemsPerPage}`,
        { cache: "no-store" }
      );

      const result = await response.json();
      setMainData(result.data || []);
      setTotalPages(Math.ceil((result.total || 0) / itemsPerPage));
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setMainData([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-64 mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(itemsPerPage)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-300 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          {data.Country} {text}
        </h2>
        <div className="w-20 h-1 bg-blue-600 rounded-full"></div>
      </div>

      {/* Cards Container */}
      {mainData.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {mainData.map((item, i) => (
              <Card
                Name={item.Name}
                Background_Image={item.Background_Image}
                Country={item.Country}
                city={item.City}
                IATA={item.IATA}
                ICAO={item.ICAO}
                key={`${item._id}-${i}`}
                id={item._id}
                type={type}
                continent={createSlug(item.Continent || "other")}
                slug={createSlug(item.Name)}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                const isCurrentPage = page === currentPage;

                // Show only a few pages around current page
                if (
                  totalPages <= 7 ||
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 2 && page <= currentPage + 2)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 text-sm font-medium rounded-md ${
                        isCurrentPage
                          ? "bg-blue-600 text-white border border-blue-600"
                          : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  );
                }

                // Show ellipsis
                if (page === currentPage - 3 || page === currentPage + 3) {
                  return (
                    <span key={page} className="px-2 py-2 text-gray-500">
                      ...
                    </span>
                  );
                }

                return null;
              })}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No {text.toLowerCase()} found in {data.Country}
          </p>
        </div>
      )}
    </div>
  );
}

export default Recommendation;
