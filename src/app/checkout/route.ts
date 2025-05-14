import { NextResponse } from "next/server";
import IStripe from "stripe";
import { AccessControl } from "Tools/AccessControl";
import { Stripe } from "Tools/Stripe";
import { CheckoutSessionPayload } from "Types/API";

export async function POST(request: Request) {
  AccessControl.requireSameOrigin(request);
  const body = (await request.json()) as CheckoutSessionPayload;
  const products = await Stripe.getClient().products.list({
    active: true,
    limit: 100,
    expand: ["data.default_price"],
  });
  const table: Record<string, IStripe.Product> = {};
  for (const product of products.data) {
    table[product.id] = product;
  }
  const list: IStripe.Checkout.SessionCreateParams.LineItem[] = [];
  for (const product in body) {
    const price = table[product].default_price as IStripe.Price;
    list.push({
      price: price.id,
      quantity: body[product],
    });
  }

  const origin = request.headers.get("referer") ?? request.url;

  const searchParams = new URLSearchParams(new URL(origin).search);
  searchParams.set("session_id", "{CHECKOUT_SESSION_ID}");
  const paramString = decodeURIComponent(searchParams.toString());

  const session = await Stripe.getClient().checkout.sessions.create({
    line_items: list,
    mode: "payment",
    ui_mode: "custom",
    shipping_address_collection: {
      allowed_countries: ["US"],
    },
    billing_address_collection: "required",
    return_url: `${origin}?${paramString}`,
  });

  if (!session.client_secret) {
    throw new Error("Invalid Session");
  }

  return new NextResponse(
    JSON.stringify({
      checkoutSessionClientSecret: session.client_secret,
    }),
  );
}
