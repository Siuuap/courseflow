import { NextResponse } from "next/server";
import { supabase } from "../../../../../utils/db";
export async function GET(request, { params }) {
  const courseId = params.courseid;
  console.log(courseId);
  const { data, error } = await supabase
    .from("courses_test")
    .select("*, lessons_test(name ,sub_lessons(name)))")
    .eq("course_id", courseId);

  // .from("courses_test")
  // .select("* , lessons_test:course_id (name, sub_lessons:id (name))")
  // .eq("course_id", courseId)
  return NextResponse.json({ message: "fetch successfully", data: data });
}
