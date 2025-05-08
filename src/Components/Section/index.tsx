import { HTMLAttributes } from "react";
import { classnames } from "@figliolia/classnames";
import "./styles.scss";

export const Section = ({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <section className={classnames("section", className)} {...rest}>
      {children}
    </section>
  );
};
