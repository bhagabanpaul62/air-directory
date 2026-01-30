
import React from "react";

export const metadata = {
  title: "Privacy Policy - OfficeLookup",
  description: "Privacy Policy for OfficeLookup. Learn how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: {lastUpdated}</p>
        
        <div className="prose prose-lg text-gray-600 space-y-6">
          <p>
            At <span className="font-semibold text-brand">OfficeLookup</span>, we value your privacy. This Privacy Policy outlines how we collect, use, and protect your information when you visit our website.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">1. Information We Collect</h2>
          <p>
            <strong>Usage Data:</strong> We may collect non-personal information about how you interact with our website. This includes your IP address, browser type, device type, pages visited, and time spent on the site. This data helps us analyze trends and improve user experience.
          </p>
          <p>
            <strong>Cookies:</strong> We use cookies to enhance your browsing experience. Cookies are small files stored on your device that help us remember your preferences and recognize repeat visits. You can control cookie settings through your browser.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">2. How We Use Your Information</h2>
          <p>
            We use the collected information for the following purposes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide and maintain our directory services.</li>
            <li>To improve and optimize our website functionality.</li>
            <li>To analyze user traffic and usage patterns.</li>
            <li>To protect against malicious activity and ensure site security.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">3. Third-Party Links</h2>
          <p>
            Our website contains links to external websites, such as official airline and airport pages. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review their privacy policies before providing any personal information.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">4. Data Security</h2>
          <p>
            We implement reasonable security measures to protect your data from unauthorized access, alteration, or disclosure. However, please be aware that no method of transmission over the internet is 100% secure.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">5. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us via our Contact page.
          </p>
        </div>
      </div>
    </div>
  );
}
