"use client";
import { Fragment, useCallback, useEffect, useRef } from "react";
import { ModalToggle } from "@figliolia/modal-stack";
import { Button } from "Components/Button";
import { Form, FormCTRL } from "Components/Form";
import { Input } from "Components/Input";
import { TextArea } from "Components/TextArea";
import { useNetlifyForm } from "Hooks/useNetlifyForm";
import { Propless } from "Types/React";
import { Notification } from "./Notification";

export const InquiryForm = (_: Propless) => {
  const form = useRef<FormCTRL>(null);
  const notification = useRef<ModalToggle>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onSuccess = useCallback(() => {
    form.current?.clear?.();
    notification?.current?.open?.();
  }, []);

  const { onSubmit } = useNetlifyForm(onSuccess);

  const clearCloserTimeout = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }, []);

  useEffect(() => {
    return () => clearCloserTimeout();
  }, [clearCloserTimeout]);

  return (
    <Fragment>
      <Form ref={form} name="general-inquiry" onSubmit={onSubmit}>
        <Input required type="text" name="name" label="Name" />
        <Input required type="email" name="email" label="Email" />
        <TextArea required name="message" label="Message" />
        <Button text="Submit" />
      </Form>
      <Notification ref={notification} onHide={clearCloserTimeout} />
    </Fragment>
  );
};
