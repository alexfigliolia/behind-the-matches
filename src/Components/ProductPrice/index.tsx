import { HTMLAttributes } from "react";
import Stripe from "stripe";
import { classnames } from "@figliolia/classnames";
import { Currency } from "Tools/Currency";
import "./styles.scss";

export const ProductPrice = ({ price, className, ...rest }: Props) => {
  const unitPrice = price as Stripe.Price;
  if (unitPrice.unit_amount === null) {
    return null;
  }
  return (
    <p className={classnames("product-price", className)} {...rest}>
      ${Currency.format(unitPrice.unit_amount / 100)}
    </p>
  );
};

interface Props extends HTMLAttributes<HTMLParagraphElement> {
  price: Stripe.Price;
}
