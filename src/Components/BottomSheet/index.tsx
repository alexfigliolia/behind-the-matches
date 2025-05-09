"use client";
import { BottomSheet as BottomSheetImpl } from "@figliolia/bottom-sheet";
import { Portal } from "Components/Portal";
import { Callback } from "Types/Generics";
import { OptionalChildren } from "Types/React";

export const BottomSheet = ({ children, open, close, className }: Props) => {
  return (
    <Portal>
      <BottomSheetImpl
        dim
        notch
        open={open}
        close={close}
        className={className}>
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
