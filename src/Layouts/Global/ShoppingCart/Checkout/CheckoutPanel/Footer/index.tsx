"use client";
import { use, useMemo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Button } from "Components/Button";
import { Alert } from "Icons/Alert";
import { CheckoutContext } from "Layouts/Global/ShoppingCart/Context";
import { Propless } from "Types/React";
import "./styles.scss";

export const Footer = (_: Propless) => {
  const {
    toggle,
    paymentError,
    paymentLoading,
    showPaymentStatus,
    resetPaymentStatus,
  } = use(CheckoutContext);

  const classes = useClassNames("checkout-footer", {
    error: !!paymentError,
    showStatus: showPaymentStatus,
  });

  const hidePrimaryActions = useMemo(
    () => paymentLoading || !!paymentError,
    [paymentLoading, paymentError],
  );

  return (
    <footer className={classes}>
      <div>
        <div
          className="footer-panel action-panel"
          aria-hidden={hidePrimaryActions}>
          <div>
            <Button
              type="button"
              text="Cancel"
              disabled={hidePrimaryActions}
              onClick={toggle.close}
            />
            <Button text="Submit" disabled={hidePrimaryActions} />
          </div>
        </div>
        <div className="footer-panel status-panel">
          <div>
            <p aria-hidden={!!paymentError}>Submitting Your Order</p>
            <div className="payment-error" aria-hidden={!paymentError}>
              <p>
                <Alert />
                {paymentError}
              </p>
              <Button
                type="button"
                text="Try Again"
                disabled={!paymentError}
                onClick={resetPaymentStatus}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
