"use client";
import { useCallback, useEffect, useId, useState } from "react";
import Stripe from "stripe";
import { useModalToggle } from "@figliolia/modal-stack";
import { AddToCartButton } from "Components/AddToCartButton";
import { BottomSheet } from "Components/BottomSheet";
import { Button } from "Components/Button";
import { ProductPrice } from "Components/ProductPrice";
import { Slider } from "Components/Slider";
import { Suspended } from "HOCs/Suspended";
import { useReplaceSearchParams } from "Hooks/useReplaceSearchParams";
import "./styles.scss";

export const ProductSheet = Suspended(({ product }: Props) => {
  const title = useId();
  const priceID = useId();
  const description = useId();
  const [open, setOpen] = useState(false);
  const replace = useReplaceSearchParams();
  const [selectedProduct, setSelectedProduct] = useState(product);

  const openSheet = useCallback(() => {
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      replace(p => p.delete("product"));
    }, 400);
  }, [replace]);

  const toggle = useModalToggle(openSheet, close);

  useEffect(() => {
    if (product && !toggle.isOpen) {
      toggle.open();
    } else if (!product && toggle.isOpen) {
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
    <BottomSheet
      open={open}
      toggle={toggle}
      className="product-sheet"
      aria-labelledby={title}
      aria-describedby={selectedProduct?.description ? description : priceID}>
      <Slider
        controls={(selectedProduct?.images?.length ?? 0) > 1}
        aria-label={`Images of "${selectedProduct?.name ?? "this artwork"}"`}>
        {(selectedProduct?.images ?? []).map(img => (
          <img key={img} src={img} alt={selectedProduct?.name ?? ""} />
        ))}
      </Slider>
      <div className="product-sheet-footer">
        <div className="meta">
          <h2 id={title}>{selectedProduct?.name ?? ""}</h2>
          {selectedProduct?.description && (
            <p id={description}>{selectedProduct.description}</p>
          )}
          <div className="price">
            <ProductPrice
              id={priceID}
              price={
                (selectedProduct?.default_price ?? {
                  unit_amount: 0,
                }) as Stripe.Price
              }
            />
          </div>
        </div>
        <div className="actions">
          <Button text="Back" onClick={close} />
          <AddToCartButton productID={selectedProduct?.id as string} />
        </div>
      </div>
    </BottomSheet>
  );
});

interface Props {
  product: Stripe.Product | undefined;
}
