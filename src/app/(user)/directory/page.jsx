
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Directory - OfficeLookup",
  description: "Browse our comprehensive directory of airlines, airports, and aviation offices worldwide.",
};

export default function DirectoryPage() {
  const categories = [
    {
      title: "Airlines",
      description: "Find contact details for thousands of airlines globally.",
      href: "/airlines",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
    },
    {
      title: "Airports",
      description: "Explore information for international and regional airports.",
      href: "/airports",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m8-2a2 2 0 01-2-2h-4a2 2 0 01-2 2v2a2 2 0 002 2h4a2 2 0 002-2v-2z" />
        </svg>
      ),
    },
    {
      title: "Offices",
      description: "Locate airline offices and representatives near you.",
      href: "/office",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m8-2a2 2 0 01-2-2h-4a2 2 0 01-2 2v2a2 2 0 002 2h4a2 2 0 002-2v-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 7v4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Global Aviation Directory
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access our complete database of aviation resources. Choose a category to start exploring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-8 flex flex-col items-center text-center group border border-gray-100"
            >
              <div className="mb-6 p-4 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                {category.icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {category.title}
              </h2>
              <p className="text-gray-600">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
