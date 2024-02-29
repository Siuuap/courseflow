import { supabase } from "@/utils/db";

export async function POST(request, { params }) {
  const { user, product } = request.body;
  return Response.json({ user, product });
}
