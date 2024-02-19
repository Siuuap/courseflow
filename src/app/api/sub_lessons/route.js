import { supabase } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  const reqData = await request.json();
  console.log(reqData);
  const lesson_id = reqData.lesson_id;
  const newSubLessons = [...reqData.subLesson];
  for (let i = 0; i < newSubLessons.length; i++) {
    const newSubLesson = {
      lesson_id: lesson_id,
      sub_lesson_id: newSubLessons[i].sub_lesson_id,
      name: newSubLessons[i].subLessonName,
      sub_lesson_number: newSubLessons[i].sub_lesson_number,
      video_url: newSubLessons[i].video_url,
    };
    console.log(`newSubLesson${i}`, newSubLesson);
    try {
      const { data, error } = await supabase
        .from("sub_lessons")
        .insert(newSubLesson);
      if (error) {
        console.log(`error from supabase`, error);
        return Response.json({
          message: "Cannot create new sub lesson",
          error,
        });
      }
    } catch (error) {
      console.log(`error before sending data to supabase`, error);
      return Response.json({ message: "Cannot create new sub lesson" });
    }
  }

  return Response.json({ message: "Create new sub_lesson successfully" });
}
