import { Metadata } from "next";
import { SEOBase } from "Tools/SEOBase";

export const SEO: Metadata = {
  title: "Behind The Matches Workshops",
  description:
    "Allow the team at behind the matches to host a workshop for your team, colleagues or friends! Create your own artwork in the space of your choosing, hosted by an artist on the Behind the Matches team",
  keywords: [
    "matchbook art",
    "art",
    "workshops",
    "team events",
    "birthdays",
    "art shop",
  ],
  openGraph: {
    siteName: "Workshops | Behind The Matches",
    locale: "en_US",
    title: "Workshops | Behind The Matches",
    type: "website",
    url: "https://behindthematches.com/workshops",
    images: {
      url: "/workshop-1.png",
      type: "image/png",
      alt: "A workshop for hosted by Behind The Matches",
    },
    description:
      "Allow the team at behind the matches to host a workshop for your team, colleagues or friends! Create your own artwork in the space of your choosing, hosted by an artist on the Behind the Matches team",
  },
  appleWebApp: {
    title: "Workshops | Behind The Matches",
    statusBarStyle: "default",
    capable: true,
  },
  ...SEOBase,
};
