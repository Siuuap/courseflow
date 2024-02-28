import { supabase } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req, { params }) {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userid");
  const { data, error } = await supabase
    .from("assignment_view")
    .select("*")
    .eq("user_id", userId);
  // .eq("user_id", userId);

  return Response.json({ message: "Fetch successfully", data: data });
}

// "*,courses(*,lessons(*,sub_lessons(*,assignments(*)))),users_sub_lessons(*)"
