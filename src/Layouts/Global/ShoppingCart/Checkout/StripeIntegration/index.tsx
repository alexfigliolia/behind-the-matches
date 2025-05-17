"use client";
import { use, useCallback, useMemo, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { BottomSheet } from "Components/BottomSheet";
import { Suspended } from "HOCs/Suspended";
import { Propless } from "Types/React";
import { CheckoutContext } from "../Context";
import { CheckoutPanel } from "./CheckoutPanel";
import { ConfirmationPanel } from "./ConfirmationPanel";
import "./styles.scss";

export const StripeIntegration = Suspended((_: Propless) => {
  const [heights, setHeights] = useState<number[]>([]);
  const { open, toggle, confirmation } = use(CheckoutContext);
  const classes = useClassNames("checkout-sheet", {
    slide: confirmation,
  });
  const height = useMemo(
    () => heights[confirmation ? 1 : 0] ?? undefined,
    [confirmation, heights],
  );

  const cacheHeight = useCallback(
    (index: number) => (height: number) =>
      setHeights(ps => {
        const copy = [...ps];
        copy[index] = height;
        return copy;
      }),
    [],
  );

  const cacheCheckoutHeight = useMemo(() => cacheHeight(0), [cacheHeight]);
  const cacheConfirmationHeight = useMemo(() => cacheHeight(1), [cacheHeight]);

  return (
    <BottomSheet open={open} className={classes} close={toggle.close}>
      <div className="translatable" style={{ height, maxHeight: height }}>
        <CheckoutPanel
          aria-hidden={confirmation}
          cacheHeight={cacheCheckoutHeight}
        />
        <ConfirmationPanel
          aria-hidden={!confirmation}
          cacheHeight={cacheConfirmationHeight}
        />
      </div>
    </BottomSheet>
  );
});
