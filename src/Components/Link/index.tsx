"use client";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { classnames } from "@figliolia/classnames";
import { Callback } from "Types/Generics";
import { OptionalChildren } from "Types/React";

export const Link = ({ children, href, onClick }: Props) => {
  const location = usePathname();
  const active = location === href;
  return (
    <NextLink className={classnames({ active })} href={href} onClick={onClick}>
      {children}
    </NextLink>
  );
};

interface Props extends OptionalChildren {
  href: string;
  onClick?: Callback;
}
