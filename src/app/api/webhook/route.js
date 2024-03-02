import Stripe from "stripe";
import { supabase } from "@/utils/db";
const stripe = new Stripe(process.env.STRIPE_SECRET);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request, response) {
  const rawBody = await request.text();
  const body = JSON.parse(rawBody);
  const sig = request.headers.get("Stripe-Signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (error) {
    console.log(`error from stripe`, error);
    return Response.json({ WebhookError: error.message }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const paymentData = event.data.object;
      console.log(`paymentData`, paymentData);
      const sessionId = paymentData.id;

      //update stautus to database
      try {
        const { data, error } = await supabase
          .from("orders")
          .update({ status: paymentData.status })
          .eq("session_id", sessionId);
      } catch (error) {
        console.log(error);
      }

      // get data from orders table
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq(`session_id`, sessionId);

        if (error) {
          console.log(error);
          return Response.json({ error }, { status: 400 });
        }
        console.log(`data`, data);
        const users_coursesUpdate = await supabase
          .from("users_courses")
          .insert([{ user_id: data[0].user_id, course_id: data[0].course_id }])
          .select();
        if (users_coursesUpdate.error) {
          console.log(users_coursesUpdate.error);
          return Response.json(
            { error: users_coursesUpdate.error },
            { status: 400 }
          );
        }
      } catch (error) {
        console.log(error);
        return Response.json({ error }, { status: 400 });
      }

      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  return Response.json({ message: "Hello" });
}
