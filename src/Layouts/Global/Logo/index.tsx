import Link from "next/link";
import "./styles.scss";

export const Logo = () => {
  return (
    <Link href="/" className="logo">
      <img src="/logo.png" alt="Logo" />
    </Link>
  );
};
