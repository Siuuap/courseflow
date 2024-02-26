import { supabase } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req, { params }) {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userid");
  const { data, error } = await supabase
    .from("users_courses")
    .select(
      "*,courses(*,lessons(*,sub_lessons(*,assignments(*)))),users_sub_lessons(*)"
    )
    .eq("user_id", userId);

  return Response.json({ message: "Fetch successfully", data: data });
}
