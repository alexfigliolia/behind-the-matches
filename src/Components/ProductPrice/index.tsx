import Stripe from "stripe";
import { Currency } from "Tools/Currency";
import "./styles.scss";

export const ProductPrice = ({ price }: Props) => {
  const unitPrice = price as Stripe.Price;
  if (unitPrice.unit_amount === null) {
    return null;
  }
  return (
    <p className="product-price">
      ${Currency.format(unitPrice.unit_amount / 100)}
    </p>
  );
};

interface Props {
  price: Stripe.Price;
}
