"use client";
import { BottomSheet as BottomSheetImpl } from "@figliolia/bottom-sheet";
import { useClassNames } from "@figliolia/classnames";
import { Portal } from "Components/Portal";
import { Callback } from "Types/Generics";
import { OptionalChildren } from "Types/React";
import "./styles.scss";

export const BottomSheet = ({ children, open, close, className }: Props) => {
  const classes = useClassNames("btm-bottom-sheet", className);
  return (
    <Portal>
      <BottomSheetImpl dim notch open={open} close={close} className={classes}>
        {children}
      </BottomSheetImpl>
    </Portal>
  );
};

interface Props extends OptionalChildren {
  open: boolean;
  close: Callback;
  className?: string;
}
