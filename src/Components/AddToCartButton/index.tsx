"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Button } from "Components/Button";
import { ShoppingCart } from "Tools/ShoppingCart";

export const AddToCartButton = ({
  productID,
  disabled,
  text = "Add to Cart",
}: Props) => {
  const nav = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const addToCart = useCallback(() => {
    if (!productID) {
      return;
    }
    ShoppingCart.incrementItem(productID);
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("cart", "1");
    nav.push(`${pathname}?${nextParams.toString()}`, { scroll: false });
  }, [productID, nav, pathname, searchParams]);

  return <Button text={text} disabled={disabled} onClick={addToCart} />;
};

interface Props {
  text?: string;
  disabled?: boolean;
  productID: string;
}
