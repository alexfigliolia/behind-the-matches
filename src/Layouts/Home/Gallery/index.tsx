import { BoundedContent } from "Components/BoundedContent";
import { CustomizeButton } from "Components/CustomizeButton";
import { GalleryImages } from "Components/GalleryImages";
import { Section } from "Components/Section";
import { Propless } from "Types/React";
import "./styles.scss";

export const Gallery = (_: Propless) => {
  return (
    <Section className="gallery">
      <BoundedContent>
        <p>
          The simple hobby of collecting tiny treasures is a tangible link to
          our journey.
        </p>
        <div className="images">
          <GalleryImages />
        </div>
        <CustomizeButton />
      </BoundedContent>
    </Section>
  );
};
