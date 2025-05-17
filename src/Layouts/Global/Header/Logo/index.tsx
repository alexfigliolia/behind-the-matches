import Link from "next/link";
import "./styles.scss";

export const Logo = ({ closeMenu }: Props) => {
  return (
    <Link href="/" className="logo" onNavigate={closeMenu}>
      <img src="/logo.png" alt="Logo" />
    </Link>
  );
};

interface Props {
  closeMenu: () => void;
}
