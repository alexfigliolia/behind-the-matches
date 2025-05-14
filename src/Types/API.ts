export type CheckoutSessionPayload = Record<string, number>;

export interface CheckoutSessionResponse {
  checkoutSessionClientSecret: string;
}

export type PaymentSessionPayload = { session_id: string };

export interface PaymentSessionResponse {
  success: boolean;
  order_id: string;
}
