import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Nav from "../../components/home/nav";
import Footer from "@/components/home/footer";
import DynamicBreadcrumb from "@/components/ui/DynamicBreadcrumb";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default:
      "OfficeLookup - Global Aviation Directory | Airlines, Airports & Offices",
    template: "%s | OfficeLookup",
  },
  description:
    "Discover comprehensive information about airlines, airports, and aviation offices worldwide. Search 10,000+ airlines, 5,000+ airports across all continents with detailed contact information, IATA codes, and locations.",
  keywords: [
    "airlines",
    "airports",
    "aviation offices",
    "airline directory",
    "airport codes",
    "IATA codes",
    "ICAO codes",
    "aviation directory",
    "global airlines",
    "international airports",
    "flight information",
    "airline contact",
    "airport information",
  ],
  authors: [{ name: "OfficeLookup" }],
  creator: "OfficeLookup",
  publisher: "OfficeLookup",
  metadataBase: new URL("https://officelookup.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://officelookup.com",
    siteName: "OfficeLookup",
    title: "OfficeLookup - Global Aviation Directory",
    description:
      "Comprehensive global aviation directory with 10,000+ airlines, 5,000+ airports, and aviation offices worldwide.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "OfficeLookup - Global Aviation Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OfficeLookup - Global Aviation Directory",
    description:
      "Discover airlines, airports, and aviation offices worldwide. 10,000+ airlines and 5,000+ airports.",
    images: ["/og-image.jpg"],
    creator: "@officelookup",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav>
          <Nav />
        </nav>

        {children}
        <Footer />
      </body>
    </html>
  );
}
