"use client";
import { useSearchParams } from "next/navigation";
import {
  Fragment,
  use,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { useClassNames } from "@figliolia/classnames";
import { Button } from "Components/Button";
import { Closer } from "Components/Closer";
import { ModalFormFooter } from "Components/ModalFormFooter";
import { Portal } from "Components/Portal";
import { SplitText } from "Components/SplitText";
import { Suspended } from "HOCs/Suspended";
import { useFocusTrap } from "Hooks/useFocusTrap";
import { useModalToggle } from "Hooks/useModalToggle";
import { useReplaceSearchParams } from "Hooks/useReplaceSearchParams";
import { useWindowSize } from "Hooks/useWindowSize";
import { CartItem } from "Layouts/Global/CartItem";
import { Propless } from "Types/React";
import { CheckoutContext } from "../Context";
import "./styles.scss";

export const Cart = Suspended((_: Propless) => {
  const titleID = useId();
  const params = useSearchParams();
  const replace = useReplaceSearchParams();
  const [_width, height] = useWindowSize();
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const { cartItems, cartTotal, elementsLoading, loadStripeCheckout } =
    use(CheckoutContext);

  const openCart = useCallback(() => {
    setOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      replace(p => p.delete("cart"));
    }, 400);
  }, [replace]);

  const toggle = useModalToggle(openCart, closeCart);

  useEffect(() => {
    const open = !!params.get("cart");
    if (open && !toggle.isOpen) {
      toggle.open();
    } else if (!open && toggle.isOpen) {
      toggle.close();
    }
  }, [params, toggle]);

  const classes = useClassNames("cart", { open });

  useFocusTrap(container.current, open);

  return (
    <Portal>
      <div
        role="dialog"
        ref={container}
        aria-hidden={!open}
        className={classes}
        aria-labelledby={titleID}
        style={{ minHeight: height }}>
        <div className="content">
          <div className="title">
            <Closer aria-label="Close Shopping Cart" onClick={toggle.close} />
            <h2 id={titleID} aria-label="Your Cart">
              <SplitText text="Your Cart" />
            </h2>
          </div>
          {!!cartItems.length ? (
            <ul>
              {cartItems.map(item => (
                <CartItem key={item.id} editable {...item} />
              ))}
            </ul>
          ) : (
            <div className="none">There are no items in your cart</div>
          )}
        </div>
        <ModalFormFooter
          className="total"
          error={false}
          success={false}
          onClose={() => {}}
          resetState={() => {}}
          loading={elementsLoading}
          showStatus={elementsLoading}
          loadingText="Coming Right Up"
          actions={
            <Fragment>
              <p>{cartTotal}</p>
              <Button
                text="Checkout"
                onClick={loadStripeCheckout}
                disabled={!cartItems.length}
              />
            </Fragment>
          }
        />
      </div>
    </Portal>
  );
});
