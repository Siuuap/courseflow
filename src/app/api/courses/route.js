import { supabase } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;

  const search = searchParams.get("search");

  const page = searchParams.get("page") || 1;

  const limit = 20;
  const start = (page - 1) * limit;
  const end = start + limit - 1;

  console.log(search);
  const { data, error } = search
    ? await supabase
        .from("courses")
        .select("* , lessons(*)")
        .ilike("name", `%${search}%`)
        .limit(limit)
    : await supabase.from("courses").select("* , lessons(*)").range(start, end);

  if (error) {
    console.error(error);
    throw new Error("Courses can not be reach");
  }
  return NextResponse.json(
    { message: "Fetching Successfully", data },
    { status: 200 }
  );
}

export async function POST(request) {
  const reqData = await request.json();
  console.log(`reqData.lessons`, reqData.lessons);

  const newCourse = {
    course_id: reqData.course_id,
    name: reqData.name,
    description: reqData.description,
    price: reqData.price,
    length: reqData.length,
    summary: reqData.summary,
    img_url: reqData.img_url,
    video_url: reqData.video_url,
    attached_file_url: reqData.attached_file_url,
    number_of_lesson: reqData.lessons.length,
  };
  try {
    const { data, error } = await supabase.from("courses").insert(newCourse);
    if (error) {
      console.log(`error from supabase when insert course: ${error}`);
      return NextResponse.json({
        message: "Cannot create new course",
        error,
      });
    }
  } catch (error) {
    console.log(error);
  }

  const lessons = reqData.lessons;
  for (let i = 0; i < lessons.length; i++) {
    const newLesson = {
      course_id: reqData.course_id,
      lesson_id: lessons[i].lesson_id,
      name: lessons[i].lessonName,
      lesson_number: lessons[i].lesson_number,
    };
    try {
      const { data, error } = await supabase.from("lessons").insert(newLesson);
      if (error) {
        console.log(`error from supabase when insert lesson`, error);
        return NextResponse.json({
          message: "Cannot create new lesson",
          error,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  for (let i = 0; i < lessons.length; i++) {
    const subLesson = lessons[i].subLesson;
    console.log(`sublesson na`, subLesson);
    for (let j = 0; j < subLesson.length; j++) {
      const newSubLesson = {
        lesson_id: lessons[i].lesson_id,
        sub_lesson_id: subLesson[j].sub_lesson_id,
        name: subLesson[j].subLessonName,
        video_url: subLesson[j].video_url,
        sub_lesson_number: subLesson[j].sub_lesson_number,
      };
      console.log(`newSubLesson`, newSubLesson);
      try {
        const { data, error } = await supabase
          .from("sub_lessons")
          .insert(newSubLesson);
        if (error) {
          console.log(`error from supabase when insert sub lesson: ${error}`);
          return NextResponse.json({
            message: "Cannot create new sub lesson",
            error,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  return NextResponse.json({ message: "Create new course successfully" });
}
