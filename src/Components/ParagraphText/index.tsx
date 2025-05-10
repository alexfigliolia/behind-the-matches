import { HTMLAttributes } from "react";
import { classnames } from "@figliolia/classnames";
import "./styles.scss";

export const ParagraphText = ({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p className={classnames("paragraph-text", className)} {...rest}>
      {children}
    </p>
  );
};
