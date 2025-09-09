import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Information */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">AD</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                AirDir
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
              Your comprehensive global aviation directory for airlines,
              airports, and aviation offices worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-900">Directory</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/airlines"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Airlines
                </Link>
              </li>
              <li>
                <Link
                  href="/airports"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Airports
                </Link>
              </li>
              <li>
                <Link
                  href="/offices"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Offices
                </Link>
              </li>
              <li>
                <Link
                  href="/directory"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Browse All
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-900">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 py-3">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-gray-500 text-sm">
              © {currentYear} AviationDir. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <span>10,000+ Airlines</span>
              <span>•</span>
              <span>5,000+ Airports</span>
              <span>•</span>
              <span>Global Coverage</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
