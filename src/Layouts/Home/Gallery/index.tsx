import { BoundedContent } from "Components/BoundedContent";
import { CustomizeButton } from "Components/CustomizeButton";
import { Section } from "Components/Section";
import { GalleryImages } from "Tools/GalleryImages";
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
          {GalleryImages.map((img, i) => (
            <div key={i}>{img}</div>
          ))}
        </div>
        <CustomizeButton />
      </BoundedContent>
    </Section>
  );
};
