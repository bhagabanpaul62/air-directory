
import React from "react";

export const metadata = {
  title: "Cookies Policy - OfficeLookup",
  description: "Cookies Policy for Officelookup.com",
};

export default function CookiesPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
          Cookies Policy
        </h1>
        
        <div className="prose prose-lg text-gray-600 space-y-8">
          <p>
            This Cookies Policy explains how Officelookup.com uses cookies to improve your browsing experience.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit a website. They help websites remember user preferences and improve functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Cookies</h2>
            <p>We use cookies to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Analyze website traffic and performance</li>
              <li>Understand user behavior and preferences</li>
              <li>Improve site usability and content relevance</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Types of Cookies We Use</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-gray-900">Essential Cookies:</strong> Required for basic website functionality
              </li>
              <li>
                <strong className="text-gray-900">Analytics Cookies:</strong> Help us understand how visitors interact with the website
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Managing Cookies</h2>
            <p>
              You can control or disable cookies through your browser settings. Please note that disabling cookies may affect the functionality of certain parts of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Changes to This Policy</h2>
            <p>
              We may update this Cookies Policy from time to time. Any changes will be posted on this page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
