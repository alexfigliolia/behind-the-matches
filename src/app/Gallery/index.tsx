import { BoundedContent } from "Components/BoundedContent";
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
          <div>
            <img src="/box-1.jpg" alt="behind the matches product" />
          </div>
          <div>
            <img src="/box-2.jpeg" alt="behind the matches product" />
          </div>
          <div>
            <img src="/box-3.png" alt="behind the matches product" />
          </div>
          <div>
            <img src="/box-4.jpeg" alt="behind the matches product" />
          </div>
          <div>
            <img src="/box-5.jpg" alt="behind the matches product" />
          </div>
          <div>
            <img src="/box-6.jpeg" alt="behind the matches product" />
          </div>
          <div>
            <img src="/box-7.jpeg" alt="behind the matches product" />
          </div>
          <div>
            <img src="/box-8.jpg" alt="behind the matches product" />
          </div>
          <div>
            <img src="/box-9.jpg" alt="behind the matches product" />
          </div>
          <div>
            <img src="/box-10.jpeg" alt="behind the matches product" />
          </div>
          <div>
            <img src="/box-11.jpeg" alt="behind the matches product" />
          </div>
          <div>
            <img src="/box-12.png" alt="behind the matches product" />
          </div>
          <div>
            <img src="/box-13.png" alt="behind the matches product" />
          </div>
          <div>
            <img src="/box-14.png" alt="behind the matches product" />
          </div>
          <div>
            <img src="/box-15.jpg" alt="behind the matches product" />
          </div>
        </div>
      </BoundedContent>
    </Section>
  );
};
