"use client";
import { Canvas } from "@react-three/fiber";
import { BoundedContent } from "Components/BoundedContent";
import { Button } from "Components/Button";
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
          <h1>Behind the matches</h1>
          <Button text="Customize" onClick={() => {}} />
        </BoundedContent>
      </div>
    </Section>
  );
};
