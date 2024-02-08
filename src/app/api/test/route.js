import { supabase } from "@/utils/db";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;

  console.log(searchParams);

  return Response.json({ message: "aaa" });
}
