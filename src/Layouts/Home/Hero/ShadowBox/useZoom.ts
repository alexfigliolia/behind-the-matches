import { useEffect, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { useWindowSize } from "Hooks/useWindowSize";

export const useZoom = () => {
  const [width] = useWindowSize();
  const camera = useThree(c => c.camera);
  const zoom = useMemo(() => (width < 670 ? 0.85 : 0.75), [width]);

  useEffect(() => {
    camera.zoom = zoom;
    camera.updateMatrixWorld();
    camera.updateProjectionMatrix();
  }, [zoom, camera]);
};
