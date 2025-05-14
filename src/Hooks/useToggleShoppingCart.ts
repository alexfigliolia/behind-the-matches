import { useCallback } from "react";
import { useReplaceSearchParams } from "./useReplaceSearchParams";

export const useToggleShoppingCart = () => {
  const replace = useReplaceSearchParams();

  const openCart = useCallback(() => {
    replace(p => p.set("cart", "1"));
  }, [replace]);

  const closeCart = useCallback(() => {
    replace(p => p.delete("cart"));
  }, [replace]);

  return { openCart, closeCart };
};
