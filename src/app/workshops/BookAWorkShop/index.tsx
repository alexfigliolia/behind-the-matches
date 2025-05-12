"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BottomSheet } from "Components/BottomSheet";
import { Button } from "Components/Button";
import { Input } from "Components/Input";
import { TextArea } from "Components/TextArea";
import { useModalToggle } from "Hooks/useModalToggle";
import { useMutateParams } from "Hooks/useMutateParams";
import { Close } from "Icons/Close";
import { Propless } from "Types/React";
import "./styles.scss";

export const BookAWorkShop = (_: Propless) => {
  const [open, setOpen] = useState(false);

  const nav = useRouter();
  const params = useSearchParams();
  const mutator = useMutateParams();

  const openSheet = useCallback(() => {
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      const params = mutator(p => p.delete("book"));
      nav.replace(`/workshops${params}`, { scroll: false });
    }, 400);
  }, [nav, mutator]);

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
      <button className="closer" onClick={close}>
        <Close aria-hidden />
      </button>
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
};
