"use client";
import { HTMLProps, useCallback, useState } from "react";
import { classnames } from "@figliolia/classnames";
import "./styles.scss";

export const Input = ({
  label,
  type,
  className,
  ...rest
}: Omit<HTMLProps<HTMLInputElement>, "placeholder">) => {
  const [focused, setFocused] = useState(false);
  const onFocus = useCallback(() => {
    setFocused(true);
  }, []);
  const onBlur = useCallback(() => {
    setFocused(false);
  }, []);
  return (
    <label className={classnames("input", className)}>
      <span>{label}</span>
      <input
        onFocus={onFocus}
        onBlur={onBlur}
        type={type === "date" && !focused ? "text" : type}
        {...rest}
      />
    </label>
  );
};
