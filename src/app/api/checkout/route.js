import { supabase } from "@/utils/db";
import { v4 as uuidv4 } from "uuid";
import Stripe from "stripe";

// เอา Key test มาใช้
const stripe = new Stripe(process.env.STRIPE_SECRET);

export async function POST(request) {
  const { user_id, price, course_name, course_id } = await request.json();
  const orderId = uuidv4();
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "promptpay"],
    line_items: [
      {
        price_data: {
          currency: "thb",
          product_data: {
            name: course_name,
          },
          unit_amount: Number(price) * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:3000/course/${course_id}?status=success`,
    cancel_url: `http://localhost:3000/course/${course_id}?status=fail`,
  });
  console.log(`session`, session);
  const orderData = {
    order_id: orderId,
    session_id: session.id,
    user_id: user_id,
    course_name: course_name,
    status: session.status,
    course_id: course_id,
  };
  try {
    const { data, error } = await supabase.from("orders").insert(orderData);
    if (error) {
      console.log(`error from supabase`, error);
    }
    return Response.json({ user_id, price, url: session.url }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: error, data }, { status: 400 });
  }
}
