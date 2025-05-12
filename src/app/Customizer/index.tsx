"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BottomSheet } from "Components/BottomSheet";
import { Button } from "Components/Button";
import { GalleryImages } from "Components/GalleryImages";
import { Input } from "Components/Input";
import { Slider } from "Components/Slider";
import { TextArea } from "Components/TextArea";
import { useModalToggle } from "Hooks/useModalToggle";
import { useMutateParams } from "Hooks/useMutateParams";
import { Propless } from "Types/React";
import "./styles.scss";

export const Customizer = (_: Propless) => {
  const nav = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const paramsMutator = useMutateParams();

  const openSheet = useCallback(() => {
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      console.log(pathname);
      const params = paramsMutator(p => p.delete("customizer"));
      nav.replace(`${pathname}${params}`, {
        scroll: false,
      });
    }, 400);
  }, [nav, paramsMutator, pathname]);

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
        <p>To request a custom piece, please fill out the form below.</p>
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
};
