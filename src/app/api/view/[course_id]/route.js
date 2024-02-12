import { supabase } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req, { params }) {
  const courseId = params.course_id;
  const { data, error } = await supabase
    // .from("status_view")
    // .select("*")
    // .eq("user_id", 53)
    // .eq("course_id", 1);

    .from("users_courses")
    .select("*,courses(*,lessons(*,sub_lessons(*))),users_sub_lessons(*)")
    .eq("user_id", 53)
    .eq("course_id", courseId);

  // .from("status_view")
  // .select()
  // .eq("course_id", id)
  // .eq("user_id", 53);

  return NextResponse.json(
    { message: "Fetching Successfully", data: data },
    { status: 200 }
  );
}
