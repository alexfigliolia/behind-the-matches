"use client";
import {
  ForwardedRef,
  forwardRef,
  useCallback,
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
      <div className={classes}>
        <div>
          <Closer onClick={toggle.close} />
          <Check />
          <p>
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
