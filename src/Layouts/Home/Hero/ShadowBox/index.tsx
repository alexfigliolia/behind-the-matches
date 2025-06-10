"use client";
import { memo, Suspense } from "react";
import { Preload } from "@react-three/drei";
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
          zoom: 0.75,
          position: [-0.4, 0, 9],
        }}
        gl={{ antialias: true, alpha: true }}
        aria-label="Three Dimensional View of a Behind The Matches Artwork">
        <Suspense>
          <Preload all />
          <Scene />
        </Suspense>
      </Canvas>
    );
  },
  () => true,
);
