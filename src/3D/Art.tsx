"use client";
import React, { ForwardedRef, forwardRef } from "react";
import { Group } from "three";
import { useGLTF } from "@react-three/drei";
import { GLTFKTX2 } from "./GTLFKTX2";
import { ArtProps } from "./types";

export const Art = forwardRef(function Art(
  { rotation }: ArtProps,
  ref: ForwardedRef<Group>,
) {
  const { nodes, materials } = useGLTF("/art.glb");
  return (
    <group ref={ref} dispose={null} rotation={rotation} scale={[4, 4, 4]}>
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Babbo.geometry}
        material={materials["Material.006"]}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Via_Carota.geometry}
        material={materials["Material.007"]}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Bar_Primi.geometry}
        material={materials["Material.008"]}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Carbone.geometry}
        material={materials["Material.009"]}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Pastis.geometry}
        material={materials["Material.010"]}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Joseph_Leonard.geometry}
        material={materials["Material.011"]}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Felice.geometry}
        material={materials["Material.012"]}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Cote.geometry}
        material={materials["Material.013"]}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Sant_Ambroues.geometry}
        material={materials["Material.014"]}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Cipriani.geometry}
        material={materials["Material.015"]}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Aqua_Grill.geometry}
        material={materials["Material.016"]}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Crosby_Street.geometry}
        material={materials["Material.017"]}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Charlie_Bird.geometry}
        material={materials["Material.018"]}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Bartusi.geometry}
        material={materials["Material.019"]}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Bowery_Hotel.geometry}
        material={materials["Material.020"]}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Gramercy_Tavern.geometry}
        material={materials["Material.021"]}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Bar_Pitti.geometry}
        material={materials["Material.022"]}
      />
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
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Cube003.geometry}
        material={materials["Material.025"]}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Cube003_1.geometry}
        material={materials["Material.026"]}
      />
    </group>
  );
});

if (typeof window !== "undefined" && GLTFKTX2.isIOS) {
  useGLTF.preload("/art.glb");
}
