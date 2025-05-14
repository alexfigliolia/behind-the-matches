"use client";
import { useSearchParams } from "next/navigation";
import {
  createContext,
  type Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import IStripe from "stripe";
import { ModalToggle } from "@figliolia/modal-stack";
import { Suspended } from "HOCs/Suspended";
import { useModalToggle } from "Hooks/useModalToggle";
import { useReplaceSearchParams } from "Hooks/useReplaceSearchParams";
import { useShoppingCart } from "Hooks/useShoppingCart";
import { Currency } from "Tools/Currency";
import { ModalStack } from "Tools/ModalStack";
import { ShoppingCart } from "Tools/ShoppingCart";
import { Stripe } from "Tools/Stripe";
import { Callback } from "Types/Generics";
import { OptionalChildren } from "Types/React";

const EMPTY_ADDRESS = {
  name: "Alex Figliolia",
  address: {
    line1: "600 El Camino Real",
    line2: "Unit 202",
    city: "Belmont",
    state: "California",
    postal_code: "94002",
    country: "US",
  },
  phone: "",
} satisfies ShippingAddress;

export const CheckoutContext = createContext<ICheckoutContext>({
  open: false,
  email: "",
  orderId: "",
  products: {},
  cartItems: [],
  cartTotal: "0.00",
  checkingOut: false,
  paymentError: "",
  shippingAddress: EMPTY_ADDRESS,
  paymentLoading: false,
  confirmation: false,
  showPaymentStatus: false,
  setEmail: () => {},
  activatePaymentStatus: () => {},
  setPaymentError: () => {},
  setPaymentLoading: () => {},
  setShippingAddress: () => {},
  resetPaymentStatus: () => {},
  toggle: ModalStack.create(
    () => {},
    () => {},
  ),
});

export const CheckoutProvider = Suspended(({ children, products }: Props) => {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const productsInCart = useShoppingCart();
  const replace = useReplaceSearchParams();
  const [email, setEmail] = useState("alexfigliolia@gmail.com");
  const [orderId, setOrderId] = useState("asdfas_asd213123123123");
  const [confirmation, setConfirmation] = useState(true);
  const [shippingAddress, setShippingAddress] =
    useState<ShippingAddress>(EMPTY_ADDRESS);
  const [paymentError, setPaymentError] = useState("");
  const [checkingOut, activateCheckout] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [showPaymentStatus, setShowPaymentStatus] = useState(false);

  const openCheckout = useCallback(() => {
    setOpen(true);
    activateCheckout(true);
  }, [setOpen]);

  const closeCheckout = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      setEmail("");
      setOrderId("");
      setConfirmation(false);
      activateCheckout(false);
      setPaymentError("");
      setPaymentLoading(false);
      setShippingAddress(EMPTY_ADDRESS);
      if (confirmation) {
        ShoppingCart.clearCart();
        replace(p => {
          p.delete("cart");
          p.delete("session_id");
        });
      }
    }, 300);
  }, [confirmation, replace]);

  const resetPaymentStatus = useCallback(() => {
    setShowPaymentStatus(false);
    setTimeout(() => {
      setPaymentLoading(false);
      setPaymentError("");
    }, 500);
  }, []);

  const activatePaymentStatus = useCallback(() => {
    setShowPaymentStatus(true);
    setPaymentLoading(true);
    setPaymentError("");
  }, []);

  const toggle = useModalToggle(openCheckout, closeCheckout);

  useEffect(() => {
    const session_id = searchParams.get("session_id");
    if (!session_id) {
      return;
    }
    void Stripe.checkPaymentStatus(session_id)
      .then(({ success, order_id }) => {
        if (success) {
          setOrderId(order_id);
          setConfirmation(true);
          setOpen(true);
        }
      })
      .finally(() => setPaymentLoading(false));
  }, [searchParams]);

  const { cartTotal, cartItems } = useMemo(() => {
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
      open,
      email,
      toggle,
      orderId,
      setEmail,
      cartItems,
      cartTotal,
      products,
      checkingOut,
      paymentError,
      confirmation,
      shippingAddress,
      paymentLoading,
      showPaymentStatus,
      setPaymentError,
      setPaymentLoading,
      setShippingAddress,
      resetPaymentStatus,
      activatePaymentStatus,
    }),
    [
      open,
      email,
      toggle,
      orderId,
      cartItems,
      cartTotal,
      products,
      checkingOut,
      confirmation,
      paymentError,
      paymentLoading,
      shippingAddress,
      showPaymentStatus,
      resetPaymentStatus,
      activatePaymentStatus,
    ],
  );
  return <CheckoutContext value={value}>{children}</CheckoutContext>;
});

interface Props extends OptionalChildren {
  products: Record<string, IStripe.Product>;
}

interface ICheckoutContext {
  open: boolean;
  email: string;
  orderId: string;
  cartTotal: string;
  checkingOut: boolean;
  paymentError: string;
  confirmation: boolean;
  cartItems: CartProduct[];
  paymentLoading: boolean;
  showPaymentStatus: boolean;
  toggle: ModalToggle<never[]>;
  resetPaymentStatus: Callback;
  activatePaymentStatus: Callback;
  shippingAddress: ShippingAddress;
  products: Record<string, IStripe.Product>;
  setEmail: Dispatch<SetStateAction<string>>;
  setPaymentError: Dispatch<SetStateAction<string>>;
  setPaymentLoading: Dispatch<SetStateAction<boolean>>;
  setShippingAddress: Dispatch<SetStateAction<ShippingAddress>>;
}

interface CartProduct extends IStripe.Product {
  quantity: number;
}

export interface ShippingAddress {
  name: string;
  address: {
    line1: string;
    line2: string | null;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  phone?: string;
}
