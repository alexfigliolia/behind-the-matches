import { Metadata } from "next";
import { SEOIcons } from "./SEOIcons";

export const SEOBase: Metadata = {
  metadataBase: new URL("https://behindthematches.com"),
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow",
  },
  ...SEOIcons,
};
