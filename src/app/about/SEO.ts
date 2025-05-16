import { Metadata } from "next";
import { SEOBase } from "Tools/SEOBase";

export const SEO: Metadata = {
  title: "About | Behind The Matches",
  description:
    "Information about Behind The Matches and artist Erica Figliolia",
  keywords: [
    "matchbook art",
    "art",
    "workshops",
    "team events",
    "birthdays",
    "art shop",
  ],
  openGraph: {
    siteName: "About | Behind The Matches",
    locale: "en_US",
    title: "About | Behind The Matches",
    type: "website",
    url: "https://behindthematches.com/about",
    images: {
      url: "/box-14.png",
      type: "image/png",
      alt: "New York City Restaurants Shadow Box",
    },
    description:
      "Information about Behind The Matches and artist Erica Figliolia",
  },
  appleWebApp: {
    title: "About Behind The Matches",
    statusBarStyle: "default",
    capable: true,
  },
  ...SEOBase,
};
