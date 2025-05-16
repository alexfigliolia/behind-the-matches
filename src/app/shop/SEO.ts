import { Metadata } from "next";
import { SEOBase } from "Tools/SEOBase";

export const SEO: Metadata = {
  title: "The Behind The Matches Shop",
  description: "Shop artwork and request custom pieces",
  keywords: [
    "matchbook art",
    "art",
    "workshops",
    "team events",
    "birthdays",
    "art shop",
  ],
  openGraph: {
    siteName: "Shop | Behind The Matches",
    locale: "en_US",
    title: "Shop | Behind The Matches",
    type: "website",
    url: "https://behindthematches.com/shop",
    images: {
      url: "/box-14.png",
      type: "image/png",
      alt: "New York City Restaurants Shadow Box",
    },
    description: "Shop artwork and request custom pieces",
  },
  appleWebApp: {
    title: "Shop Behind The Matches",
    statusBarStyle: "default",
    capable: true,
  },
  ...SEOBase,
};
