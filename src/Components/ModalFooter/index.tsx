import { ReactNode } from "react";
import { useClassNames } from "@figliolia/classnames";
import { OptionalChildren } from "Types/React";
import "./styles.scss";

export const ModalFooter = ({
  actions,
  children,
  className,
}: ModalFooterProps) => {
  const classes = useClassNames("modal-footer", className);
  return (
    <div className={classes}>
      <div>
        <div className="actions">{actions}</div>
        {children}
      </div>
    </div>
  );
};

export interface ModalFooterProps extends OptionalChildren {
  className?: string;
  actions: ReactNode;
}
