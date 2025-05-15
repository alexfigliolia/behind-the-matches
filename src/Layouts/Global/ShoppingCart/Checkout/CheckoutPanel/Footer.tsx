"use client";
import { Fragment, use, useMemo } from "react";
import { Button } from "Components/Button";
import { ModalFormFooter } from "Components/ModalFormFooter";
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
            disabled={hidePrimaryActions}
            onClick={toggle.close}
          />
          <Button text="Submit" disabled={hidePrimaryActions} />
        </Fragment>
      }
    />
  );
};

//  return (
//     <footer className={classes}>
//       <div>
//         <div
//           className="footer-panel action-panel"
//           aria-hidden={hidePrimaryActions}>
//           <div>
//             <Button
//               type="button"
//               text="Cancel"
//               disabled={hidePrimaryActions}
//               onClick={toggle.close}
//             />
//             <Button text="Submit" disabled={hidePrimaryActions} />
//           </div>
//         </div>
//         <div className="footer-panel status-panel">
//           <div>
//             <LoadingText aria-hidden={!!paymentError}>
//               Submitting Your Order
//             </LoadingText>
//             <div className="payment-error" aria-hidden={!paymentError}>
//               <p>
//                 <Alert />
//                 {paymentError}
//               </p>
//               <Button
//                 type="button"
//                 text="Try Again"
//                 disabled={!paymentError}
//                 onClick={resetPaymentStatus}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
