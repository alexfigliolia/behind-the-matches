import { ButtonHTMLAttributes } from "react";
import { classnames } from "@figliolia/classnames";
import "./styles.scss";

export const Button = ({ text, className, ...rest }: Props) => {
  return (
    <button
      className={classnames("cta-button", className)}
      data-text={text}
      {...rest}>
      {text}
    </button>
  );
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}
