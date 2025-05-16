import { Metadata } from "next";
import { SEOBase } from "Tools/SEOBase";

export const SEO: Metadata = {
  title: "Contact the Team at Behind The Matches",
  description:
    "For general inquiries, requests, and more information regarding artwork, workshops, or previous orders please contact us",
  keywords: [
    "matchbook art",
    "art",
    "workshops",
    "team events",
    "birthdays",
    "art shop",
  ],
  openGraph: {
    siteName: "Contact | Behind The Matches",
    locale: "en_US",
    title: "Contact | Behind The Matches",
    type: "website",
    url: "https://behindthematches.com/contact",
    images: {
      url: "/box-14.png",
      type: "image/png",
      alt: "New York City Restaurants Shadow Box",
    },
    description:
      "For general inquiries, requests, and more information regarding artwork, workshops, or previous orders please contact us",
  },
  appleWebApp: {
    title: "Contact Behind The Matches",
    statusBarStyle: "default",
    capable: true,
  },
  ...SEOBase,
};
