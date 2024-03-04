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
    return Response.json({ message: "Cannot delete lesson", error: error });
  }

  return Response.json({ message: "Delete lesson successfully" });
}

export async function PUT(request, { params }) {
  const id = params.lesson_id;
  const reqData = await request.json();
  try {
    const { data, error } = await supabase
      .from("lessons")
      .update({
        course_id: reqData.course_id,
        lesson_id: reqData.lesson_id,
        lesson_number: reqData.lesson_number,
        name: reqData.name,
        updated_at: new Date(Date.now()).toISOString(),
      })
      .eq("lesson_id", id);
    if (error) {
      console.log(`error from supabase`, error);
      return Response.json({
        message: `Cannot update lesson`,
        error: error,
      });
    }
  } catch (error) {
    console.log(`error before sending data to supabase`, error);
  }

  return Response.json({ message: "Update lesson successfully" });
}
