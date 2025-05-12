"use client";
import { HTMLProps } from "react";
import { useClassNames } from "@figliolia/classnames";
import { useInputState } from "Hooks/useInputState";
import "Components/Input/styles.scss";

export const TextArea = ({
  label,
  className,
  onChange: onExternalChange,
  ...rest
}: Omit<HTMLProps<HTMLTextAreaElement>, "placeholder">) => {
  const { node, onChange, valid, filled } = useInputState(onExternalChange);
  const classes = useClassNames("input", "textarea", className, {
    valid,
    filled,
  });
  return (
    <label className={classes}>
      <span>{label}</span>
      <textarea ref={node} {...rest} onChange={onChange} />
    </label>
  );
};
