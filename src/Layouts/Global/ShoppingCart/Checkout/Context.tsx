"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import IStripe from "stripe";
import { ModalToggle } from "@figliolia/modal-stack";
import { Suspended } from "HOCs/Suspended";
import { useModalToggle } from "Hooks/useModalToggle";
import { useShoppingCart } from "Hooks/useShoppingCart";
import { Currency } from "Tools/Currency";
import { ModalStack } from "Tools/ModalStack";
import { CartProduct } from "Types/Checkout";
import { Callback } from "Types/Generics";
import { OptionalChildren } from "Types/React";

const INITIAL_STATE: UIState = {
  open: false,
  elementsLoading: false,
  checkingOut: false,
  paymentError: "",
  paymentLoading: false,
  showPaymentStatus: false,
};

export const CheckoutContext = createContext<ICheckoutContext>({
  products: {},
  cartItems: [],
  cartTotal: "0.00",
  ...INITIAL_STATE,
  setState: () => {},
  toggle: ModalStack.create(
    () => {},
    () => {},
  ),
  loadStripeCheckout: () => {},
  resetPaymentStatus: () => {},
  activatePaymentStatus: () => {},
});

export const CheckoutProvider = Suspended(({ children, products }: Props) => {
  const productsInCart = useShoppingCart();
  const [state, setState] = useState(INITIAL_STATE);

  const loadStripeCheckout = useCallback(() => {
    setState(ps => ({
      ...ps,
      checkingOut: true,
      elementsLoading: true,
    }));
  }, []);

  const openCheckout = useCallback(() => {
    setState(ps => ({ ...ps, open: true, elementsLoading: false }));
  }, []);

  const closeCheckout = useCallback(() => {
    setState(ps => ({ ...ps, open: false }));
    setTimeout(() => {
      setState(INITIAL_STATE);
    }, 300);
  }, []);

  const resetPaymentStatus = useCallback(() => {
    setState(ps => ({ ...ps, showPaymentStatus: false }));
    setTimeout(() => {
      setState(ps => ({ ...ps, paymentLoading: false, paymentError: "" }));
    }, 500);
  }, []);

  const activatePaymentStatus = useCallback(() => {
    setState(ps => ({
      ...ps,
      paymentError: "",
      paymentLoading: true,
      showPaymentStatus: true,
    }));
  }, []);

  const toggle = useModalToggle(openCheckout, closeCheckout);

  const cartData = useMemo(() => {
    let total = 0;
    const cartItems: CartProduct[] = [];
    for (const id in productsInCart) {
      if (!products?.[id]) {
        continue;
      }
      const product = products[id];
      const quantity = productsInCart[id];
      cartItems.push({ ...product, quantity });
      total +=
        ((product.default_price as IStripe.Price)?.unit_amount ?? 0) *
        productsInCart[id];
    }
    return {
      cartItems,
      cartTotal: `$${Currency.format(total === 0 ? 0 : total / 100)}`,
    };
  }, [productsInCart, products]);

  const value = useMemo(
    () => ({
      ...state,
      ...cartData,
      setState,
      toggle,
      products,
      loadStripeCheckout,
      resetPaymentStatus,
      activatePaymentStatus,
    }),
    [
      state,
      toggle,
      cartData,
      products,
      loadStripeCheckout,
      resetPaymentStatus,
      activatePaymentStatus,
    ],
  );
  return <CheckoutContext value={value}>{children}</CheckoutContext>;
});

interface Props extends OptionalChildren {
  products: Record<string, IStripe.Product>;
}

interface ICheckoutContext extends UIState {
  cartTotal: string;
  cartItems: CartProduct[];
  toggle: ModalToggle<never[]>;
  loadStripeCheckout: Callback;
  resetPaymentStatus: Callback;
  activatePaymentStatus: Callback;
  products: Record<string, IStripe.Product>;
  setState: Dispatch<SetStateAction<UIState>>;
}

interface UIState {
  open: boolean;
  checkingOut: boolean;
  paymentError: string;
  paymentLoading: boolean;
  elementsLoading: boolean;
  showPaymentStatus: boolean;
}
