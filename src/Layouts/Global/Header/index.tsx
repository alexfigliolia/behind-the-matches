"use client";
import { Fragment, useCallback, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Navigation } from "Components/Navigation";
import { Propless } from "Types/React";
import { MobileMenu } from "../MobileMenu";
import { Burger } from "./Burger";
import "./styles.scss";

export const Header = (_: Propless) => {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => {
    setOpen(v => !v);
  }, []);
  const classes = useClassNames("main-header", { open });
  return (
    <Fragment>
      <header className={classes}>
        <div>
          <div>
            <h1>BTM</h1>
            <Navigation />
            <Burger open={open} onClick={toggle} />
          </div>
        </div>
      </header>
      <MobileMenu open={open} close={toggle} />
    </Fragment>
  );
};
