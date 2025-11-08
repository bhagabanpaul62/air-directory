import Link from "next/link";
import Image from "next/image";
import SitemapContent from "@/components/sitemap/SitemapContent";

async function Sitemap() {
  // Fetch all data
  const [airlinesRes, airportsRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getData/airLine`, {
      cache: "no-store",
    }),
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getData/airPort`, {
      cache: "no-store",
    }),
  ]);

  const airlines = await airlinesRes.json();
  const airports = await airportsRes.json();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner with Airplane Image */}
      <div className="relative h-64 md:h-80 bg-gradient-to-r from-orange-400 to-yellow-500">
        <Image
          src="https://images.unsplash.com/photo-1549897411-b06572cdf806?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Airplane banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/70 via-orange-500/60 to-yellow-500/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center relative z-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
              Directory Sitemap
            </h1>
            <p className="text-white/90 mt-2 text-lg">
              Browse airlines, airports, and offices by region
            </p>
          </div>
        </div>
      </div>

      <SitemapContent airlines={airlines} airports={airports} />
    </div>
  );
}

export default Sitemap;
