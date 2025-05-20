"use client";
import { useCallback } from "react";
import {
  BottomSheet as BottomSheetImpl,
  IBottomSheetProps,
  ISheetController,
} from "@figliolia/bottom-sheet";
import { useClassNames } from "@figliolia/classnames";
import { ModalToggle } from "@figliolia/modal-stack";
import { Portal } from "Components/Portal";
import "./styles.scss";

export const BottomSheet = ({
  toggle,
  children,
  className,
  ...rest
}: Props) => {
  const classes = useClassNames("btm-bottom-sheet", className);

  const cacheRef = useCallback(
    (ctrl: ISheetController | null) => {
      toggle.registerTrapNode(ctrl?.scrollView?.current ?? null);
    },
    [toggle],
  );

  return (
    <Portal>
      <BottomSheetImpl
        dim
        notch
        ref={cacheRef}
        className={classes}
        close={toggle.close}
        {...rest}>
        {children}
      </BottomSheetImpl>
    </Portal>
  );
};

interface Props extends Omit<IBottomSheetProps, "dim" | "notch" | "close"> {
  toggle: ModalToggle;
}
