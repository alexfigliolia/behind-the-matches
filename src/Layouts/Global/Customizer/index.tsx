"use client";
import { useSearchParams } from "next/navigation";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { BottomSheet } from "Components/BottomSheet";
import { Button } from "Components/Button";
import { Form, FormCTRL } from "Components/Form";
import { GalleryImages } from "Components/GalleryImages";
import { Input } from "Components/Input";
import { ModalFormFooter } from "Components/ModalFormFooter";
import { Slider } from "Components/Slider";
import { TextArea } from "Components/TextArea";
import { Suspended } from "HOCs/Suspended";
import { useModalToggle } from "Hooks/useModalToggle";
import { useNetlifyForm } from "Hooks/useNetlifyForm";
import { useReplaceSearchParams } from "Hooks/useReplaceSearchParams";
import { Propless } from "Types/React";
import "./styles.scss";

export const Customizer = Suspended((_: Propless) => {
  const params = useSearchParams();
  const form = useRef<FormCTRL>(null);
  const replace = useReplaceSearchParams();
  const [open, setOpen] = useState(false);

  const onSuccess = useCallback(() => {
    form?.current?.clear?.();
  }, []);

  const {
    onSubmit,
    resetState,
    setState: _setState,
    ...status
  } = useNetlifyForm(onSuccess);

  const openSheet = useCallback(() => {
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    resetState();
    setTimeout(() => {
      onSuccess();
      replace(p => p.delete("customizer"));
    }, 400);
  }, [replace, onSuccess, resetState]);

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
            onClose={toggle.close}
            resetState={resetState}
            successText="Your request has been submitted"
            showStatus={status.success || !!status.error || status.loading}
            actions={
              <Fragment>
                <Button type="button" text="Cancel" onClick={toggle.close} />
                <Button text="Submit" />
              </Fragment>
            }
          />
        </Form>
      </div>
    </BottomSheet>
  );
});
