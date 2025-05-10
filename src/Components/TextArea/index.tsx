import { HTMLProps } from "react";
import { classnames } from "@figliolia/classnames";
import "Components/Input/styles.scss";

export const TextArea = ({
  label,
  className,
  ...rest
}: Omit<HTMLProps<HTMLTextAreaElement>, "placeholder">) => {
  return (
    <label className={classnames("input", "textarea", className)}>
      <span>{label}</span>
      <textarea {...rest} />
    </label>
  );
};
