import {
  ChangeEvent,
  FormEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export const useInputState = <T extends HTMLInputElement | HTMLTextAreaElement>(
  onExternalChange?: FormEventHandler<T>,
) => {
  const [valid, setValid] = useState(false);
  const [filled, setFilled] = useState(false);
  const node = useRef<T>(null);

  const onChange = useCallback(
    (e: ChangeEvent<T>) => {
      if (!node.current) {
        return onExternalChange?.(e);
      }
      setFilled(!!e.target.value.length);
      setValid(node.current.checkValidity());
      onExternalChange?.(e);
    },
    [onExternalChange],
  );

  useEffect(() => {
    setTimeout(() => {
      if (node.current) {
        setFilled(!!node.current.value.length);
      }
    }, 0);
  }, []);

  return useMemo(
    () => ({ node, onChange, valid, filled }),
    [valid, filled, node, onChange],
  );
};
