import { NextResponse } from "next/server";
import { AccessControl } from "Tools/AccessControl";
import { Stripe } from "Tools/Stripe";
import { PaymentSessionPayload } from "Types/API";

export async function POST(request: Request) {
  AccessControl.requireSameOrigin(request);
  const body = (await request.json()) as PaymentSessionPayload;
  if (!body.session_id) {
    throw new Error("Missing session id");
  }
  try {
    const session = await Stripe.getClient().checkout.sessions.retrieve(
      body.session_id,
    );
    return new NextResponse(
      JSON.stringify({
        order_id: session.payment_intent,
        success: session.status === "complete",
      }),
    );
  } catch {
    throw new Error("Checkout session not found");
  }
}
