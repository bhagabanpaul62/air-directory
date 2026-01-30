
import React from "react";

export const metadata = {
  title: "About Us - OfficeLookup",
  description: "Learn about OfficeLookup, your premier global aviation directory for airlines, airports, and offices worldwide.",
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
          About OfficeLookup
        </h1>
        
        <div className="prose prose-lg text-gray-600 space-y-6">
          <p>
            Welcome to <span className="font-semibold text-brand">OfficeLookup</span>, the world's most comprehensive and easy-to-use aviation directory. Our mission is to connect travelers, aviation professionals, and businesses with accurate and up-to-date information about the global aviation ecosystem.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Our Mission</h2>
          <p>
            In an increasingly connected world, finding reliable contact information for airlines, airports, and aviation offices can be challenging. OfficeLookup bridges this gap by providing a centralized, searchable database that spans every continent and country.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">What We Offer</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-gray-900">Global Airline Directory:</strong> Comprehensive details on thousands of airlines, including contact numbers, head office addresses, and operational hubs.
            </li>
            <li>
              <strong className="text-gray-900">Airport Information:</strong> Essential data for travelers and logistics providers, covering major international hubs to regional airfields.
            </li>
            <li>
              <strong className="text-gray-900">Local Offices:</strong> A unique feature of OfficeLookup, providing specific contact details for airline sales and representative offices in cities around the globe.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Our Commitment</h2>
          <p>
            We are dedicated to maintaining the highest standards of data accuracy. Our team continuously updates our database to reflect the dynamic nature of the aviation industry, ensuring you have the information you need when you need it.
          </p>
          
          <p className="mt-8">
            Thank you for choosing OfficeLookup as your trusted aviation information partner.
          </p>
        </div>
      </div>
    </div>
  );
}
