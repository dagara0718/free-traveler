import type { Metadata } from "next";

const SITE_NAME = "Free Traveler";
const BASE_URL = "https://free-traveler.example.com";

export function buildMetadata({
  title,
  description,
  path,
  ogImage,
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}): Metadata {
  const canonical = `${BASE_URL}${path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  };
}
