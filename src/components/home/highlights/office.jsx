import Link from "next/link";
import Card from "@/components/card/Card";

function Office({
  Office,
  limit = 6,
  title = "Top Offices",
  useCards = false,
}) {
  const items = Array.isArray(Office) ? Office : [];

  // Normalize minimal fields we need
  const normalized = items.map((o) => ({
    id:
      o?._id || o?.office_id || o?.Name || Math.random().toString(36).slice(2),
    name: o?.Name || o?.name || "Unknown Office",
    bg:
      o?.Background_Image ||
      o?.background_image ||
      o?.["Background Image"] ||
      null,
    slug:
      o?.slug ||
      o?.Name?.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, ""),
    continent: o?.Continent?.toLowerCase().replace(/\s+/g, "-") || "other",
    country:
      o?.Country?.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "unknown",
  }));

  // Prefer entries with a background image, then alphabetical by name
  const display = normalized
    .sort(
      (a, b) => (b.bg ? 1 : 0) - (a.bg ? 1 : 0) || a.name.localeCompare(b.name)
    )
    .slice(0, Math.max(1, limit));

  return (
    <section className="w-full">
      <div className="px-6 py-6">
        {title && (
          <h2 className="mb-4 sm:mb-6 text-lg sm:text-xl font-semibold tracking-tight">
            {title}
          </h2>
        )}

        {display.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto mb-3 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <p>No offices to display</p>
          </div>
        ) : useCards ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {display.slice(0, limit).map((off) => (
              <Card
                key={off.id}
                id={off.id}
                Name={off.name}
                Background_Image={
                  Office.find((o) => (o._id || o.office_id) === off.id)
                    ?.Background_Image
                }
                Country={
                  Office.find((o) => (o._id || o.office_id) === off.id)?.Country
                }
                city={
                  Office.find((o) => (o._id || o.office_id) === off.id)?.City
                }
                type="Office"
              />
            ))}
          </div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {display.map((off) => (
              <Link
                href={`/office/${off.continent}/${off.country}/${off.slug}`}
                key={off.id}
                className="group bg-gray-50 hover:bg-purple-50 rounded-xl border border-gray-200 hover:border-purple-200 transition-all duration-200 cursor-pointer overflow-hidden"
                title={off.name}
              >
                <div className="relative h-24 sm:h-28 w-full bg-gradient-to-br from-gray-200 to-gray-300">
                  {off.bg ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={off.bg}
                      alt={`${off.name} background`}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-3 py-2">
                    <p className="text-white text-xs sm:text-sm font-medium line-clamp-2 leading-tight">
                      {off.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default Office;
