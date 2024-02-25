import { supabase } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req, { params }) {
  const searchParams = req.nextUrl.searchParams;
  const body = await req.json();
  const userId = searchParams.get("userid");
  const subLessonId = searchParams.get("sublessonid");

  const date = new Date();
  date.setDate(date.getDate() + body.duration);

  const { data, error } = await supabase
    .from("users_sub_lessons")
    .update({
      due_date: date.toISOString(),
      status_assignment: body.status,
    })
    .eq("user_id", userId)
    .eq("sub_lesson_id", subLessonId)
    .select();

  return NextResponse.json(
    { message: "Update Successfully", data: data },
    { status: 200 }
  );
}
