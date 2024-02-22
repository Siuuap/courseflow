import { supabase } from "@/utils/db";

export async function GET(request, { params }) {
  const id = params.course_id;
  // console.log(`id is:`, id);
  const { data, error } = await supabase
    .from("courses")
    .select("*, lessons(* ,sub_lessons(*)))")
    .eq("course_id", id);

  if (error) {
    return Response.json({ message: "Fetch error" });
  }
  return Response.json({ message: "Fetch successfully", data: data });
}

export async function PUT(request, { params }) {
  const id = params.course_id;
  const reqData = await request.json();
  // console.log(reqData.video_url);
  // console.log(`reqData`, reqData);
  const { data, error } = await supabase
    .from("courses")
    .update({
      description: reqData.description,
      length: reqData.length,
      name: reqData.name,
      number_of_lesson: reqData.number_of_lesson,
      price: reqData.price,
      summary: reqData.summary,
      img_url: reqData.img_url,
      video_url: reqData.video_url,
      attached_file_url: reqData.attached_file_url
        ? reqData.attached_file_url
        : null,
      updated_at: new Date(Date.now()).toISOString(),
    })
    .eq("course_id", reqData.course_id);
  if (error) {
    console.log(`error from supabase`, error);
    return Response.json({ error: error });
  }
  return Response.json({ message: `Update successfully` });
}

export async function DELETE(req, { params }) {
  const id = params.course_id;
  // console.log(id);
  const result = await supabase.from("courses").delete().eq("course_id", id);
  // console.log(result);
  if (result.error) {
    return Response.json({
      message: "Cannot delete course from the database",
      error: result.error,
    });
  }
  return Response.json({
    message: `Delete course id: ${id} successfully`,
  });
}
