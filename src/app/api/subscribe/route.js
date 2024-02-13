import { supabase } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const req = await request.json();
    console.log(req);

    const { data, error } = await supabase
      .from("users_courses")
      .insert([{ user_id: req.user_id, course_id: req.course_id }])
      .select();

    if (error) {
      throw new Error("error");
    }
  } catch (error) {
    throw new Error("error");
  }

  return NextResponse.json({ message: "added course successfully" });
}
