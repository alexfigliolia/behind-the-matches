"use client";
import {
  BottomSheet as BottomSheetImpl,
  IBottomSheetProps,
} from "@figliolia/bottom-sheet";
import { useClassNames } from "@figliolia/classnames";
import { Portal } from "Components/Portal";
import "./styles.scss";

export const BottomSheet = ({
  children,
  className,
  ...rest
}: Omit<IBottomSheetProps, "dim" | "notch">) => {
  const classes = useClassNames("btm-bottom-sheet", className);
  return (
    <Portal>
      <BottomSheetImpl dim notch className={classes} {...rest}>
        {children}
      </BottomSheetImpl>
    </Portal>
  );
};
