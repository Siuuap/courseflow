import { supabase } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  const reqData = await request.json();

  const newLesson = {
    lesson_id: reqData.lesson_id,
    course_id: reqData.course_id,
    name: reqData.lessonName ? reqData.lessonName : reqData.name,
    lesson_number: reqData.lesson_number,
  };

  try {
    const { data, error } = await supabase.from("lessons").insert(newLesson);
    if (error) {
      console.log(`error from supabase`, error);
      return Response.json({
        message: "Cannot create new lesson",
        error: error,
      });
    }
  } catch (error) {
    console.log(`error before sending data to supabase`, error);
  }
  return Response.json({ message: "Create new lesson successfully" });
}

export async function DELETE(request) {
  // const reqData = await request.json();
  // console.log(`reqData`);
  return Response.json({ message: "Delete all lessons successfully" });
}
