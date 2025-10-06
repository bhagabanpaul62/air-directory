"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function DirectoryHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (searchTerm.trim()) {
      params.set("search", searchTerm.trim());
    } else {
      params.delete("search");
    }

    router.push(`/directory?${params.toString()}`);
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 mt-10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center ">
          
        
        </div>


        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto">
          <div className="text-center bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="text-2xl font-bold">200+</div>
            <div className="text-sm text-blue-100">Airlines</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="text-2xl font-bold">500+</div>
            <div className="text-sm text-blue-100">Airports</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="text-2xl font-bold">150+</div>
            <div className="text-sm text-blue-100">Countries</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="text-2xl font-bold">7</div>
            <div className="text-sm text-blue-100">Continents</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DirectoryHeader;
