"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function DataBox({ mainText, subtext, data, basePath }) {
  const pathname = usePathname();

  // Function to convert name to URL-friendly slug
  const createSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/[^\w-]/g, ""); // Remove special characters except hyphens
  };

  // Build URL based on current path or provided basePath
  const buildUrl = (item) => {
    const slug = createSlug(item);

    if (basePath) {
      // If basePath is provided, use it
      return `${basePath}/${slug}`;
    } else {
      // Otherwise, append to current path
      return `${pathname}/${slug}`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 mb-6 sm:mb-8 lg:mb-10">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          {mainText}
        </h1>
        <p className="text-sm sm:text-base text-gray-600">{subtext}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {data?.map((item, i) => {
          const displayName = item; // "North America" (keep original)
          const url = buildUrl(item);

          return (
            <Link
              key={i}
              href={url}
              className="bg-white p-4 sm:p-5 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all duration-200"
            >
              <span className="text-gray-900 hover:text-blue-600 font-medium text-sm sm:text-base">
                {displayName}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default DataBox;
