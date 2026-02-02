import React from "react";

export const metadata = {
  title: "About Us - OfficeLookup",
  description:
    "About Officelookup.com, your trusted worldwide travel directory.",
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
          About Us
        </h1>

        <div className="prose prose-lg text-gray-600 space-y-6">
          <p>
            Welcome to{" "}
            <span className="font-semibold text-brand">Officelookup.com</span>,
            your trusted worldwide travel directory designed to make finding
            airport and airline office information simple, fast, and reliable.
          </p>
          <p>
            We provide travelers, businesses, and travel professionals with easy
            access to accurate details about airports, airline offices, and
            essential travel services across the globe. Whether you’re planning
            a journey, managing bookings, or searching for official airline
            contact points, Officelookup.com serves as a convenient reference
            platform for up-to-date travel-related information.
          </p>
          <p>
            Our mission is to create a centralized, user-friendly guide that
            helps travelers save time and make informed decisions. We
            continuously update our listings to improve accuracy, coverage, and
            usability.
          </p>
          <p>
            Officelookup.com is an independent information platform and is not
            affiliated with any airline, airport authority, or travel service
            provider. All trademarks and brand names belong to their respective
            owners and are used for informational purposes only.
          </p>
        </div>
      </div>
    </div>
  );
}
