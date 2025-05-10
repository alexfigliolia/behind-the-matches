"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Stripe from "stripe";
import { AddToCartButton } from "Components/AddToCartButton";
import { BottomSheet } from "Components/BottomSheet";
import { Button } from "Components/Button";
import { ProductPrice } from "Components/ProductPrice";
import { Slider } from "Components/Slider";
import { useModalToggle } from "Hooks/useModalToggle";
import "./styles.scss";

export const ProductSheet = ({ product }: Props) => {
  const nav = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(product);

  const openSheet = useCallback(() => {
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete("product");
      const paramsString = nextParams.toString();
      nav.push(`/shop${paramsString.length ? `?${paramsString}` : ""}`, {
        scroll: false,
      });
    }, 400);
  }, [nav, searchParams]);

  const toggle = useModalToggle(openSheet, close);

  useEffect(() => {
    if (product && !toggle.isOpen) {
      toggle.open();
    } else if (!product) {
      toggle.close();
    }
  }, [product, toggle]);

  useEffect(() => {
    if (!product && selectedProduct) {
      setTimeout(() => setSelectedProduct(product), 400);
    } else {
      setSelectedProduct(product);
    }
  }, [product, selectedProduct]);

  return (
    <BottomSheet open={open} close={toggle.close} className="product-sheet">
      <Slider controls={(selectedProduct?.images?.length ?? 0) > 1}>
        {(selectedProduct?.images ?? []).map(img => (
          <div key={img}>
            <img src={img} alt={selectedProduct?.name ?? ""} />
          </div>
        ))}
      </Slider>
      <footer>
        <h2>{selectedProduct?.name ?? ""}</h2>
        <ProductPrice
          price={
            (selectedProduct?.default_price ?? {
              unit_amount: 0,
            }) as Stripe.Price
          }
        />
        <div>
          <Button text="Back" onClick={close} />
          <AddToCartButton productID={selectedProduct?.id as string} />
        </div>
      </footer>
    </BottomSheet>
  );
};

interface Props {
  product: Stripe.Product | undefined;
}
