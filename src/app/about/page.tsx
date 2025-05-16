import { Metadata } from "next";
import { BoundedContent } from "Components/BoundedContent";
import { PageHeading } from "Components/PageHeading";
import { ParagraphText } from "Components/ParagraphText";
import { Section } from "Components/Section";
import { Propless } from "Types/React";
import { SEO } from "./SEO";
import "./styles.scss";

export const metadata: Metadata = SEO;

export default function About(_: Propless) {
  return (
    <main className="about-page">
      <BoundedContent>
        <Section>
          <PageHeading>The Story</PageHeading>
          <div className="story">
            <h2>Collecting matchbooks goes beyond a simple hobby.</h2>
            <ParagraphText>
              For <strong>Erica Figliolia</strong>, matchbooks are a tangible
              reminder of a meaningful moment and connection to the past. Each
              one holds its own story and has the power to transport us back to
              that very moment. Her connection with the nostalgic moments and
              stories behind the tiny treasures led to Behind the Matches being
              born.
            </ParagraphText>
            <ParagraphText>
              The pandemic ignited this fascination with her collection, a time
              when she longed for human connection, her favorite local
              restaurant, and the desire to travel and discover somewhere new.
              Erica’s first art piece went up in her New York City apartment and
              soon began selling art filled with mementos.
            </ParagraphText>
            <ParagraphText>
              She receives collections from clients or uses her own that
              resonate with purchasers and finds great pleasure in telling a
              story through the pieces she puts together. Let this be a reminder
              of not only your journey but the story that goes beyond the
              matches and the importance of supporting your community, local
              establishments, and entrepreneurs.
            </ParagraphText>
            <h2>About Erica</h2>
            <ParagraphText>
              <strong>Erica Figliolia</strong>, an innate explorer, possesses a
              profound love for shared experiences encompassing community and
              meaningful connections. Through a mere hobby of collecting
              matchbooks acquired from host stands, Erica has fashioned a brand
              that delves into the essence of Behind the Matches.
            </ParagraphText>
            <ParagraphText>
              Whether through art adorned with personal mementos, exploring the
              narratives of establishments and small businesses, or fostering
              workshops and community gatherings centered around a mutual
              appreciation for collecting and nostalgia, Behind the Matches
              embodies the spirit of bonding through shared experiences.
            </ParagraphText>
          </div>
        </Section>
      </BoundedContent>
    </main>
  );
}
