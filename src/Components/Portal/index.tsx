"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { OptionalChildren } from "Types/React";

export const Portal = ({ nodeID, children }: Props) => {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (nodeID) {
      return setTarget(document.getElementById(nodeID));
    }
    setTarget(document.body);
  }, [nodeID]);

  if (!target) {
    return null;
  }

  return createPortal(children, target);
};

interface Props extends OptionalChildren {
  nodeID?: string;
}
