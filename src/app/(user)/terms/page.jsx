
import React from "react";

export const metadata = {
  title: "Terms of Service - OfficeLookup",
  description: "Terms of Service for using OfficeLookup's aviation directory.",
};

export default function TermsPage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Terms of Service
        </h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: {lastUpdated}</p>
        
        <div className="prose prose-lg text-gray-600 space-y-6">
          <p>
            Welcome to <span className="font-semibold text-brand">OfficeLookup</span>. By accessing or using our website, you agree to comply with and be bound by the following Terms of Service. Please read them carefully.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing this website, you accept these Terms of Service in full. If you disagree with any part of these terms, you must not use our website.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">2. Use of the Directory</h2>
          <p>
            OfficeLookup provides a public directory of aviation information for informational purposes only. You agree to use this information responsibly and for lawful purposes. You may not:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use data mining, robots, or similar data gathering tools to extract substantial content.</li>
            <li>Use the directory for unsolicited marketing or spamming.</li>
            <li>Attempt to interfere with the proper working of the website.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">3. Accuracy of Information (Disclaimer)</h2>
          <p>
            While we strive to keep the information on OfficeLookup accurate and up-to-date, the aviation industry is dynamic, and contact details change frequently. <strong>We do not guarantee the accuracy, completeness, or reliability of any information provided.</strong> 
          </p>
          <p>
            We recommend verifying critical information directly with the respective airline or airport before making travel or business plans. OfficeLookup is not affiliated with any of the airlines or airports listed unless explicitly stated.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">4. Intellectual Property</h2>
          <p>
            The content, design, and layout of this website are owned by OfficeLookup and are protected by intellectual property laws. Airline logos and trademarks displayed are the property of their respective owners and are used for identification purposes only.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">5. Limitation of Liability</h2>
          <p>
            OfficeLookup shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to, or use of, this website. This includes damages for errors, omissions, interruptions, or delays in service.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">6. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Your continued use of the website following any changes indicates your acceptance of the new Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
}
