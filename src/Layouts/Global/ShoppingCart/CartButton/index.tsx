"use client";
import { useMemo } from "react";
import { useOpenCart } from "Hooks/useOpenCart";
import { useShoppingCart } from "Hooks/useShoppingCart";
import { ShoppingBag } from "Icons/ShoppingBag";
import { Propless } from "Types/React";
import "./styles.scss";

export const CartButton = (_: Propless) => {
  const cart = useShoppingCart();
  const openCart = useOpenCart();
  const total = useMemo(
    () =>
      Object.values(cart).reduce((acc, next) => {
        acc += next;
        return acc;
      }, 0),
    [cart],
  );
  if (total === 0) {
    return null;
  }
  return (
    <button
      onClick={openCart}
      className="cart-button"
      aria-label="Shopping Cart">
      <ShoppingBag aria-hidden />
      <div>{total}</div>
    </button>
  );
};
