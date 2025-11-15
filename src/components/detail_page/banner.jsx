"use client";
import Image from "next/image";

function BannerImg({ Background_Image, logo, name, Continent, Country }) {
  // Validate if logo is a valid URL
  const isValidUrl = (url) => {
    if (!url || typeof url !== "string") return false;
    return (
      url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("/")
    );
  };

  const validLogo = isValidUrl(logo) ? logo : null;
  const validBackground = isValidUrl(Background_Image)
    ? Background_Image
    : "/default-banner.jpg";

  return (
    <>
      <div className="w-full h-[40vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[56vh] relative overflow-hidden text-white mt-10">
        <Image
          src={validBackground}
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

                {/* Airport Name */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4">
                  {name || "Airport Details"}
                </h1>

                
              </div>

              {/* Right: Airport Logo */}
              {validLogo && (
                <div className="mt-8 lg:mt-0 lg:ml-8">
                  <div className="bg-white/90 rounded-full p-2 shadow-2xl backdrop-blur-sm border border-white/20">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden relative bg-white">
                      <Image
                        src={validLogo}
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
