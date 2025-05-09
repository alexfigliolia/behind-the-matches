"use client";
import Stripe from "stripe";
import { useClassNames } from "@figliolia/classnames";
import { Button } from "Components/Button";
import { ButtonLink } from "Components/ButtonLink";
import { ProductPrice } from "Components/ProductPrice";
import { Slider } from "Components/Slider";
import "./styles.scss";

export const Product = <T extends Props>({
  id,
  images,
  name,
  disabled = false,
  default_price,
}: T) => {
  const classes = useClassNames("product", { disabled });
  const price = default_price as Stripe.Price;
  if (price.unit_amount === null) {
    return null;
  }
  return (
    <article className={classes}>
      <Slider controls={images.length > 1}>
        {images.map(img => (
          <div key={img}>
            <img src={img} alt={name} />
          </div>
        ))}
      </Slider>
      <div className="meta">
        <h3>{name}</h3>
        <ProductPrice price={price} />
        <div>
          <ButtonLink
            shallow
            scroll={false}
            href={`/shop?product=${id}`}
            disabled={disabled}
            text="More"
          />
          <Button disabled={disabled} text="Buy Now" onClick={() => {}} />
        </div>
      </div>
    </article>
  );
};

interface Props
  extends Pick<Stripe.Product, "images" | "name" | "default_price" | "id"> {
  disabled?: boolean;
}
