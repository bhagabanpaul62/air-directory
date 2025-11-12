"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function DynamicBreadcrumb() {
  const pathname = usePathname();

  // Split pathname and filter empty strings
  const segments = pathname.split("/").filter(Boolean);

  // Function to format segment text (convert slug to readable text)
  const formatText = (text) => {
    return text
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Build breadcrumb items
  const breadcrumbItems = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const isLast = index === segments.length - 1;
    const text = formatText(segment);

    return {
      href,
      text,
      isLast,
    };
  });

  // Don't show breadcrumb on homepage
  if (segments.length === 0) return null;

  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <Breadcrumb>
          <BreadcrumbList>
            {/* Home link */}
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="text-blue-600 hover:text-blue-800">
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            {/* Dynamic segments */}
            {breadcrumbItems.map((item, index) => (
              <div key={item.href} className="contents">
                <BreadcrumbItem>
                  {item.isLast ? (
                    <BreadcrumbPage className="font-medium text-gray-900">
                      {item.text}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link
                        href={item.href}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {item.text}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!item.isLast && <BreadcrumbSeparator />}
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
