import { ForwardedRef, forwardRef, useMemo } from "react";
import { Group } from "three";
import { Propless } from "Types/React";
import { Art } from "./Art";
import { ArtOptimized } from "./ArtOptimized";
import { GLTFKTX2 } from "./GTLFKTX2";

export const ShadowBoxModel = forwardRef(function ShadowBoxModel(
  _: Propless,
  ref: ForwardedRef<Group>,
) {
  const rotation = useMemo(() => [0, -1.3, 0.25] as const, []);
  if (GLTFKTX2.isIOS) {
    return <Art ref={ref} rotation={rotation} />;
  }
  return <ArtOptimized ref={ref} rotation={rotation} />;
});
