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
import { Form, FormCTRL } from "Components/Form";
import { Input } from "Components/Input";
import { ModalFormFooter } from "Components/ModalFormFooter";
import { Slider } from "Components/Slider";
import { TextArea } from "Components/TextArea";
import { Suspended } from "HOCs/Suspended";
import { useNetlifyForm } from "Hooks/useNetlifyForm";
import { useReplaceSearchParams } from "Hooks/useReplaceSearchParams";
import { GalleryImages } from "Tools/GalleryImages";
import { Propless } from "Types/React";
import "./styles.scss";

export const Customizer = Suspended((_: Propless) => {
  const title = useId();
  const description = useId();
  const params = useSearchParams();
  const form = useRef<FormCTRL>(null);
  const replace = useReplaceSearchParams();
  const [open, setOpen] = useState(false);

  const clearForm = useCallback(() => {
    form?.current?.clear?.();
  }, []);

  const {
    onSubmit,
    resetState,
    setState: _setState,
    ...status
  } = useNetlifyForm(clearForm);

  const openSheet = useCallback(() => {
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    resetState();
    setTimeout(() => {
      clearForm();
      replace(p => p.delete("customizer"));
    }, 400);
  }, [replace, clearForm, resetState]);

  const toggle = useModalToggle(openSheet, close);

  useEffect(() => {
    const open = !!params.get("customizer");
    if (open && !toggle.isOpen) {
      toggle.open();
    } else if (!open && toggle.isOpen) {
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
      className="customizer-sheet"
      aria-labelledby={title}
      aria-describedby={description}>
      <Slider aria-label="Images of artwork">{GalleryImages}</Slider>
      <div className="form">
        <h2 id={title}>Customize</h2>
        <p id={description}>
          Custom pieces are our <strong>bread and butter</strong>. Let your mind
          run wild!
        </p>
        <Form ref={form} name="customize-request" onSubmit={onSubmit}>
          <input type="hidden" name="form-name" value="customize-request" />
          <Input required type="text" name="name" label="Your Name" />
          <Input required type="email" name="email" label="Your Email" />
          <Input
            required
            type="text"
            name="dimensions"
            label="Desired Dimensions"
          />
          <TextArea required name="details" label="Any other details" />
          <ModalFormFooter
            {...status}
            showStatus={showStatus}
            onClose={toggle.close}
            resetState={resetState}
            successText="Your request has been submitted"
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
      </div>
    </BottomSheet>
  );
});
