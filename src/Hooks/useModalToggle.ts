import { useMemo } from "react";
import { ModalStack } from "Tools/ModalStack";
import { Callback } from "Types/Generics";

export const useModalToggle = (open: Callback, close: Callback) => {
  return useMemo(() => ModalStack.create(open, close), [open, close]);
};
