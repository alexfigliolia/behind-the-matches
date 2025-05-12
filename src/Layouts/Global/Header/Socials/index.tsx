"use client";
import { useCallback, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { SocialMediaLinks } from "Components/SocialMediaLinks";
import { useFocusOut } from "Hooks/useFocusOut";
import { ShareLinks } from "Icons/ShareLinks";
import { Propless } from "Types/React";
import "./styles.scss";

export const Socials = (_: Propless) => {
  const [open, setOpen] = useState(false);
  const classes = useClassNames("view-socials", { open });

  const onMouseEnter = useCallback(() => {
    setOpen(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setOpen(false);
  }, []);

  const onFocus = useCallback(() => {
    setOpen(true);
  }, []);

  const node = useFocusOut<HTMLButtonElement>(onMouseLeave, open);

  return (
    <button
      ref={node}
      aria-expanded={open}
      onFocus={onFocus}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={classes}
      aria-label="View Social Links">
      <ShareLinks aria-hidden />
      <div aria-hidden={!open}>
        <SocialMediaLinks />
      </div>
    </button>
  );
};
