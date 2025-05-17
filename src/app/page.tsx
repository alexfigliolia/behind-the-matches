import { Gallery, Hero, Info } from "Layouts/Home";
import { Propless } from "Types/React";

export default function Home(_: Propless) {
  return (
    <main>
      <Hero />
      <Info />
      <Gallery />
    </main>
  );
}
