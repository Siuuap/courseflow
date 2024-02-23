import { supabase } from "@/utils/db";

export async function POST(request) {
  const reqData = await request.json();
  console.log(reqData);

  const newSubLesson = {
    lesson_id: reqData.lesson_id,
    sub_lesson_id: reqData.sub_lesson_id,
    name: reqData.subLessonName ? reqData.subLessonName : reqData.name,
    sub_lesson_number: reqData.sub_lesson_number,
    video_url: reqData.video_url,
  };
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

  return Response.json({ message: "Create new sub_lesson successfully" });
}
