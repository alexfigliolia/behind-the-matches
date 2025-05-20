"use client";
import { Fragment, use, useMemo } from "react";
import { Button } from "Components/Button";
import { ModalFormFooter } from "Components/ModalFormFooter";
import { CheckoutContext } from "Layouts/Global/ShoppingCart/Checkout/Context";
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

  const hidePrimaryActions = useMemo(
    () => paymentLoading || !!paymentError,
    [paymentLoading, paymentError],
  );

  return (
    <ModalFormFooter
      success={false}
      onClose={() => {}}
      error={paymentError}
      loading={paymentLoading}
      showStatus={showPaymentStatus}
      resetState={resetPaymentStatus}
      loadingText="Submitting Your Order"
      actions={
        <Fragment>
          <Button
            type="button"
            text="Cancel"
            onClick={toggle.close}
            disabled={hidePrimaryActions || showPaymentStatus}
          />
          <Button
            text="Submit"
            disabled={hidePrimaryActions || showPaymentStatus}
          />
        </Fragment>
      }
    />
  );
};
