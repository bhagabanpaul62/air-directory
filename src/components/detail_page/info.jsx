import React from "react";

function Info({ Info, Description }) {
  return (
    <div className="p-8">
      {/* Header with decorative element */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
        <h2 className="text-2xl font-bold text-gray-900">About</h2>
      </div>

      <div className="space-y-6">
        
        {Info && (
          <div className="prose prose-gray max-w-none">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
              Overview
            </h3>
            <p className="text-gray-600 text-base leading-relaxed whitespace-pre-line">
              {Info}
            </p>
          </div>
        )}

        {Description && (
          <div className="prose prose-gray max-w-none">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
              Details
            </h3>
            <p className="text-gray-600 text-base leading-relaxed whitespace-pre-line">
              {Description}
            </p>
          </div>
        )}

        {!Info && !Description && (
          <div className="flex items-center justify-center py-12 text-center">
            <div className="text-gray-400">
              <svg
                className="mx-auto h-12 w-12 mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm font-medium">No information available</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Info;
