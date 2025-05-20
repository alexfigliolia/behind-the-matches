import Stripe from "stripe";
import { Cart } from "./Cart";
import { Confirmation } from "./Confirmation";
import { CheckoutProvider } from "./Context";
import { StripeIntegration } from "./StripeIntegration";

export const Checkout = ({ products }: Props) => {
  return (
    <CheckoutProvider products={products}>
      <Cart />
      <StripeIntegration />
      <Confirmation />
    </CheckoutProvider>
  );
};

interface Props {
  products: Record<string, Stripe.Product>;
}
