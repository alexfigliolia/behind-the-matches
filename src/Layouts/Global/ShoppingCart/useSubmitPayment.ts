import { FormEvent, use, useCallback } from "react";
import { useCheckout } from "@stripe/react-stripe-js";
import { CheckoutContext } from "./Context";

export const useSubmitPayment = () => {
  const { confirm } = useCheckout();
  const { setPaymentError, setPaymentLoading, activatePaymentStatus } =
    use(CheckoutContext);

  return useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      activatePaymentStatus();
      confirm()
        .then(result => {
          if (result.type === "error") {
            if (!!result.error.code) {
              setPaymentError(result.error.message);
            }
            setPaymentLoading(false);
          }
        })
        .catch(() => {
          setPaymentLoading(false);
          setPaymentError("Something went wrong. Please try again");
        });
    },
    [confirm, setPaymentLoading, setPaymentError, activatePaymentStatus],
  );
};
