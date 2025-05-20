import { FormEvent, use, useCallback } from "react";
import { useCheckout } from "@stripe/react-stripe-js";
import { CheckoutContext } from "../Context";

export const useSubmitPayment = () => {
  const { confirm } = useCheckout();
  const { setState, activatePaymentStatus } = use(CheckoutContext);

  return useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      activatePaymentStatus();
      confirm()
        .then(result => {
          if (result.type === "error") {
            if (!!result.error.code) {
              setState(ps => ({ ...ps, paymentError: result.error.message }));
            }
            setState(ps => ({ ...ps, paymentLoading: false }));
          }
        })
        .catch(() => {
          setState(ps => ({
            ...ps,
            paymentLoading: false,
            paymentError: "Something went wrong. Please try again",
          }));
        });
    },
    [confirm, setState, activatePaymentStatus],
  );
};
