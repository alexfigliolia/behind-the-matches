"use client";
import { HTMLProps } from "react";
import { useClassNames } from "@figliolia/classnames";
import { useInputState } from "Hooks/useInputState";
import "./styles.scss";

export const Input = ({
  label,
  className,
  children,
  onChange: onExternalChange,
  ...rest
}: Omit<HTMLProps<HTMLInputElement>, "placeholder">) => {
  const { node, onChange, valid, filled } = useInputState(onExternalChange);
  const classes = useClassNames("input", className, { valid, filled });

  return (
    <label className={classes}>
      <span>{label}</span>
      <input ref={node} {...rest} onChange={onChange} />
      {children}
    </label>
  );
};
