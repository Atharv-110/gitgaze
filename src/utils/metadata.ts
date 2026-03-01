import { Metadata } from "next";

interface ConstructMetadataProps {
  title?: string | { default: string; template: string };
  description?: string;
  image?: string;
  icons?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

export function constructMetadata({
  title = "GitGaze by Atharv Vani",
  description = "Showcase your GitHub statistics and activities in a personalized and share-ready dashboard.",
  image = "/opengraph-image.jpg",
  icons = "/icons/icon.png",
  canonicalUrl = "/",
  noIndex = false,
}: ConstructMetadataProps = {}): Metadata {
  const openGraphTitle = typeof title === "string" ? title : title.default;

  return {
    title,
    description,
    keywords:
      "gitgaze, github, github stats, open source, contributions, github wrapped",
    authors: [
      { name: "Atharv Vani", url: "https://www.gitgaze.dev/u/atharv-110" },
    ],
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_APP_URL || "https://www.gitgaze.dev",
    ),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: openGraphTitle,
      description,
      type: "website",
      url: canonicalUrl.startsWith("http")
        ? canonicalUrl
        : `${process.env.NEXT_PUBLIC_APP_URL || "https://www.gitgaze.dev"}${canonicalUrl}`,
      siteName: "GitGaze",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${openGraphTitle} Open Graph Image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: openGraphTitle,
      creator: "@atharv_110",
      description,
      images: [image],
    },
    icons: {
      icon: icons,
      apple: "/icons/apple-icon.png",
      shortcut: icons,
    },
    other: {
      "og:logo": icons,
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
