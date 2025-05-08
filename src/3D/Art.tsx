import React from "react";
import { useGLTF } from "@react-three/drei";
import { Propless } from "Types/React";

export function Art(_: Propless) {
  const { nodes, materials } = useGLTF("/art.glb");
  return (
    <group dispose={null} rotation={[0, -1.3, 0.25]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={materials["Material.001"]}
      />
    </group>
  );
}

useGLTF.preload("/art.glb");
