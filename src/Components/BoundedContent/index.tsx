import { classnames } from "@figliolia/classnames";
import { OptionalChildren } from "Types/React";
import "./styles.scss";

export const BoundedContent = ({ children, className }: Props) => {
  return (
    <div className={classnames("bounded-content", className)}>{children}</div>
  );
};

interface Props extends OptionalChildren {
  className?: string;
}
