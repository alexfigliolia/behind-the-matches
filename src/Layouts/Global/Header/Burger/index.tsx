import { useClassNames } from "@figliolia/classnames";
import { SplitText } from "Components/SplitText";
import { Callback } from "Types/Generics";
import "./styles.scss";

export const Burger = ({ open, onClick }: Props) => {
  const classes = useClassNames("burger", { open });
  return (
    <button
      className={classes}
      onClick={onClick}
      aria-label="toggle main menu"
      aria-expanded={open}>
      <div>
        <div className="bar top">
          <div className="dot" />
          <div className="line" />
        </div>
        <div className="text">
          <div>
            <SplitText text="MENU" />
            <SplitText text="EXIT" />
          </div>
        </div>
        <div className="bar bottom">
          <div className="line" />
          <div className="dot" />
        </div>
      </div>
    </button>
  );
};

interface Props {
  open: boolean;
  onClick: Callback;
}
