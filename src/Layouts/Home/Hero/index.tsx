"use client";
import { Canvas } from "@react-three/fiber";
import { BoundedContent } from "Components/BoundedContent";
import { CustomizeButton } from "Components/CustomizeButton";
import { PageHeading } from "Components/PageHeading";
import { Section } from "Components/Section";
import { Propless } from "Types/React";
import { Scene } from "./Scene";
import "./styles.scss";

export const Hero = (_: Propless) => {
  return (
    <Section className="hero">
      <div className="canvas">
        <Canvas shadows camera={{ fov: 25, position: [-0.4, 0, 9], zoom: 0.5 }}>
          <Scene />
        </Canvas>
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
