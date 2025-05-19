import { Link } from "Components/Link";
import { SplitText } from "Components/SplitText";
import { Callback } from "Types/Generics";
import { OptionalChildren } from "Types/React";
import "./styles.scss";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/shop", label: "Shop" },
  { href: "/workshops", label: "Workshops" },
  { href: "/contact", label: "Contact" },
] as const;

export const Navigation = ({ onNavigate, children, split = false }: Props) => {
  return (
    <nav className="nav" aria-label="Main Website Naviation">
      <ul>
        {LINKS.map(({ href, label }) => (
          <li key={href}>
            <Link
              onClick={onNavigate}
              href={href}
              aria-label={split ? label : undefined}>
              {split ? <SplitText text={label} /> : label}
            </Link>
          </li>
        ))}
        {children && <li>{children}</li>}
      </ul>
    </nav>
  );
};

interface Props extends OptionalChildren {
  split?: boolean;
  onNavigate?: Callback;
}
