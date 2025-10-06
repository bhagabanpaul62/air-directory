import React from "react";

function Contact({ Phone, Email, Address, Website }) {
  return (
    <div className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Contact Information
      </h3>
      <div className="space-y-2 text-sm">
        {Website && (
          <div>
            <span className="text-gray-600">Website</span>
            <p className="text-gray-900">{Website}</p>
          </div>
        )}
        {Email && (
          <div>
            <span className="text-gray-600">Email</span>
            <p className="text-gray-900">{Email}</p>
          </div>
        )}
        {Phone && (
          <div>
            <span className="text-gray-600">Phone</span>
            <p className="text-gray-900">{Phone}</p>
          </div>
        )}
        {Address && (
          <div>
            <span className="text-gray-600">Address</span>
            <p className="text-gray-900">{Address}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Contact;
