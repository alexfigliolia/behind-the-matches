"use client";
import { useCallback } from "react";
import { Button } from "Components/Button";
import { useOpenCart } from "Hooks/useOpenCart";
import { ShoppingCart } from "Tools/ShoppingCart";

export const AddToCartButton = ({
  productID,
  disabled,
  text = "Add to Cart",
}: Props) => {
  const openCart = useOpenCart();
  const addToCart = useCallback(() => {
    if (!productID) {
      return;
    }
    ShoppingCart.incrementItem(productID);
    openCart();
  }, [productID, openCart]);

  return <Button text={text} disabled={disabled} onClick={addToCart} />;
};

interface Props {
  text?: string;
  disabled?: boolean;
  productID: string;
}
