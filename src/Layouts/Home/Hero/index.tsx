import { BoundedContent } from "Components/BoundedContent";
import { CustomizeButton } from "Components/CustomizeButton";
import { PageHeading } from "Components/PageHeading";
import { Section } from "Components/Section";
import { Propless } from "Types/React";
import { ShadowBox } from "./ShadowBox";
import "./styles.scss";

export const Hero = (_: Propless) => {
  return (
    <Section className="hero">
      <div className="canvas">
        <ShadowBox />
      </div>
      <div className="content">
        <BoundedContent>
          <PageHeading>Behind the matches</PageHeading>
          <CustomizeButton text="Customize" />
        </BoundedContent>
      </div>
    </Section>
  );
};
