"use client";
import { useSearchParams } from "next/navigation";
import {
  Fragment,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { useModalToggle } from "@figliolia/modal-stack";
import { BottomSheet } from "Components/BottomSheet";
import { Button } from "Components/Button";
import { Closer } from "Components/Closer";
import { Form, FormCTRL } from "Components/Form";
import { Input } from "Components/Input";
import { ModalFormFooter } from "Components/ModalFormFooter";
import { TextArea } from "Components/TextArea";
import { Suspended } from "HOCs/Suspended";
import { useNetlifyForm } from "Hooks/useNetlifyForm";
import { useReplaceSearchParams } from "Hooks/useReplaceSearchParams";
import { Propless } from "Types/React";
import "./styles.scss";

export const BookAWorkShop = Suspended((_: Propless) => {
  const title = useId();
  const form = useRef<FormCTRL>(null);
  const [open, setOpen] = useState(false);

  const params = useSearchParams();
  const replace = useReplaceSearchParams();

  const {
    onSubmit,
    setState: _setState,
    resetState,
    ...status
  } = useNetlifyForm();

  const openSheet = useCallback(() => {
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      resetState();
      replace(p => p.delete("book"));
      form?.current?.clear?.();
    }, 400);
  }, [replace, resetState]);

  const toggle = useModalToggle(openSheet, close);

  useEffect(() => {
    if (params.get("book")) {
      toggle.open();
    } else if (toggle.isOpen) {
      toggle.close();
    }
  }, [params, toggle]);

  const showStatus = useMemo(
    () => status.success || !!status.error || status.loading,
    [status],
  );

  return (
    <BottomSheet
      open={open}
      toggle={toggle}
      className="book-a-workshop"
      aria-labelledby={title}>
      <Closer aria-label="Close Window" onClick={close} />
      <h2 id={title}>Book Your Event</h2>
      <Form ref={form} name="book-an-event" onSubmit={onSubmit}>
        <input type="hidden" name="form-name" value="book-an-event" />
        <Input required name="name" label="Name" type="text" />
        <Input required name="email" label="Email" type="email" />
        <Input required name="date" label="Date" type="date" />
        <TextArea required name="details" label="Message" />
        <ModalFormFooter
          {...status}
          showStatus={showStatus}
          onClose={toggle.close}
          resetState={resetState}
          successText="Someone from our team will reach out to you shortly"
          actions={
            <Fragment>
              <Button
                type="button"
                text="Cancel"
                onClick={toggle.close}
                disabled={showStatus}
              />
              <Button text="Submit" disabled={showStatus} />
            </Fragment>
          }
        />
      </Form>
    </BottomSheet>
  );
});
