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
      <button
        onClick={decrease}
        aria-label="reduce quantity of this item by one">
        <ChevronDown aria-hidden />
      </button>
      <div>
        <div>{quantity}</div>
      </div>
      <button
        onClick={increase}
        aria-label="increase quantity of this item by one">
        <ChevronUp aria-hidden />
      </button>
    </div>
  );
};

interface Props {
  quantity: number;
  productID: string;
}
