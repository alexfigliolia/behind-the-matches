"use client";
import { useCallback } from "react";
import { Button } from "Components/Button";
import { Suspended } from "HOCs/Suspended";
import { useToggleShoppingCart } from "Hooks/useToggleShoppingCart";
import { ShoppingCart } from "Tools/ShoppingCart";

export const AddToCartButton = Suspended(
  ({ productID, disabled, text = "Add to Cart" }: Props) => {
    const { openCart } = useToggleShoppingCart();
    const addToCart = useCallback(() => {
      if (!productID) {
        return;
      }
      ShoppingCart.incrementItem(productID);
      openCart();
    }, [productID, openCart]);

    return <Button text={text} disabled={disabled} onClick={addToCart} />;
  },
);

interface Props {
  text?: string;
  disabled?: boolean;
  productID: string;
}
