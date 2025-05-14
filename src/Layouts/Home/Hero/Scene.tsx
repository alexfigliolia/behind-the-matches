import { Fragment, useMemo, useRef } from "react";
import { OrbitControls, Stage } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Art } from "3D/Art";
import { useWindowSize } from "Hooks/useWindowSize";
import { Propless } from "Types/React";

export function Scene(_: Propless) {
  const [width] = useWindowSize();
  const lerp = useRef(0);
  const zoom = useMemo(() => (width < 670 ? 0.8 : 0.65), [width]);

  useFrame(({ camera }) => {
    if (camera.zoom === zoom) {
      lerp.current = 0;
      return;
    }
    lerp.current = Math.min(1, lerp.current + 0.005);
    camera.zoom = camera.zoom + (zoom - camera.zoom) * lerp.current;
    camera.updateProjectionMatrix();
  });

  return (
    <Fragment>
      <OrbitControls autoRotate autoRotateSpeed={0.4} enableZoom={false} />
      <ambientLight intensity={10} />
      <Stage shadows="contact" intensity={0.5}>
        <Art />
      </Stage>
    </Fragment>
  );
}
