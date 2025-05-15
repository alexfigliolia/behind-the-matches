import {
  ForwardedRef,
  forwardRef,
  HTMLProps,
  RefObject,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import { Callback } from "Types/Generics";

export const Form = forwardRef(function Form(
  { children, ...rest }: HTMLProps<HTMLFormElement>,
  ref: ForwardedRef<FormCTRL>,
) {
  const form = useRef<HTMLFormElement>(null);

  const clear = useCallback(() => {
    if (!form.current) {
      return;
    }
    form.current.reset();
    const nodes = form.current.querySelectorAll("input, textarea");
    for (const node of nodes) {
      node.dispatchEvent(new Event("change"));
    }
  }, []);

  useImperativeHandle(ref, () => ({ form, clear }), [clear]);

  return (
    <form ref={form} {...rest}>
      {children}
    </form>
  );
});

export interface FormCTRL {
  form: RefObject<HTMLFormElement | null>;
  clear: Callback;
}
