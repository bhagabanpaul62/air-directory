"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [stats, setStats] = useState({
    airlines: "10,000+",
    airports: "5,000+",
    offices: "2,000+",
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats");
        if (response.ok) {
          const data = await response.json();
          setStats({
            airlines: data.airlines
              ? data.airlines.toLocaleString()
              : "10,000+",
            airports: data.airports ? data.airports.toLocaleString() : "5,000+",
            offices: data.offices ? data.offices.toLocaleString() : "2,000+",
          });
        }
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-6 sm:py-8 lg:py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Company Information */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo-removebg-preview.png"
                alt="OfficeLookup Logo"
                width={32}
                height={32}
                className="h-8 w-auto object-contain"
              />
              <span className="text-lg sm:text-xl font-bold text-gray-900">
                OfficeLookup
              </span>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed max-w-sm">
              Your comprehensive global aviation directory for airlines,
              airports, and aviation offices worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">
              Directory
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/airlines"
                  className="text-gray-600 hover:text-brand transition-colors text-xs sm:text-sm"
                >
                  Airlines
                </Link>
              </li>
              <li>
                <Link
                  href="/airports"
                  className="text-gray-600 hover:text-brand transition-colors text-xs sm:text-sm"
                >
                  Airports
                </Link>
              </li>
              <li>
                <Link
                  href="/office"
                  className="text-gray-600 hover:text-brand transition-colors text-xs sm:text-sm"
                >
                  Offices
                </Link>
              </li>
              <li></li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="space-y-3">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-brand transition-colors text-xs sm:text-sm"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-brand transition-colors text-xs sm:text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-brand transition-colors text-xs sm:text-sm"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-gray-500 text-xs sm:text-sm">
              © {currentYear} OfficeLookup. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-500 flex-wrap justify-center">
              <span>{stats.airlines} Airlines</span>
              <span>•</span>
              <span>{stats.airports} Airports</span>
              <span>•</span>
              <span>{stats.offices} Offices</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Global Coverage</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
