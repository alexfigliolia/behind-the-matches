import Link, { LinkProps } from "next/link";
import { classnames } from "@figliolia/classnames";
import "Components/Button/styles.scss";

export const ButtonLink = ({
  text,
  className,
  disabled = false,
  ...rest
}: Props) => {
  return (
    <Link
      {...rest}
      tabIndex={disabled ? -1 : undefined}
      className={classnames("cta-link", className, { disabled })}
      data-text={text}>
      {text}
    </Link>
  );
};

interface Props extends LinkProps {
  text: string;
  className?: string;
  disabled?: boolean;
  href: string;
}
