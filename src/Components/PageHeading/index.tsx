import { HTMLAttributes } from "react";
import { classnames } from "@figliolia/classnames";
import "./styles.scss";

export const PageHeading = ({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h1 className={classnames("page-heading", className)} {...rest}>
      {children}
    </h1>
  );
};
