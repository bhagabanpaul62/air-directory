import React from "react";

export const metadata = {
  title: "Terms and Conditions - OfficeLookup",
  description: "Terms and Conditions for using Officelookup.com",
};

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
          Terms and Conditions
        </h1>

        <div className="prose prose-lg text-gray-600 space-y-8">
          <p>
            By accessing and using Officelookup.com, you agree to comply with
            and be bound by the following Terms and Conditions. Please read them
            carefully before using our website.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Use of Website
            </h2>
            <p>
              Officelookup.com provides travel-related information for general
              reference purposes only. You agree to use this website lawfully
              and in a manner that does not infringe upon the rights of others
              or restrict their use of the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Accuracy of Information
            </h2>
            <p>
              We strive to ensure all information is accurate and up to date.
              However, we do not guarantee the completeness, reliability, or
              accuracy of any content. Users are encouraged to verify details
              directly with airlines or airports before making travel decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Intellectual Property
            </h2>
            <p>
              All content, design, layout, and branding on this website are the
              property of Officelookup.com unless otherwise stated. Unauthorized
              reproduction, distribution, or use of any materials is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Third-Party Links
            </h2>
            <p>
              Our website may include links to third-party websites for
              convenience. We do not control or endorse the content or policies
              of these external sites and are not responsible for any damages or
              losses resulting from their use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Limitation of Liability
            </h2>
            <p>
              Officelookup.com shall not be liable for any direct, indirect, or
              consequential damages arising from the use of our website or
              reliance on the information provided.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these Terms and Conditions at any
              time. Continued use of the website after changes are posted
              constitutes acceptance of the updated terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
