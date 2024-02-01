import { supabase } from "../../../../../utils/db";
import { NextResponse } from "next/server";
export async function GET(request, { params }) {
  const searchName = params.name;

  const { data: courses, error } = await supabase
    .from("courses_test")
    .select("* , lessons_test (name)")
    .textSearch("name", searchName);

  if (error) {
    console.error(error);
    throw new Error("Courses can not be reach");
  }
  return NextResponse.json(courses);
}
