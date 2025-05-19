import { Metadata } from "next";
import { BoundedContent } from "Components/BoundedContent";
import { ButtonLink } from "Components/ButtonLink";
import { PageHeading } from "Components/PageHeading";
import { ParagraphText } from "Components/ParagraphText";
import { Section } from "Components/Section";
import { Slider } from "Components/Slider";
import { Propless } from "Types/React";
import { BookAWorkShop } from "./BookAWorkShop";
import { SEO } from "./SEO";
import "./styles.scss";

export const metadata: Metadata = SEO;

export default function WorkShops(_: Propless) {
  return (
    <main className="workshops-page">
      <BoundedContent>
        <Section>
          <PageHeading>Workshops</PageHeading>
          <div className="split-content">
            <div className="meta">
              <p>Igniting Creativity, Connection & Storytelling</p>
              <ButtonLink
                href="/workshops?book=1"
                scroll={false}
                text="Book an Event"
              />
            </div>
            <Slider aria-label="Photos from previous workshops">
              <img src="/workshop-1.png" alt="collegues making art together" />
              <img src="/workshop-2.png" alt="collegues making art together" />
              <img src="/workshop-3.png" alt="collegues making art together" />
            </Slider>
          </div>
        </Section>
        <Section className="details">
          <BoundedContent>
            <ParagraphText>
              Behind the Matches offers immersive workshops designed to spark
              creativity, meaningful conversation, and hands-on artistry.
              Explore the art of crafting your own shadowbox filled with
              cherished mementos. Delve into the creative process as we guide
              you through building a personalized shadowbox. These workshops
              provide a space for self-expression and storytelling, where
              participants can bring their favorite keepsakes to life in a
              visually captivating display.
            </ParagraphText>
            <h2>What to Expect</h2>
            <ul>
              <li>
                <ParagraphText>
                  Guided Creative Experience: Thoughtfully curated activities to
                  inspire self-expression and reflection.
                </ParagraphText>
              </li>
              <li>
                <ParagraphText>
                  Hands-On Art Making: Participants create unique pieces using
                  matchbooks, mixed media, and shadowboxes.
                </ParagraphText>
              </li>
              <li>
                <ParagraphText>
                  Engaging Conversations: Thought-provoking prompts to encourage
                  storytelling and connection.
                </ParagraphText>
              </li>
              <li>
                <ParagraphText>
                  All Materials Provided: High-quality supplies included for a
                  seamless experience.
                </ParagraphText>
              </li>
            </ul>
            <h2>Who it&apos;s for</h2>
            <ParagraphText>
              Perfect for private events, corporate team-building, brand
              activations, community gatherings, and anyone looking to ignite
              their creativity in a relaxed, inspiring environment.
            </ParagraphText>
            <h2>About Erica Figliolia</h2>
            <ParagraphText>
              Founder of Behind the Matches, Erica brings her passion for art,
              travel, community, and storytelling into each workshop. With a
              background in event curation and an eye for creative connection,
              she ensures every experience is meaningful and engaging.
            </ParagraphText>
            <ButtonLink
              scroll={false}
              href="/workshops?book=1"
              text="Book an Event"
            />
          </BoundedContent>
        </Section>
        <Section className="testimonials">
          <h2>Testimonials</h2>
          <p>
            “I loved that the workshop felt warm and welcoming and encouraged
            creativity and mindfulness.”
          </p>
          <p>
            “I LOVED the whole experience and that I got to take home such a
            great piece of meaningful art.”
          </p>
        </Section>
      </BoundedContent>
      <BookAWorkShop />
    </main>
  );
}
