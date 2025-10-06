import { Suspense } from "react";

import DirectoryFilters from "@/components/directory/DirectoryFilters";
import DirectoryContent from "@/components/directory/DirectoryContent";
import DirectorySitemap from "@/components/directory/DirectorySitemap";

export const metadata = {
  title: "Aviation Directory - Airlines & Airports",
  description:
    "Comprehensive directory of airlines and airports worldwide. Search, filter, and explore aviation data by continent, country, and region.",
  keywords: "airlines, airports, aviation directory, flight search, IATA, ICAO",
};

async function DirectoryPage({ searchParams }) {
  // Get search parameters
  const continent = searchParams?.continent || "";
  const search = searchParams?.search || "";
  const type = searchParams?.type || "all"; // 'airlines', 'airports', or 'all'
  const country = searchParams?.country || "";

  // Fetch data
  const [airlinesRes, airportsRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getData/airLine`, {
      cache: "no-store",
    }),
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getData/airPort`, {
      cache: "no-store",
    }),
  ]);

  if (!airlinesRes.ok || !airportsRes.ok) {
    throw new Error("Failed to fetch directory data");
  }

  const airlines = await airlinesRes.json();
  const airports = await airportsRes.json();

  return (
    <div className="min-h-screen bg-gray-50 mt-15">
      {/* Header Section */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters & Sitemap */}
          <aside className="lg:col-span-1 space-y-6">
            <Suspense
              fallback={
                <div className="animate-pulse bg-white rounded-xl h-64"></div>
              }
            >
              <DirectoryFilters
                airlines={airlines}
                airports={airports}
                currentFilters={{
                  continent,
                  search,
                  type,
                  country,
                }}
              />
            </Suspense>

            <Suspense
              fallback={
                <div className="animate-pulse bg-white rounded-xl h-96"></div>
              }
            >
              <DirectorySitemap airlines={airlines} airports={airports} />
            </Suspense>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <Suspense fallback={<DirectoryContentSkeleton />}>
              <DirectoryContent
                airlines={airlines}
                airports={airports}
                filters={{
                  continent,
                  search,
                  type,
                  country,
                }}
              />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}

// Loading skeleton component
function DirectoryContentSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-300 rounded w-64 mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="h-64 bg-gray-300 rounded-xl"></div>
        ))}
      </div>
    </div>
  );
}

export default DirectoryPage;
