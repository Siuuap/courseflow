import { supabase } from "@/utils/db";

export async function DELETE(request, { params }) {
  const id = params.sub_lesson_id;
  try {
    const { data, error } = await supabase
      .from("sub_lessons")
      .delete()
      .eq("sub_lesson_id", id);
    if (error) {
      console.log(`error from supabase`, error);
      return Response.json({
        message: `Cannot delete sub lesson`,
        error: error,
      });
    }
  } catch (error) {
    console.log(`error before sending data to supabase`, error);
  }

  return Response.json({ message: "Delete sub_lesson successfully" });
}

export async function PUT(request, { params }) {
  const id = params.sub_lesson_id;
  const reqData = await request.json();
  console.log(`reqData from put`, reqData);
  try {
    const { data, error } = await supabase
      .from("sub_lessons")
      .update({
        lesson_id: reqData.lesson_id,
        name: reqData.name,
        sub_lesson_id: reqData.sub_lesson_id,
        sub_lesson_number: reqData.sub_lesson_number,
        video_url: reqData.video_url,
        updated_at: new Date().toISOString(),
      })
      .eq("sub_lesson_id", id);

    if (error) {
      console.log(`error from supabase`, error);
      return Response.json({
        message: `Cannot update sub lesson`,
        error: error,
      });
    }
  } catch (error) {
    console.log(`error before sending data to supabase`, error);
  }

  return Response.json({ message: "Update sub_lesson successfully" });
}
