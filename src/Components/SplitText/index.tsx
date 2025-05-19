import { useMemo } from "react";
import { useClassNames } from "@figliolia/classnames";
import "./styles.scss";

export const SplitText = ({ text, className }: Props) => {
  const classes = useClassNames("split-text", className);
  const tokens = useMemo(() => text.split(""), [text]);
  return (
    <div className={classes} aria-hidden>
      {tokens.map((char, i) => {
        if (char === " ") {
          return <span key={i}>&nbsp;</span>;
        }
        return <span key={i}>{char}</span>;
      })}
    </div>
  );
};

interface Props {
  text: string;
  className?: string;
}
