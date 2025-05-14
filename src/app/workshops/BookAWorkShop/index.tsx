"use client";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BottomSheet } from "Components/BottomSheet";
import { Button } from "Components/Button";
import { Closer } from "Components/Closer";
import { Input } from "Components/Input";
import { TextArea } from "Components/TextArea";
import { Suspended } from "HOCs/Suspended";
import { useModalToggle } from "Hooks/useModalToggle";
import { useReplaceSearchParams } from "Hooks/useReplaceSearchParams";
import { Propless } from "Types/React";
import "./styles.scss";

export const BookAWorkShop = Suspended((_: Propless) => {
  const [open, setOpen] = useState(false);

  const params = useSearchParams();
  const replace = useReplaceSearchParams();

  const openSheet = useCallback(() => {
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      replace(p => p.delete("book"));
    }, 400);
  }, [replace]);

  const toggle = useModalToggle(openSheet, close);

  useEffect(() => {
    if (params.get("book")) {
      toggle.open();
    } else if (toggle.isOpen) {
      toggle.close();
    }
  }, [params, toggle]);

  return (
    <BottomSheet open={open} close={toggle.close} className="book-a-workshop">
      <Closer aria-label="Close Window" onClick={close} />
      <h2>Book Your Event</h2>
      <form>
        <Input required label="Name" type="text" />
        <Input required label="Email" type="email" />
        <Input required label="Date" type="date" />
        <TextArea required label="Message" />
        <Button text="Book!" />
      </form>
    </BottomSheet>
  );
});
