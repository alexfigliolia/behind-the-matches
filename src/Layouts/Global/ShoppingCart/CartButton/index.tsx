"use client";
import { useMemo } from "react";
import { Suspended } from "HOCs/Suspended";
import { useShoppingCart } from "Hooks/useShoppingCart";
import { useToggleShoppingCart } from "Hooks/useToggleShoppingCart";
import { ShoppingBag } from "Icons/ShoppingBag";
import { Propless } from "Types/React";
import "./styles.scss";

export const CartButton = Suspended((_: Propless) => {
  const cart = useShoppingCart();
  const { openCart } = useToggleShoppingCart();
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
});
