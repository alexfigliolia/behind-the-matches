import { Fragment } from "react";
import IStripe from "stripe";
import { Stripe } from "Tools/Stripe";
import { Propless } from "Types/React";
import { CartButton } from "./CartButton";
import { Checkout } from "./Checkout";

export const ShoppingCart = async (_: Propless) => {
  const products = await Stripe.getClient().products.list({
    active: true,
    limit: 100,
    expand: ["data.default_price"],
  });
  const table: Record<string, IStripe.Product> = {};
  for (const product of products.data) {
    table[product.id] = product;
  }
  return (
    <Fragment>
      <CartButton />
      <Checkout products={table} />
    </Fragment>
  );
};
