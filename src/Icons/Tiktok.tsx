import { SVGProps } from "react";
import { classnames } from "@figliolia/classnames";

export const Tiktok = ({
  children,
  className,
  ...rest
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="TikTok"
      role="img"
      viewBox="0 0 512 512"
      className={classnames("tiktok-icon", className)}
      {...rest}>
      <rect rx="15%" height="512" width="512" fill="#ffffff" />
      <defs>
        <path
          id="__tiktok"
          d="M219 200a117 117 0 1 0 101 115v-128a150 150 0 0 0 88 28v-63a88 88 0 0 1-88-88h-64v252a54 54 0 1 1-37-51z"
          style={{ mixBlendMode: "multiply" }}
        />
      </defs>
      <use href="#__tiktok" fill="#f05" x="18" y="15" />
      <use href="#__tiktok" fill="#0ee" />
      {children}
    </svg>
  );
};
