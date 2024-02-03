import { supabase } from "@/utils/db.js";
import { NextResponse } from "next/server";
import { useSearchParams } from "next/navigation";

export async function GET(request, { params }) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search");
  console.log(search);
  const { data, error } = await supabase
    .from("courses_test")
    .select("* , lessons_test (name)")
    .ilike("name", `%${search}%`);

  if (error) {
    console.error(error);
    throw new Error("Courses can not be reach");
  }
  return NextResponse.json({ data });
}
