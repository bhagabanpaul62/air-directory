import connectDb from "@/app/lib/conncetDb";
import AirLineModel from "@/model/airLines.model";
import AirPortModel from "@/model/airPort.model";
import OfficeModel from "@/model/official.model";

// Force dynamic rendering - sitemap will be generated at request time, not build time
export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

export default async function sitemap() {
  const baseUrl = "https://officelookup.com";

  try {
    await connectDb();

    // Fetch all airlines, airports, and offices
    const airlines = await AirLineModel.find(
      {},
      { slug: 1, Continent: 1, Country: 1, updatedAt: 1 }
    ).lean();
    const airports = await AirPortModel.find(
      {},
      { slug: 1, Continent: 1, Country: 1, updatedAt: 1 }
    ).lean();
    const offices = await OfficeModel.find(
      {},
      { slug: 1, Continent: 1, Country: 1, updatedAt: 1 }
    ).lean();

    // Static pages
    const staticPages = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1.0,
      },
      {
        url: `${baseUrl}/airlines`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/airports`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/office`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
    ];

    // Generate airline URLs
    const airlineUrls = airlines.map((airline) => {
      const continent =
        airline.Continent?.toLowerCase().replace(/\s+/g, "-") || "other";
      const country =
        airline.Country?.toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "") || "unknown";
      return {
        url: `${baseUrl}/airlines/${continent}/${country}/${airline.slug}`,
        lastModified: airline.updatedAt || new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      };
    });

    // Generate airport URLs
    const airportUrls = airports.map((airport) => {
      const continent =
        airport.Continent?.toLowerCase().replace(/\s+/g, "-") || "other";
      const country =
        airport.Country?.toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "") || "unknown";
      return {
        url: `${baseUrl}/airports/${continent}/${country}/${airport.slug}`,
        lastModified: airport.updatedAt || new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      };
    });

    // Generate office URLs
    const officeUrls = offices.map((office) => {
      const continent =
        office.Continent?.toLowerCase().replace(/\s+/g, "-") || "other";
      const country =
        office.Country?.toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "") || "unknown";
      return {
        url: `${baseUrl}/office/${continent}/${country}/${office.slug}`,
        lastModified: office.updatedAt || new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      };
    });

    return [...staticPages, ...airlineUrls, ...airportUrls, ...officeUrls];
  } catch (error) {
    console.error("Error generating sitemap:", error);

    // Return only static pages if database is unavailable
    const baseUrl = "https://officelookup.com";
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1.0,
      },
      {
        url: `${baseUrl}/airlines`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/airports`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/office`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
    ];
  }
}
