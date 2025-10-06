"use client";
import Image from "next/image";

function BannerImg({ Background_Image, logo, name, Continent, Country }) {
  return (
    <>
      <div className="w-full h-[40vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[56vh] relative overflow-hidden text-white mt-10">
        <Image
          src={Background_Image}
          alt={`${name || "Airport"} banner image`}
          fill
          className={`object-cover transition-opacity duration-3000`}
        />

        <div className="z-10 absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              {/* Left: Airport Information */}
              <div className="text-white">
                {/* Location Badge */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600/80 text-white backdrop-blur-sm">
                    📍 {Continent}
                  </span>
                  {Country && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-600/80 text-white backdrop-blur-sm">
                      🏳️ {Country}
                    </span>
                  )}
                </div>

                {/* Airport Name */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4">
                  {name || "Airport Details"}
                </h1>

                {/* Subtitle */}
                <p className="text-lg sm:text-xl md:text-2xl opacity-90 max-w-2xl leading-relaxed">
                  Your gateway to {Continent || "the world"} - Connecting
                  travelers worldwide
                </p>
              </div>

              {/* Right: Airport Logo */}
              {logo && (
                <div className="mt-8 lg:mt-0 lg:ml-8">
                  <div className="bg-white/90 rounded-full p-2 shadow-2xl backdrop-blur-sm border border-white/20">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden relative bg-white">
                      <Image
                        src={logo}
                        alt={`${name} logo`}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BannerImg;
