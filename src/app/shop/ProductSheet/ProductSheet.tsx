"use client";
import { useCallback, useEffect, useState } from "react";
import Stripe from "stripe";
import { AddToCartButton } from "Components/AddToCartButton";
import { BottomSheet } from "Components/BottomSheet";
import { Button } from "Components/Button";
import { ProductPrice } from "Components/ProductPrice";
import { Slider } from "Components/Slider";
import { Suspended } from "HOCs/Suspended";
import { useModalToggle } from "Hooks/useModalToggle";
import { useReplaceSearchParams } from "Hooks/useReplaceSearchParams";
import "./styles.scss";

export const ProductSheet = Suspended(({ product }: Props) => {
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
    <BottomSheet open={open} close={toggle.close} className="product-sheet">
      <Slider controls={(selectedProduct?.images?.length ?? 0) > 1}>
        {(selectedProduct?.images ?? []).map(img => (
          <div key={img}>
            <img src={img} alt={selectedProduct?.name ?? ""} />
          </div>
        ))}
      </Slider>
      <footer>
        <div className="meta">
          <h2>{selectedProduct?.name ?? ""}</h2>
          {selectedProduct?.description && <p>{selectedProduct.description}</p>}
          <div className="price">
            <ProductPrice
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
      </footer>
    </BottomSheet>
  );
});

interface Props {
  product: Stripe.Product | undefined;
}
