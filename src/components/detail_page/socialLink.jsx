import React from "react";

function SocialLink({ x, Website, youtube, Facebook, Instagram, LinkedIn }) {
  const socialLinks = [
    { name: "Website", url: Website, color: "text-blue-600" },
    { name: "Facebook", url: Facebook, color: "text-blue-600" },
    { name: "Twitter/X", url: x, color: "text-gray-800" },
    { name: "LinkedIn", url: LinkedIn, color: "text-blue-700" },
    { name: "YouTube", url: youtube, color: "text-red-600" },
    { name: "Instagram", url: Instagram, color: "text-pink-600" },
  ].filter((link) => link.url);

  return (
    <div className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Connect With Us
      </h3>

      {socialLinks.length > 0 ? (
        <div className="space-y-2">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={
                link.url.startsWith("http") ? link.url : `https://${link.url}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 text-sm hover:bg-gray-50 rounded transition-colors"
            >
              <span className="text-gray-900">{link.name}</span>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm">No social links available</p>
      )}
    </div>
  );
}

export default SocialLink;
