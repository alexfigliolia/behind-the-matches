import { SVGProps } from "react";
import { classnames } from "@figliolia/classnames";

export const ChevronUp = ({
  className,
  children,
  ...rest
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className={classnames("chevron-up", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}>
      <g>
        <path
          d="M5 16L12 9L19 16"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      {children}
    </svg>
  );
};
