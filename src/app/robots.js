export default function robots() {
  const baseUrl = "https://officelookup.com";

  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
