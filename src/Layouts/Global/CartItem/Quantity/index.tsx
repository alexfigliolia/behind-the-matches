"use client";
import { useCallback } from "react";
import { ChevronDown } from "Icons/ChevronDown";
import { ChevronUp } from "Icons/ChevronUp";
import { ShoppingCart } from "Tools/ShoppingCart";
import "./styles.scss";

export const Quantity = ({ quantity, productID }: Props) => {
  const increase = useCallback(() => {
    ShoppingCart.incrementItem(productID);
  }, [productID]);

  const decrease = useCallback(() => {
    ShoppingCart.decrementItem(productID);
  }, [productID]);

  return (
    <div className="quantity">
      <button onClick={decrease}>
        <ChevronDown aria-hidden />
      </button>
      <div>
        <div>{quantity}</div>
      </div>
      <button onClick={increase}>
        <ChevronUp aria-hidden />
      </button>
    </div>
  );
};

interface Props {
  quantity: number;
  productID: string;
}
