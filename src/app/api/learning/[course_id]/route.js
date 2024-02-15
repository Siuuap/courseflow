import { supabase } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req, { params }) {
  const courseId = params.course_id;
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userid");
  const { data, error } = await supabase
    .from("users_courses")
    .select("*,courses(*,lessons(*,sub_lessons(*))),users_sub_lessons(*)")
    .eq("user_id", userId)
    .eq("course_id", courseId);

  return NextResponse.json(
    { message: "Fetching Successfully", data: data },
    { status: 200 }
  );
}

export async function POST(request, { params }) {
  const courseId = params.course_id;
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("user");
  const status = searchParams.get("status");
  const subLessonId = searchParams.get("subid");
  const progress = searchParams.get("progress");
  const userCourseId = searchParams.get("usercourseid");
  const { data, error } = await supabase
    .from("users_sub_lessons")
    .update({ status: status })
    .eq("user_id", userId)
    .eq("user_course_id", userCourseId)
    .eq("sub_lesson_id", subLessonId)
    .select();

  return NextResponse.json(
    { message: "Update Successfully", data: data },
    { status: 200 }
  );
}
