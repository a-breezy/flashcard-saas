import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // create new stripe instance

const formatAmountForStripe = (amount) => {
  return Math.round(amount * 100); // stripe takes cents so this converts the price to dollars
};

export async function POST(req) {
  // Create Checkout Sessions from body params.
  const params = {
    submit_type: "subscription", // define payment model
    payment_method_types: ["card"], // payment method
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Pro Subscription",
          },
          unit_amount: formatAmountForStripe(10), // change value from 10 dollars to 1000 cents
          recurring: {
            interval: "month",
            interval_count: 1,
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
  };
  const checkoutSession = await stripe.checkout.sessions.create(params);

  return NextResponse.json(checkoutSession, {
    status: 200
  });
}
