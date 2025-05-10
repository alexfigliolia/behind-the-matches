import { Suspense } from "react";
import IStripe from "stripe";
import { Stripe } from "Tools/Stripe";
import { Propless } from "Types/React";
import { Cart } from "./Cart";

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
    <Suspense>
      <Cart products={table} />
    </Suspense>
  );
};
