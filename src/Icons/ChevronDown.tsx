import { SVGProps } from "react";
import { classnames } from "@figliolia/classnames";

export const ChevronDown = ({
  className,
  children,
  ...rest
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className={classnames("chevron-down", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}>
      <g>
        <path
          d="M19 9L12 16L5 9"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      {children}
    </svg>
  );
};
