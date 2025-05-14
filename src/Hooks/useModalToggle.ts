import { useEffect, useRef } from "react";
import { ModalStack } from "Tools/ModalStack";
import { Callback } from "Types/Generics";

export const useModalToggle = (open: Callback, close: Callback) => {
  const toggle = useRef(ModalStack.create(open, close));
  useEffect(() => {
    toggle.current.update(open, close);
  }, [open, close]);
  return toggle.current;
};
