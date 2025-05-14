import React from "react";
import { useGLTF } from "@react-three/drei";
import { Suspended } from "HOCs/Suspended";
import { Propless } from "Types/React";

export const Art = Suspended((_: Propless) => {
  const { nodes, materials } = useGLTF("/art.glb");
  return (
    <group dispose={null} rotation={[0, -1.3, 0.25]}>
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.Plane.geometry}
        material={materials["Material.001"]}
      />
    </group>
  );
});

useGLTF.preload("/art.glb");
