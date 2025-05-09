import { classnames } from "@figliolia/classnames";
import { Callback } from "Types/Generics";
import "./styles.scss";

export const Button = ({ text, onClick, className, ...rest }: Props) => {
  return (
    <button
      className={classnames("cta-button", className)}
      onClick={onClick}
      data-text={text}
      {...rest}>
      {text}
    </button>
  );
};

interface Props {
  text: string;
  onClick: Callback;
  className?: string;
  disabled?: boolean;
}
