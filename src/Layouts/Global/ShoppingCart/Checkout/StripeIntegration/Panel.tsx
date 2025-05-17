"use client";
import { HTMLAttributes } from "react";
import { useClassNames } from "@figliolia/classnames";
import { useSizeObserver } from "@figliolia/size-observer";
import "./styles.scss";

export const Panel = ({
  className,
  children,
  cacheHeight,
  ...rest
}: PanelProps) => {
  const node = useSizeObserver<HTMLDivElement>({
    width: false,
    height: true,
    onChange: ({ height }) => cacheHeight(height),
  });
  const classes = useClassNames("panel", className);
  return (
    <div ref={node} className={classes} {...rest}>
      {children}
    </div>
  );
};

export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  cacheHeight: (height: number) => void;
}
