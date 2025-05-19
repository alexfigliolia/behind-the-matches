"use client";
import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useId,
  useImperativeHandle,
  useState,
} from "react";
import { useClassNames } from "@figliolia/classnames";
import { ModalToggle } from "@figliolia/modal-stack";
import { Closer } from "Components/Closer";
import { Portal } from "Components/Portal";
import { useModalToggle } from "Hooks/useModalToggle";
import { Check } from "Icons/Check";
import { Callback } from "Types/Generics";
import "./styles.scss";

export const Notification = forwardRef(function Notification(
  { onHide }: Props,
  ref: ForwardedRef<ModalToggle>,
) {
  const message = useId();
  const [visible, setVisible] = useState(false);

  const show = useCallback(() => {
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
    onHide?.();
  }, [onHide]);

  const toggle = useModalToggle(show, hide);

  useImperativeHandle(ref, () => toggle, [toggle]);

  const classes = useClassNames("notification", { visible });
  return (
    <Portal>
      <div className={classes} role="dialog" aria-describedby={message}>
        <div>
          <Closer onClick={toggle.close} aria-label="Dismiss Notification" />
          <Check aria-hidden />
          <p id={message} role="alert" aria-live="polite">
            <strong>Success!</strong> Someone from our team will reach out to
            you soon.
          </p>
        </div>
      </div>
    </Portal>
  );
});

interface Props {
  onHide?: Callback;
}
