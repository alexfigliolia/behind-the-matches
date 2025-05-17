import gsap from "gsap";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Group, Vector3 } from "three";
import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Art } from "3D/Art";
import { useWindowSize } from "Hooks/useWindowSize";
import { Propless } from "Types/React";
import { Staging } from "./Staging";

export const Scene = (_: Propless) => {
  const lerp = useRef(0);
  const { camera } = useThree();
  const [width] = useWindowSize();
  const model = useRef<Group>(null);
  const [initialCameraPosition, setCameraPosition] = useState<
    Vector3 | undefined
  >(undefined);
  const zoom = useMemo(() => (width < 670 ? 0.85 : 0.75), [width]);

  useEffect(() => {
    if (!initialCameraPosition) {
      return;
    }
    const TL = gsap.timeline();
    TL.to(camera.position, {
      x: initialCameraPosition.x + 1.75,
      z: initialCameraPosition.z - 0.75,
      duration: 1.5,
      delay: 0.5,
      ease: "power2.inOut",
      onUpdate: () => {
        camera.lookAt(model.current?.position ?? new Vector3(0, 0, 0));
        camera.updateMatrix();
      },
    });
    TL.to(camera.position, {
      x: initialCameraPosition.x,
      z: initialCameraPosition.z,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => {
        camera.lookAt(model.current?.position ?? new Vector3(0, 0, 0));
        camera.updateMatrix();
      },
    });
  }, [camera, initialCameraPosition]);

  useFrame(({ camera }) => {
    if (camera.zoom === zoom) {
      lerp.current = 0;
      if (!initialCameraPosition) {
        setCameraPosition(camera.position);
      }
      return;
    }
    lerp.current = Math.min(1, lerp.current + 0.005);
    camera.zoom = camera.zoom + (zoom - camera.zoom) * lerp.current;
    camera.updateProjectionMatrix();
  });

  return (
    <Fragment>
      <OrbitControls enablePan enableRotate enableZoom={false} />
      <Staging>
        <Art ref={model} />
      </Staging>
    </Fragment>
  );
};
