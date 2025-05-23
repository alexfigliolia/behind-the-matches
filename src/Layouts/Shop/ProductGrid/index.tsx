import { useMemo } from "react";
import Stripe from "stripe";
import { Product } from "./Product";
import "./styles.scss";

const EMPTY_PRODUCT = {
  name: "Coming Soon",
  images: ["/coming-soon.jpg"],
  default_price: { unit_amount: 0 },
} as const;

export const ProductGrid = ({ products, min = 3 }: Props) => {
  const fill = useMemo(
    () => new Array(Math.max(min - products.length, 0)).fill(null),
    [products.length, min],
  );
  return (
    <section className="product-grid">
      {products.map(product => {
        const price = product.default_price as Stripe.Price;
        if (!price.unit_amount) {
          return null;
        }
        return <Product key={product.id} product={product} />;
      })}
      {fill.map((_, i) => {
        return (
          <Product
            key={i}
            disabled
            // @ts-ignore
            product={EMPTY_PRODUCT}
          />
        );
      })}
    </section>
  );
};

interface Props {
  min?: number;
  products: Stripe.Product[];
}
