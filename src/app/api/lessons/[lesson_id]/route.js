import { supabase } from "@/utils/db";

export async function GET(req, { params }) {
  const id = params.lesson_id;
  console.log(`id`, id);
  const { data, error } = await supabase
    .from("lessons")
    .select("* ,sub_lessons(*),courses(name)")
    .eq("lesson_id", id);
  if (error) {
    console.log(`error from supabase`, error);
    return Response.json({
      message: `Cannot get lesson`,
      error: error,
    });
  }
  console.log(`data`, data);
  return Response.json({ message: "Get lesson successfully", data: data });
}

export async function DELETE(req, { params }) {
  const id = params.lesson_id;
  console.log(`params`, id);
  try {
    const { data, error } = await supabase
      .from("lessons")
      .delete()
      .eq("lesson_id", id);
    if (error) {
      console.log(`error from supabase`, error);
      return Response.json({
        message: `Cannot delete lesson`,
        error: error,
      });
    }
  } catch (error) {
    console.log(`error before sending data to supabase`, error);
  }

  return Response.json({ message: "Create new lesson successfully" });
}
