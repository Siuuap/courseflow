import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/db";

export async function POST(req, { params }) {
  const courseId = params.course_id;
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("user");
  const status = searchParams.get("status");
  const userCourseId = searchParams.get("usercourseid");

  const { data, error } = await supabase
    .from("users_courses")
    .update({ status: status })
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .eq("user_course_id", userCourseId)
    .select();

  return NextResponse.json(
    { message: "Update Successfully", data: data },
    { status: 200 }
  );
}
