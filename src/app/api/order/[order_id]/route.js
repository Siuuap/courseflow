import { supabase } from "@/utils/db";

export async function GET(request, { params }) {
  const order_id = params.order_id;
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq(`order_id`, order_id);
    if (error) {
      console.log(error);
      return Response.json({ error }, { status: 400 });
    }
    return Response.json({ data: data[0] });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 400 });
  }
}
