"use client";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { AnchorHTMLAttributes } from "react";
import { classnames } from "@figliolia/classnames";

export const Link = ({ children, href, onClick, ...rest }: Props) => {
  const location = usePathname();
  const active = location === href;
  return (
    <NextLink
      className={classnames({ active })}
      href={href}
      onClick={onClick}
      {...rest}>
      {children}
    </NextLink>
  );
};

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
}
