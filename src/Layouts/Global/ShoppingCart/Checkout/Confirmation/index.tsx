"use client";
import { useSearchParams } from "next/navigation";
import { Fragment, use, useCallback, useEffect, useId, useState } from "react";
import { BottomSheet } from "Components/BottomSheet";
import { Closer } from "Components/Closer";
import { Suspended } from "HOCs/Suspended";
import { useModalToggle } from "Hooks/useModalToggle";
import { useReplaceSearchParams } from "Hooks/useReplaceSearchParams";
import { CartItem } from "Layouts/Global/CartItem";
import { ShoppingCart } from "Tools/ShoppingCart";
import { Stripe } from "Tools/Stripe";
import { ShippingDetails } from "Types/Checkout";
import { Propless } from "Types/React";
import { CheckoutContext } from "../Context";
import "./styles.scss";

const INITIAL_STATE: State = {
  email: null,
  open: false,
  orderId: "",
  shippingAddress: null,
};

export const Confirmation = Suspended((_: Propless) => {
  const titleID = useId();
  const descriptionID = useId();
  const searchParams = useSearchParams();
  const replace = useReplaceSearchParams();
  const [state, setState] = useState<State>(INITIAL_STATE);
  const { cartItems, cartTotal } = use(CheckoutContext);

  const openConfirmation = useCallback(() => {
    setState(ps => ({ ...ps, open: true }));
  }, []);

  const closeConfirmation = useCallback(() => {
    setState(ps => ({ ...ps, open: false }));
    setTimeout(() => {
      ShoppingCart.clearCart();
      replace(p => {
        p.delete("cart");
        p.delete("session_id");
      });
      setState(INITIAL_STATE);
    }, 300);
  }, [replace]);

  const toggle = useModalToggle(openConfirmation, closeConfirmation);

  useEffect(() => {
    const session_id = searchParams.get("session_id");
    if (!session_id) {
      return;
    }
    void Stripe.checkPaymentStatus(session_id).then(
      ({ success, email, order_id, shippingDetails }) => {
        if (success) {
          setState(ps => ({
            ...ps,
            email,
            orderId: order_id,
            shippingAddress: shippingDetails,
          }));
          toggle.open();
        }
      },
    );
  }, [searchParams, toggle]);

  const { open, orderId, email, shippingAddress } = state;

  return (
    <BottomSheet
      open={open}
      close={toggle.close}
      className="confirmation-sheet"
      aria-labelledby={titleID}
      aria-describedby={descriptionID}>
      <Closer onClick={toggle.close} aria-label="Close Window" />
      <h2 id={titleID}>Success!</h2>
      <p id={descriptionID}>Your order is on its way!</p>
      <div className="order-number">
        <div>Order:&nbsp;&nbsp;{orderId}</div>
      </div>
      <div className="order-summary">
        <div className="items">
          <h3 className="summary-item">Your Order:</h3>
          <ul>
            {cartItems.map(item => (
              <CartItem key={item.id} {...item} />
            ))}
          </ul>
          <div>
            <p>Order Total:</p>
            <p>{cartTotal}</p>
          </div>
        </div>
        {shippingAddress && (
          <div className="shipping-to">
            <h3 className="summary-item">Shipping To:</h3>
            <address>
              <div>
                <p>
                  <strong>Name:</strong>
                </p>
                <p>{shippingAddress.name}</p>
              </div>
              <div>
                <p>
                  <strong>Address:</strong>
                </p>
                <p>
                  {shippingAddress.address.line1}
                  {shippingAddress.address.line2 && (
                    <Fragment>
                      <br />
                      {shippingAddress.address.line2}
                    </Fragment>
                  )}
                  <br />
                  {shippingAddress.address.city},{" "}
                  {shippingAddress.address.state}
                  <br />
                  {shippingAddress.address.postal_code}
                </p>
              </div>
              {email && (
                <div>
                  <p>
                    <strong>Email:</strong>
                  </p>
                  <p>{email}</p>
                </div>
              )}
            </address>
          </div>
        )}
      </div>
    </BottomSheet>
  );
});

interface State {
  email: string | null;
  open: boolean;
  orderId: string;
  shippingAddress: ShippingDetails | null;
}
