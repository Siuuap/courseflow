import { supabase } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request) {
  const reqData = await request.json();
  const query = { ...reqData };
  const { data, error } = await supabase.from("courses").insert(query);

  if (error) {
    return Response.json({
      message: "Cannot create new course",
      error,
    });
  }
  return Response.json({
    message: "Create new course successfully",
    newCourse: reqData,
  });
}

export async function GET() {
  const { data, error } = await supabase
    .from("courses_test_duplicate")
    .select("*");

  if (error) {
    return Response.json({
      message: "Cannot create new course",
      error,
    });
  }
  return Response.json({
    message: "Fetching Data Successfully",
    data,
  });
}
