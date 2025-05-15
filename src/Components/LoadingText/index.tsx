import { HTMLProps } from "react";
import { classnames } from "@figliolia/classnames";
import "./styles.scss";

export const LoadingText = ({
  children,
  className,
  ...rest
}: HTMLProps<HTMLParagraphElement>) => {
  return (
    <p className={classnames("loading-text", className)} {...rest}>
      {children}
    </p>
  );
};
