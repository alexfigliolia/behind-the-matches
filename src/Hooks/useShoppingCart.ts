import { useEffect, useState } from "react";
import { ShoppingCart } from "Tools/ShoppingCart";

export const useShoppingCart = () => {
  const [items, setItems] = useState<Record<string, number>>({});
  useEffect(() => {
    const ID = ShoppingCart.subscribe(cart => {
      if (cart) {
        setItems(cart);
      }
    });
    if (!ID) {
      return;
    }
    const cart = ShoppingCart.get();
    if (cart) {
      setItems(cart);
    }
    return () => {
      ShoppingCart.unsubscribe(ID);
    };
  }, []);

  return items;
};
