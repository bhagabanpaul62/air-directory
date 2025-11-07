import React from "react";

function Quick_Fact({ City, IATA, ICAO, Country, Region }) {
  const facts = [
    { label: "IATA", value: IATA },
    { label: "ICAO", value: ICAO },
   
    { label: "Call Sing", value: Country },
  ].filter((fact) => fact.value);

  return (
    <div className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Quick Fact
        </h3>
      </div>

      {facts.length > 0 ? (
        <div className="space-y-3 border-t pt-4">
          {facts.map((fact, index) => (
            <div key={index} className="flex justify-between items-center py-1">
              <span className="text-sm text-gray-600">{fact.label}</span>
              <span className="text-sm font-medium text-gray-900">
                {fact.value}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm">No quick facts available</p>
      )}
    </div>
  );
}

export default Quick_Fact;
