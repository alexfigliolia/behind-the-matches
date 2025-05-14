import Stripe from "stripe";

export interface CartProduct extends Stripe.Product {
  quantity: number;
}

export type ShippingDetails =
  Stripe.Checkout.Session.CollectedInformation.ShippingDetails;
