import React from "react";

function Contact({ Phone, Email, Address, Website }) {
  return (
    <div className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Primary Contact Information
      </h3>
      <div className="space-y-2 text-sm">
        {Website && (
          <div className="flex-col">
            <span className="text-gray-600 block">Website</span>
            <a target="blank" href={Website} className="text-blue-500 block">{Website}</a>
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
            <span className="text-gray-600">Toll-Free-Helpline</span>
            <p className="text-gray-900">{Phone}</p>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default Contact;
