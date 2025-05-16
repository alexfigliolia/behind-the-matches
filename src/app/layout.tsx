import type { Metadata } from "next";
import { Funnel_Display, MonteCarlo } from "next/font/google";
import { classnames } from "@figliolia/classnames";
import { Customizer, Footer, Header, ShoppingCart } from "Layouts/Global";
import { OptionalChildren } from "Types/React";
import { SEO } from "./SEO";
import "Styles/Reset.scss";

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
});

const monteCarlo = MonteCarlo({
  variable: "--font-monte-carlo",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = SEO;

export default function RootLayout({ children }: OptionalChildren) {
  return (
    <html lang="en">
      <body className={classnames(funnelDisplay.variable, monteCarlo.variable)}>
        <Header>
          <ShoppingCart />
        </Header>
        {children}
        <Footer />
        <Customizer />
      </body>
    </html>
  );
}
