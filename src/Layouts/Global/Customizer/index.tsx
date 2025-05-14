"use client";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BottomSheet } from "Components/BottomSheet";
import { Button } from "Components/Button";
import { GalleryImages } from "Components/GalleryImages";
import { Input } from "Components/Input";
import { Slider } from "Components/Slider";
import { TextArea } from "Components/TextArea";
import { Suspended } from "HOCs/Suspended";
import { useModalToggle } from "Hooks/useModalToggle";
import { useReplaceSearchParams } from "Hooks/useReplaceSearchParams";
import { Propless } from "Types/React";
import "./styles.scss";

export const Customizer = Suspended((_: Propless) => {
  const params = useSearchParams();
  const replace = useReplaceSearchParams();
  const [open, setOpen] = useState(false);

  const openSheet = useCallback(() => {
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      replace(p => p.delete("customizer"));
    }, 400);
  }, [replace]);

  const toggle = useModalToggle(openSheet, close);

  useEffect(() => {
    const open = !!params.get("customizer");
    if (open && !toggle.isOpen) {
      toggle.open();
    } else if (!open && toggle.isOpen) {
      toggle.close();
    }
  }, [params, toggle]);

  return (
    <BottomSheet open={open} close={toggle.close} className="customizer-sheet">
      <Slider>
        <GalleryImages />
      </Slider>
      <div className="form">
        <h2>Customize</h2>
        <p>
          Custom pieces are our <strong>bread and butter</strong>. Let your mind
          run wild!
        </p>
        <form>
          <Input required type="text" name="name" label="Your Name" />
          <Input required type="email" name="email" label="Your Email" />
          <Input
            required
            type="text"
            name="dimensions"
            label="Desired Dimensions"
          />
          <TextArea required name="details" label="Any other details" />
          <Button text="Submit" />
        </form>
      </div>
    </BottomSheet>
  );
});
