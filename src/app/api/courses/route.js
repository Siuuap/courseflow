import { supabase } from "../../../utils/db.js";
import { NextRequest, NextResponse } from "next/server";
export async function GET() {
  const { data: courses, error } = await supabase
    .from("courses_test")
    .select("* , lessons_test(name)");
  if (error) {
    console.error(error);
    throw new Error("Courses can not be reach");
  }
  return NextResponse.json(courses);
}

// export async function GET(query) {
//   console.log(query);
//   if (!query) {
//     const { data: courses, error } = await supabase
//       .from("courses_test")
//       .select("* , lessons_test:course_id (name)");
//     if (error) {
//       console.error(error);
//       throw new Error("Courses can not be reach");
//     }
//     return courses;
//   } else {
//     const { data: courses, error } = await supabase
//       .from("courses_test")
//       .select("* , lessons_test:course_id (name)")
//       .textSearch("name", query);

//     if (error) {
//       console.error(error);
//       throw new Error("Courses can not be reach");
//     }
//     return courses;
//   }
// }
