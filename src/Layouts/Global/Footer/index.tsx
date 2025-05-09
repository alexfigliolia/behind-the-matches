import { Navigation } from "Components/Navigation";
import { Propless } from "Types/React";
import "./styles.scss";

export const Footer = (_: Propless) => {
  return (
    <footer className="footer">
      <h2>Behind The Matches</h2>
      <Navigation />
    </footer>
  );
};
