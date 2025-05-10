"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import Stripe from "stripe";
import { useClassNames } from "@figliolia/classnames";
import { Button } from "Components/Button";
import { Portal } from "Components/Portal";
import { SplitText } from "Components/SplitText";
import { useModalToggle } from "Hooks/useModalToggle";
import { useShoppingCart } from "Hooks/useShoppingCart";
import { useWindowSize } from "Hooks/useWindowSize";
import { Currency } from "Tools/Currency";
import { CartItem } from "./CartItem";
import "./styles.scss";

export const Cart = ({ products }: Props) => {
  const nav = useRouter();
  const cartItems = useShoppingCart();
  const [_width, height] = useWindowSize();
  const [open, setOpen] = useState(false);
  const params = useSearchParams();
  const pathName = usePathname();

  const openCart = useCallback(() => {
    setOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      const nextParams = new URLSearchParams(params);
      nextParams.delete("cart");
      const paramsString = nextParams.toString();
      nav.push(`${pathName}${paramsString.length ? `?${paramsString}` : ""}`, {
        scroll: false,
      });
    }, 400);
  }, [nav, pathName, params]);

  const toggle = useModalToggle(openCart, closeCart);

  useEffect(() => {
    const open = !!params.get("cart");
    if (open && !toggle.isOpen) {
      toggle.open();
    } else if (!open) {
      toggle.close();
    }
  }, [params, toggle]);

  const total = useMemo(() => {
    let total = 0;
    for (const id in cartItems) {
      total +=
        ((products?.[id]?.default_price as Stripe.Price)?.unit_amount ?? 0) *
        cartItems[id];
    }
    return `$${Currency.format(total === 0 ? 0 : total / 100)}`;
  }, [cartItems, products]);

  const itemKeys = useMemo(() => Object.keys(cartItems), [cartItems]);

  const classes = useClassNames("cart", { open });

  // const node = useClickOutside<HTMLDivElement, false>({
  //   open,
  //   refCallback: false,
  //   callback: toggle.close,
  // });

  return (
    <Portal>
      <div
        // ref={node}
        role="dialog"
        aria-hidden={!open}
        className={classes}
        style={{ minHeight: height }}>
        <div className="content">
          <SplitText Tag="h2" text="Your Cart" />
          {!!itemKeys.length ? (
            <ul>
              {itemKeys.map(id => {
                if (id in products) {
                  return (
                    <CartItem
                      key={id}
                      {...products[id]}
                      quantity={cartItems[id]}
                    />
                  );
                }
                return null;
              })}
            </ul>
          ) : (
            <div className="none">There are no items in your cart</div>
          )}
        </div>
        <div className="total">
          <p>{total}</p>
          <Button text="Checkout" disabled={!itemKeys.length} />
        </div>
      </div>
    </Portal>
  );
};

interface Props {
  products: Record<string, Stripe.Product>;
}
