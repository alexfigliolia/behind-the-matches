"use client";
import React, { ForwardedRef, forwardRef } from "react";
import { Group } from "three";
import { useGLTF } from "@react-three/drei";
import { GLTFKTX2 } from "./GTLFKTX2";
import { ArtProps } from "./types";

export const ArtOptimized = forwardRef(function ArtOptimized(
  { rotation }: ArtProps,
  ref: ForwardedRef<Group>,
) {
  const { nodes, materials } = useGLTF(
    "/art-optimized.glb",
    undefined,
    undefined,
    GLTFKTX2.extendGLTF,
  );

  return (
    <group
      ref={ref}
      dispose={null}
      rotation={rotation}
      scale={[4.15, 4.15, 4.15]}
      position={[0.25, -1.9, 0]}>
      <group position={[-0.074, 0.43, 0]} scale={0.429}>
        <mesh
          castShadow
          receiveShadow
          // @ts-ignore
          geometry={nodes.Plane.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          // @ts-ignore
          geometry={nodes.Plane_1.geometry}
          material={materials["Material.002"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Babbo.geometry}
        material={materials["Material.006"]}
        position={[-0.055, 0.706, 0.281]}
        scale={0.071}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Via_Carota.geometry}
        material={materials["Material.007"]}
        position={[-0.054, 0.558, 0.241]}
        scale={0.085}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Bar_Primi.geometry}
        material={materials["Material.008"]}
        position={[-0.059, 0.706, 0.145]}
        scale={0.073}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Carbone.geometry}
        material={materials["Material.009"]}
        position={[-0.05, 0.442, 0.243]}
        scale={0.08}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Pastis.geometry}
        material={materials["Material.010"]}
        position={[-0.049, 0.718, -0.222]}
        scale={0.128}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Joseph_Leonard.geometry}
        material={materials["Material.011"]}
        position={[-0.058, 0.7, -0.004]}
        scale={0.08}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Felice.geometry}
        material={materials["Material.012"]}
        position={[-0.047, 0.562, -0.303]}
        scale={0.072}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Cote.geometry}
        material={materials["Material.013"]}
        position={[-0.056, 0.558, -0.161]}
        scale={0.079}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Sant_Ambroues.geometry}
        material={materials["Material.014"]}
        position={[-0.045, 0.368, -0.296]}
        scale={0.096}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Cipriani.geometry}
        material={materials["Material.015"]}
        position={[-0.053, 0.333, 0.229]}
        scale={0.095}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Aqua_Grill.geometry}
        material={materials["Material.016"]}
        position={[-0.046, 0.51, 0.031]}
        scale={0.089}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Crosby_Street.geometry}
        material={materials["Material.017"]}
        position={[-0.05, 0.35, -0.152]}
        scale={0.102}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Charlie_Bird.geometry}
        material={materials["Material.018"]}
        position={[-0.051, 0.154, -0.289]}
        scale={0.081}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Bartusi.geometry}
        material={materials["Material.019"]}
        position={[-0.052, 0.329, 0.015]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Bowery_Hotel.geometry}
        material={materials["Material.020"]}
        position={[-0.054, 0.22, 0.239]}
        scale={0.084}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Gramercy_Tavern.geometry}
        material={materials["Material.021"]}
        position={[-0.046, 0.148, -0.076]}
        scale={0.109}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Bar_Pitti.geometry}
        material={materials["Material.022"]}
        position={[-0.059, 0.112, 0.234]}
        scale={0.09}
      />
      <group position={[-0.062, 0.164, 0.088]} scale={0.084}>
        <mesh
          castShadow
          receiveShadow
          // @ts-ignore
          geometry={nodes.Cube002.geometry}
          material={materials["Material.025"]}
        />
        <mesh
          castShadow
          receiveShadow
          // @ts-ignore
          geometry={nodes.Cube002_1.geometry}
          material={materials["Material.026"]}
        />
      </group>
    </group>
  );
});

if (typeof window !== "undefined" && !GLTFKTX2.isIOS) {
  useGLTF.preload(
    "/art-optimized.glb",
    undefined,
    undefined,
    GLTFKTX2.extendGLTF,
  );
}
