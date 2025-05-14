import StripeConstructor from "stripe";
import {
  CheckoutSessionPayload,
  CheckoutSessionResponse,
  PaymentSessionResponse,
} from "Types/API";

export class Stripe {
  private static client: StripeConstructor | null = null;

  public static get publicAPIKey() {
    if (!process.env.NEXT_PUBLIC_STRIPE_API) {
      throw new Error("Something went wrong");
    }
    return process.env.NEXT_PUBLIC_STRIPE_API;
  }

  public static get APIKey() {
    if (!process.env.STRIPE_API) {
      throw new Error("Something went wrong");
    }
    return process.env.STRIPE_API;
  }

  public static getClient() {
    if (!this.client) {
      this.client = new StripeConstructor(this.APIKey);
    }
    return this.client;
  }

  public static generateSession(cart: CheckoutSessionPayload) {
    return fetch("/checkout", { method: "POST", body: JSON.stringify(cart) })
      .then(response => response.json() as Promise<CheckoutSessionResponse>)
      .then(json => json.checkoutSessionClientSecret);
  }

  public static checkPaymentStatus(session_id: string) {
    return fetch("/payment-status", {
      method: "POST",
      body: JSON.stringify({ session_id }),
    })
      .then(response => response.json() as Promise<PaymentSessionResponse>)
      .then(json => json);
  }
}
