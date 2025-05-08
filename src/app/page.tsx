import { Gallery } from "./Gallery";
import { Hero } from "./Hero";
import { Info } from "./Info";

export default function Home() {
  return (
    <main>
      <Hero />
      <Info />
      <Gallery />
    </main>
  );
}
