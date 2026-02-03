/**
 * Submits URLs to IndexNow to notify search engines of changes.
 * @param {string[]} urlList - Array of absolute URLs that have changed.
 */
export async function submitToIndexNow(urlList) {
  const host =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://officelookup.com";
  const key = "00652c9ec8ab42e89d3bce8e3640af1f";
  const keyLocation = `${host}/${key}.txt`;

  // Filter out any invalid URLs or non-absolute URLs if necessary
  // For now, assuming callers provide valid absolute URLs or relative paths that we prefix
  const validUrls = urlList.map((url) => {
    if (url.startsWith("http")) return url;
    return `${host}${url.startsWith("/") ? "" : "/"}${url}`;
  });

  if (validUrls.length === 0) return;

  const data = {
    host: host.replace(/^https?:\/\//, ""),
    key,
    keyLocation,
    urlList: validUrls,
  };

  try {
    const response = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("IndexNow submission successful:", validUrls);
    } else {
      console.error(
        "IndexNow submission failed:",
        response.status,
        response.statusText,
      );
    }
  } catch (error) {
    console.error("Error submitting to IndexNow:", error);
  }
}

export function getAirlineUrl(item) {
  if (!item || !item.Continent || !item.Country || !item.slug) return null;
  return `/airlines/${encodeURIComponent(item.Continent)}/${encodeURIComponent(
    item.Country,
  )}/${item.slug}`;
}

export function getAirportUrl(item) {
  if (!item || !item.Continent || !item.Country || !item.slug) return null;
  return `/airports/${encodeURIComponent(item.Continent)}/${encodeURIComponent(
    item.Country,
  )}/${item.slug}`;
}

export function getOfficeUrl(item) {
  if (!item || !item.Continent || !item.Country || !item.slug) return null;
  return `/office/${encodeURIComponent(item.Continent)}/${encodeURIComponent(
    item.Country,
  )}/${item.slug}`;
}
