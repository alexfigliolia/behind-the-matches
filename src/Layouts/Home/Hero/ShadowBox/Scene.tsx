import gsap from "gsap";
import { Fragment, useEffect, useRef } from "react";
import { Group } from "three";
import { OrbitControls } from "@react-three/drei";
import { ShadowBoxModel } from "3D/ShadowBoxModel";
import { Propless } from "Types/React";
import { Staging } from "./Staging";
import { useZoom } from "./useZoom";

export const Scene = (_: Propless) => {
  useZoom();
  const model = useRef<Group>(null);

  useEffect(() => {
    if (!model.current) {
      return;
    }
    const config = {
      duration: 1.5,
      delay: 1.5,
      ease: "power2.inOut",
    };
    const { position, rotation } = model.current;
    const TL = gsap
      .timeline()
      .to(rotation, {
        ...config,
        y: rotation.y - 0.75,
      })
      .to(
        position,
        {
          ...config,
          x: position.x - 0.5,
        },
        0,
      );
    TL.play().then(() => TL.reverse());
  }, []);

  return (
    <Fragment>
      <OrbitControls
        makeDefault
        enableRotate
        enablePan={false}
        enableZoom={false}
      />
      <Staging>
        <ShadowBoxModel ref={model} />
      </Staging>
    </Fragment>
  );
};
