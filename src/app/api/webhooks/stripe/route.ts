import { db } from "@/db"
import { stripe } from "@/lib/stripe"
import { headers } from "next/headers"
import Stripe from "stripe"

export async function POST(req: Request) {
  const body = await req.text()
  const headersObj = await headers()
  const signature = headersObj.get("stripe-signature")

  console.log("[Stripe Webhook] Received request")
  console.log("[Stripe Webhook] Signature present:", !!signature)

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature ?? "",
      process.env.STRIPE_WEBHOOK_SECRET ?? ""
    )
  } catch (err) {
    console.error("[Stripe Webhook] Error verifying signature:", err)
    return new Response("Webhook Error", { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    const { userId } = session.metadata || { userId: null }
    const clientId = session.client_reference_id

    const id = userId || clientId

    if (!id) {
      console.error("[Stripe Webhook] No user ID found in metadata or client_reference_id")
      return new Response("Invalid metadata", { status: 400 })
    }

    console.log("[Stripe Webhook] Upgrading user:", id)

    await db.user.update({
      where: { id },
      data: { plan: "PRO" },
    })
  }

  return new Response("OK")
}
