import { useMemo } from "react";
import { useClassNames } from "@figliolia/classnames";
import "./styles.scss";

export const SplitText = ({ text, className, Tag = "div" }: Props) => {
  const classes = useClassNames("split-text", className);
  const tokens = useMemo(() => text.split(""), [text]);
  return (
    <Tag className={classes} aria-label={text}>
      {tokens.map((char, i) => {
        if (char === " ") {
          return (
            <div aria-hidden key={i}>
              &nbsp;
            </div>
          );
        }
        return (
          <div aria-hidden key={i}>
            {char}
          </div>
        );
      })}
    </Tag>
  );
};

interface Props {
  text: string;
  className?: string;
  Tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";
}
