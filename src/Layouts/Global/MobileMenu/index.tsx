"use client";
import { useClassNames } from "@figliolia/classnames";
import { Navigation } from "Components/Navigation";
import { Portal } from "Components/Portal";
import { Callback } from "Types/Generics";
import "./styles.scss";

export const MobileMenu = ({ open, close }: Props) => {
  const classes = useClassNames("mobile-menu", { open });
  return (
    <Portal>
      <div role="dialog" className={classes}>
        <Navigation onNavigate={close} />
      </div>
    </Portal>
  );
};

interface Props {
  open: boolean;
  close: Callback;
}
