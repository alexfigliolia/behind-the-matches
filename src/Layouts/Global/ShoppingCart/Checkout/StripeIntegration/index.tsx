"use client";
import { use, useCallback, useId } from "react";
import { CheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { BottomSheet } from "Components/BottomSheet";
import { Suspended } from "HOCs/Suspended";
import { useShoppingCart } from "Hooks/useShoppingCart";
import { Stripe } from "Tools/Stripe";
import { Propless } from "Types/React";
import { CheckoutContext } from "../Context";
import { Form } from "./Form";
import "./styles.scss";

const stripePromise = loadStripe(Stripe.publicAPIKey);

export const StripeIntegration = Suspended((_: Propless) => {
  const titleID = useId();
  const cartItems = useShoppingCart();
  const { open, toggle, checkingOut } = use(CheckoutContext);

  const fetchClientSecret = useCallback(() => {
    return Stripe.generateSession(cartItems);
  }, [cartItems]);

  return (
    <BottomSheet
      open={open}
      close={toggle.close}
      className="checkout-sheet"
      aria-labelledby={titleID}>
      <div className="padded">
        <h2 id={titleID}>Checkout</h2>
      </div>
      {checkingOut && (
        <CheckoutProvider
          stripe={stripePromise}
          options={{
            fetchClientSecret,
            elementsOptions: {
              fonts: [
                {
                  family: '"Funnel Display"',
                  cssSrc:
                    "https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&display=swap",
                  weight: "300",
                  style: "normal",
                  unicodeRange:
                    "U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215",
                },
              ],
              appearance: {
                variables: {
                  tabIconSelectedColor: "#319ff4",
                  focusOutline: "#319ff4",
                  colorPrimary: "#319ff4",
                  fontFamily: "Funnel Display, system-ui, sans-serif",
                },
              },
            },
          }}>
          <Form />
        </CheckoutProvider>
      )}
    </BottomSheet>
  );
});
