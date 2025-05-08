"use client";
import { BoundedContent } from "Components/BoundedContent";
import { Button } from "Components/Button";
import { Section } from "Components/Section";
import { Slider } from "Components/Slider";
import { Propless } from "Types/React";
import "./styles.scss";

export const Info = (_: Propless) => {
  return (
    <Section className="home-info">
      <BoundedContent>
        <figure>
          <Slider autoplay controls>
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
          </Slider>
          <figcaption>
            <p>
              Hand-crafted shadow boxes highlighting the places you&apos;ve been
            </p>
            <Button text="Customize" />
          </figcaption>
        </figure>
      </BoundedContent>
    </Section>
  );
};
