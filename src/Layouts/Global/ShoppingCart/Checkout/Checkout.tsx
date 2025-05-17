import Stripe from "stripe";
import { Cart } from "./Cart";
import { CheckoutProvider } from "./Context";
import { StripeIntegration } from "./StripeIntegration";

export const Checkout = ({ products }: Props) => {
  return (
    <CheckoutProvider products={products}>
      <Cart />
      <StripeIntegration />
    </CheckoutProvider>
  );
};

interface Props {
  products: Record<string, Stripe.Product>;
}
