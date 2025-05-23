"use client";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import Stripe from "stripe";
import { useClassNames } from "@figliolia/classnames";
import { AddToCartButton } from "Components/AddToCartButton";
import { ButtonLink } from "Components/ButtonLink";
import { ProductPrice } from "Components/ProductPrice";
import { Slider } from "Components/Slider";
import { Suspended } from "HOCs/Suspended";
import "./styles.scss";

export const Product = Suspended(
  <T extends PartialProduct>({ product, disabled = false }: Props<T>) => {
    const searchParams = useSearchParams();
    const { id, name, images, default_price } = product;
    const classes = useClassNames("product", { disabled });
    const price = default_price as Stripe.Price;

    const nextPrams = useMemo(() => {
      const nextParms = new URLSearchParams(searchParams);
      nextParms.set("product", id);
      return nextParms.toString();
    }, [searchParams, id]);

    if (price.unit_amount === null) {
      return null;
    }

    return (
      <article className={classes}>
        <Slider controls={images.length > 1} aria-label={`Images of ${name}`}>
          {images.map(img => (
            <img key={img} src={img} alt={name} />
          ))}
        </Slider>
        <div className="meta">
          <h3>{name}</h3>
          <ProductPrice price={price} />
          <div>
            <ButtonLink
              shallow
              replace
              text="More"
              scroll={false}
              disabled={disabled}
              href={`/shop?${nextPrams}`}
            />
            <AddToCartButton productID={product.id} disabled={disabled} />
          </div>
        </div>
      </article>
    );
  },
);

interface Props<T extends PartialProduct> {
  disabled?: boolean;
  product: T;
}

type PartialProduct = Pick<
  Stripe.Product,
  "images" | "name" | "default_price" | "id"
>;
