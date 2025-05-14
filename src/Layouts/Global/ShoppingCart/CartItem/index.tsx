import { useMemo } from "react";
import Stripe from "stripe";
import { Slider } from "Components/Slider";
import { Currency } from "Tools/Currency";
import { Quantity } from "./Quantity";
import "./styles.scss";

export const CartItem = ({
  id,
  images,
  name,
  editable,
  quantity,
  description,
  default_price,
}: Props) => {
  const total = useMemo(
    () => ((default_price as Stripe.Price).unit_amount ?? 0) * quantity,
    [default_price, quantity],
  );
  return (
    <li key={id} className="cart-item">
      <div className="display">
        <Slider controls={false}>
          {images.map(img => (
            <div key={img}>
              <img src={img} alt={name} />
            </div>
          ))}
        </Slider>
        <div className="meta">
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      </div>
      <div className="actions">
        {editable ? (
          <Quantity productID={id} quantity={quantity} />
        ) : (
          <p>
            <span>Total: {quantity}</span>
          </p>
        )}
        <p>
          <span>${Currency.format(total / 100)}</span>
        </p>
      </div>
    </li>
  );
};

interface Props extends Stripe.Product {
  quantity: number;
  editable?: boolean;
}
