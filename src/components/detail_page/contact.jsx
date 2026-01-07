import React from "react";

function Contact({ Phone, Email, Address, Website }) {
  return (
    <div className="p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">
        Primary Contact Information
      </h3>
      <div className="space-y-3 sm:space-y-4 text-sm">
        {Website && (
          <div className="flex-col">
            <span className="text-gray-600 block text-xs sm:text-sm">
              Website
            </span>
            <a
              target="blank"
              href={Website}
              className="text-blue-500 hover:text-blue-600 block text-sm break-all"
            >
              {Website}
            </a>
          </div>
        )}
        {Email && (
          <div>
            <span className="text-gray-600 text-xs sm:text-sm">Email</span>
            <p className="text-gray-900 text-sm break-all">{Email}</p>
          </div>
        )}
        {Phone && (
          <div>
            <span className="text-gray-600 text-xs sm:text-sm">
              Toll-Free-Helpline
            </span>
            <p className="text-gray-900 text-sm">{Phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Contact;
