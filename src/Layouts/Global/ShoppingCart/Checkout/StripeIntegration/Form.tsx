"use client";
import { FocusEvent, use, useCallback, useState } from "react";
import {
  AddressElement,
  PaymentElement,
  useCheckout,
} from "@stripe/react-stripe-js";
import { Input } from "Components/Input";
import { Propless } from "Types/React";
import { CheckoutContext } from "../Context";
import { Footer } from "./Footer";
import { useSubmitPayment } from "./useSubmitPayment";

export const Form = (_: Propless) => {
  const checkout = useCheckout();
  const onSubmit = useSubmitPayment();
  const [emailError, setEmailError] = useState("");
  const { toggle } = use(CheckoutContext);

  const onStripeReady = useCallback(() => {
    toggle.open();
  }, [toggle]);

  const onBlurEmail = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (value === "") {
        return setEmailError("");
      }
      void checkout.updateEmail(e.target.value).then(result => {
        if (result.type === "error") {
          setEmailError("A valid email address is required");
        } else {
          setEmailError("");
        }
      });
    },
    [checkout],
  );

  return (
    <form onSubmit={onSubmit}>
      <div className="padded">
        <h3>Confirmation Email</h3>
        <Input
          required
          type="email"
          label="Your Email"
          name="email"
          onBlur={onBlurEmail}>
          {emailError && (
            <div role="alert" className="input-error">
              {emailError}
            </div>
          )}
        </Input>
        <h3>Payment Details</h3>
        <PaymentElement
          options={{
            layout: "tabs",
            fields: {
              billingDetails: "auto",
            },
          }}
          onReady={onStripeReady}
        />
        <h3>Shipping Details</h3>
        <AddressElement options={{ mode: "shipping" }} />
        <h3>Billing Details</h3>
        <AddressElement options={{ mode: "billing" }} />
      </div>
      <Footer />
    </form>
  );
};
