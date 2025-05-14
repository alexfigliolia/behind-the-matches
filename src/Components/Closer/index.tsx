import { HTMLAttributes } from "react";
import { classnames } from "@figliolia/classnames";
import { Close } from "Icons/Close";
import "./styles.scss";

export const Closer = ({
  className,
  ...rest
}: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={classnames("closer", className)} {...rest}>
      <Close aria-hidden />
    </button>
  );
};
