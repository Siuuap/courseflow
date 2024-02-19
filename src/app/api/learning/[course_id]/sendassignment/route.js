import { supabase } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req, { params }) {
  const searchParams = req.nextUrl.searchParams;
  const answer = await req.body;
  const statusAnwer = await req.body;
  const userId = searchParams.get("userid");
  console.log(answer);
  const subLessonId = searchParams.get("sublessonid");
  const { data, error } = await supabase
    .from("users_sub_lessons")
    .update({ answer: answer, status_assignment: statusAnwer })
    .eq("user_id", userId)
    .eq("sub_lesson_id", subLessonId)
    .select();
  return NextResponse.json(
    { message: "Update Successfully", data: data },
    { status: 200 }
  );
}
