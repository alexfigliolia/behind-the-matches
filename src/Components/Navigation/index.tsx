import { Link } from "Components/Link";
import { SplitText } from "Components/SplitText";
import { Propless } from "Types/React";
import "./styles.scss";

export const Navigation = (_: Propless) => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link href="/about">
            <SplitText text="About" />
          </Link>
        </li>
        <li>
          <Link href="/shop">
            <SplitText text="Shop" />
          </Link>
        </li>
        <li>
          <Link href="/workshops">
            <SplitText text="Workshops" />
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <SplitText text="Contact" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
