import React from "react";

export const metadata = {
  title: "Privacy Policy - OfficeLookup",
  description: "Privacy Policy for Officelookup.com",
};

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-lg text-gray-600 space-y-8">
          <p>
            At Officelookup.com, we respect your privacy and are committed to
            protecting your personal information.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Information We Collect
            </h2>
            <p>
              We may collect limited personal information such as your name,
              email address, or contact details when you voluntarily submit
              forms or inquiries. We may also collect non-personal data such as
              browser type, IP address, and pages visited for analytical
              purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. How We Use Information
            </h2>
            <p>We use collected information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to user inquiries</li>
              <li>Improve website performance and user experience</li>
              <li>Monitor website traffic and usage trends</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Data Protection
            </h2>
            <p>
              We implement reasonable security measures to protect your personal
              information from unauthorized access, alteration, or disclosure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Sharing of Information
            </h2>
            <p>
              We do not sell, rent, or trade your personal information with
              third parties. Information may only be shared if required by law
              or to protect our legal rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. External Websites
            </h2>
            <p>
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices or content of these sites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Updates to Privacy Policy
            </h2>
            <p>
              This policy may be updated periodically. Any changes will be
              posted on this page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
