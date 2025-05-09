"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Stripe from "stripe";
import { AddToCartButton } from "Components/AddToCartButton";
import { BottomSheet } from "Components/BottomSheet";
import { Button } from "Components/Button";
import { ProductPrice } from "Components/ProductPrice";
import { Slider } from "Components/Slider";
import "./styles.scss";

export const ProductSheet = ({ product }: Props) => {
  const [open, setOpen] = useState(false);
  const nav = useRouter();

  useEffect(() => {
    if (product) {
      setOpen(true);
    }
  }, [product]);

  const close = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      nav.push("/shop", { scroll: false });
    }, 400);
  }, [nav]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    },
    [close],
  );

  useEffect(() => {
    if (!open) {
      return;
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onKeyDown]);

  return (
    <BottomSheet open={open} close={close} className="product-sheet">
      <Slider controls={(product?.images?.length ?? 0) > 1}>
        {(product?.images ?? []).map(img => (
          <div key={img}>
            <img src={img} alt={product?.name ?? ""} />
          </div>
        ))}
      </Slider>
      <footer>
        <h2>{product?.name ?? ""}</h2>
        <ProductPrice
          price={
            (product?.default_price ?? {
              unit_amount: 0,
            }) as Stripe.Price
          }
        />
        <div>
          <Button text="Back" onClick={close} />
          <AddToCartButton />
        </div>
      </footer>
    </BottomSheet>
  );
};

interface Props {
  product: Stripe.Product | undefined;
}
