"use client";
import { Fragment, useCallback, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Navigation } from "Components/Navigation";
import { useModalToggle } from "Hooks/useModalToggle";
import { OptionalChildren } from "Types/React";
import { MobileMenu } from "../MobileMenu";
import { Burger } from "./Burger";
import { Logo } from "./Logo";
import { Socials } from "./Socials";
import "./styles.scss";

export const Header = ({ children }: OptionalChildren) => {
  const [open, setOpen] = useState(false);

  const openMenu = useCallback(() => setOpen(true), []);
  const closeMenu = useCallback(() => setOpen(false), []);

  const toggle = useModalToggle(openMenu, closeMenu);

  const toggleMenu = useCallback(() => {
    if (toggle.isOpen) {
      return toggle.close();
    }
    toggle.open();
  }, [toggle]);

  const classes = useClassNames("main-header", { open });
  return (
    <Fragment>
      <header className={classes}>
        <div>
          <div>
            <Logo closeMenu={closeMenu} />
            <div>
              <Navigation>
                <Socials />
              </Navigation>
              <Burger open={open} onClick={toggleMenu} />
              {children}
            </div>
          </div>
        </div>
      </header>
      <MobileMenu open={open} close={closeMenu} />
    </Fragment>
  );
};
