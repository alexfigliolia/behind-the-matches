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
    <footer className={classes}>
      <div>
        <div className="actions">{actions}</div>
        {children}
      </div>
    </footer>
  );
};

export interface ModalFooterProps extends OptionalChildren {
  className?: string;
  actions: ReactNode;
}
