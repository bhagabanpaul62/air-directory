import React from "react";

function Info({ Info, Description }) {
  return (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Info</h2>

      <div className="space-y-4">
        {Info && (
          <div>
            <p className="text-gray-700 text-sm leading-relaxed">{Info}</p>
          </div>
        )}

        {Description && (
          <div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {Description}
            </p>
          </div>
        )}

        {!Info && !Description && (
          <p className="text-gray-400 text-sm">No information available</p>
        )}
      </div>
    </div>
  );
}

export default Info;
