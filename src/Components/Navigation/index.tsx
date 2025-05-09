import { Link } from "Components/Link";
import { SplitText } from "Components/SplitText";
import { Callback } from "Types/Generics";
import "./styles.scss";

export const Navigation = ({ onNavigate }: Props) => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link onClick={onNavigate} href="/about">
            <SplitText text="About" />
          </Link>
        </li>
        <li>
          <Link onClick={onNavigate} href="/shop">
            <SplitText text="Shop" />
          </Link>
        </li>
        <li>
          <Link onClick={onNavigate} href="/workshops">
            <SplitText text="Workshops" />
          </Link>
        </li>
        <li>
          <Link onClick={onNavigate} href="/contact">
            <SplitText text="Contact" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

interface Props {
  onNavigate?: Callback;
}
