import StripeConstructor from "stripe";

export class Stripe {
  private static client: StripeConstructor | null = null;

  public static getClient() {
    if (!this.client) {
      if (!process.env.STRIPE_API) {
        throw new Error("Something went wrong");
      }
      this.client = new StripeConstructor(process.env.STRIPE_API);
    }
    return this.client;
  }
}
