"use client";
import { useClassNames } from "@figliolia/classnames";
import { Navigation } from "Components/Navigation";
import { Portal } from "Components/Portal";
import { SocialMediaLinks } from "Components/SocialMediaLinks";
import { useWindowSize } from "Hooks/useWindowSize";
import { Callback } from "Types/Generics";
import "./styles.scss";

export const MobileMenu = ({ open, close }: Props) => {
  const [_, height] = useWindowSize();
  const classes = useClassNames("mobile-menu", { open });
  return (
    <Portal>
      <div
        role="dialog"
        className={classes}
        style={{ "--height": `${height}px` }}>
        <div>
          <Navigation split onNavigate={close} />
          <div className="socials">
            <SocialMediaLinks />
          </div>
        </div>
      </div>
    </Portal>
  );
};

interface Props {
  open: boolean;
  close: Callback;
}
