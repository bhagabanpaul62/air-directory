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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 mb-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{mainText}</h1>
        <p className="text-gray-600">{subtext}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-2">
        {data?.map((item, i) => {
          const displayName = item; // "North America" (keep original)
          const url = buildUrl(item);

          return (
            <Link key={i} href={url} className="bg-white  transition-all">
              <span className="text-gray-900 hover:text-blue-600 font-medium">
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
