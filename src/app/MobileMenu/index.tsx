"use client";
import { useClassNames } from "@figliolia/classnames";
import { Navigation } from "Components/Navigation";
import { Portal } from "Components/Portal";
import { useEscapeKey } from "Hooks/useEscapeKey";
import { Callback } from "Types/Generics";
import "./styles.scss";

export const MobileMenu = ({ open, close }: Props) => {
  useEscapeKey(close, open);
  const classes = useClassNames("mobile-menu", { open });
  return (
    <Portal>
      <div role="dialog" className={classes}>
        <Navigation />
      </div>
    </Portal>
  );
};

interface Props {
  open: boolean;
  close: Callback;
}
