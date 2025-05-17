import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import {
  Bounds,
  Center,
  ContactShadows,
  Environment,
  OnCenterCallbackProps,
  useBounds,
} from "@react-three/drei";
import { OptionalChildren } from "Types/React";

const BASE_SPOT_LIGHT_POSITION = [0.5, 1.75, 1] as const;
const BASE_POINT_LIGHT_POSITION = [-2, -0.5, -2] as const;

export function Staging({ children }: OptionalChildren) {
  const [{ radius, height }, set] = useState({
    radius: 0,
    height: 0,
  });

  const onCentered = useCallback((props: OnCenterCallbackProps) => {
    const { height, boundingSphere } = props;
    set({ radius: boundingSphere.radius, height });
  }, []);

  const pointLightPosition = useMemo(
    () =>
      [
        BASE_POINT_LIGHT_POSITION[0] * radius,
        BASE_POINT_LIGHT_POSITION[1] * radius,
        BASE_POINT_LIGHT_POSITION[2] * radius,
      ] as const,
    [radius],
  );

  const spotLightPosition = useMemo(
    () =>
      [
        BASE_SPOT_LIGHT_POSITION[0] * radius,
        BASE_SPOT_LIGHT_POSITION[1] * radius,
        BASE_SPOT_LIGHT_POSITION[2] * radius,
      ] as const,
    [radius],
  );

  return (
    <Fragment>
      <ambientLight intensity={1} />
      <spotLight
        castShadow
        penumbra={1}
        position={spotLightPosition}
        intensity={6}
        shadow-bias={-0.0001}
        shadow-normalBias={0}
        shadow-mapSize={1024}
      />
      <pointLight position={pointLightPosition} intensity={3} />
      <Bounds fit clip margin={1} observe>
        <Refit radius={radius} />
        <Center position={[0, 0, 0]} onCentered={onCentered}>
          {children}
        </Center>
      </Bounds>
      <group position={[0, -height / 2, 0]}>
        <ContactShadows scale={radius * 4} far={radius} blur={2} />
      </group>
      <Environment path="/" files="lighting.hdr" />
    </Fragment>
  );
}

function Refit({ radius }: { radius: number }) {
  const api = useBounds();

  useEffect(() => {
    api.refresh().clip().fit();
  }, [radius, api]);

  return null;
}
