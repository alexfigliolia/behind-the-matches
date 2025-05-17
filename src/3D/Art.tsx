import React, { ForwardedRef, forwardRef } from "react";
import { Group } from "three";
import { useGLTF } from "@react-three/drei";
import { Suspended } from "HOCs/Suspended";
import { Propless } from "Types/React";

export const Art = Suspended(
  forwardRef(function Art(_: Propless, ref: ForwardedRef<Group>) {
    const { nodes, materials } = useGLTF("/art.glb");
    return (
      <group ref={ref} dispose={null} rotation={[0, -1.3, 0.25]}>
        <mesh
          castShadow
          receiveShadow
          // @ts-ignore
          geometry={nodes.Babbo.geometry}
          material={materials["Material.006"]}
          position={[0.01, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          // @ts-ignore
          geometry={nodes.Via_Carota.geometry}
          material={materials["Material.007"]}
          position={[0.013, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          // @ts-ignore
          geometry={nodes.Bar_Priimi.geometry}
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
          position={[0.014, 0, 0]}
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
          position={[0.005, 0, 0]}
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
  }),
);

useGLTF.preload("/art.glb");
