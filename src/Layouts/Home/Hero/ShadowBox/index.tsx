"use client";
import { memo } from "react";
import { Canvas } from "@react-three/fiber";
import { Propless } from "Types/React";
import { Scene } from "./Scene";

export const ShadowBox = memo(
  function ShadowBox(_: Propless) {
    return (
      <Canvas
        role="img"
        shadows
        camera={{
          fov: 25,
          zoom: 0.5,
          position: [-0.4, 0, 9],
        }}
        aria-label="Three Dimensional View of a Behind The Matches Artwork">
        <Scene />
      </Canvas>
    );
  },
  () => true,
);
