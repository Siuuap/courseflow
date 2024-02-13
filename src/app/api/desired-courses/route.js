import { supabase } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const req = await request.json();
    console.log(req);

    const { data, error } = await supabase
      .from("users_desired")
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

export async function PUT(request) {
  try {
    console.log("hey1111111111111111111111111111111111111111111111111");
    const req = await request.json();
    console.log("hey2222222222222222222222222222222222222222222222222");
    console.log(req)
    const { error } = await supabase
      .from("users_desired")
      .delete()
      .eq("user_id", req.user_id)
      .eq("course_id", req.course_id);

    console.log("test");
    console.log(error);

    if (error) {
      console.error("Supabase error:", error.message);
      throw new Error(`Error deleting from database: ${error.message}`);
    }
  } catch (error) {
    console.error("Internal server error:", error.message);
    throw new Error("Internal server error");
  }

  return NextResponse.json({ message: "deleted course successfully" });
}
