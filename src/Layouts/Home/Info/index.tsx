import { useId } from "react";
import { BoundedContent } from "Components/BoundedContent";
import { ButtonLink } from "Components/ButtonLink";
import { Section } from "Components/Section";
import { Slider } from "Components/Slider";
import { Propless } from "Types/React";
import "./styles.scss";

export const Info = (_: Propless) => {
  const labelID = useId();
  return (
    <Section className="home-info">
      <BoundedContent>
        <figure aria-labelledby={labelID}>
          <Slider autoplay controls aria-label="Images of Artwork">
            <img src="/box-1.jpg" alt="behind the matches product" />
            <img src="/box-2.jpeg" alt="behind the matches product" />
            <img src="/box-3.png" alt="behind the matches product" />
            <img src="/box-4.jpeg" alt="behind the matches product" />
            <img src="/box-5.jpg" alt="behind the matches product" />
            <img src="/box-6.jpeg" alt="behind the matches product" />
            <img src="/box-7.jpeg" alt="behind the matches product" />
          </Slider>
          <div className="caption">
            <figcaption id={labelID}>
              Hand-crafted shadow boxes highlighting the places you&apos;ve been
            </figcaption>
            <ButtonLink text="Shop Artwork" href="/shop" />
          </div>
        </figure>
      </BoundedContent>
    </Section>
  );
};
