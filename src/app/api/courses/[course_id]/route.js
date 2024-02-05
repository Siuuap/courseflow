import { supabase } from "@/utils/db";
export async function GET(request, { params }) {
  const id = params.course_id;
  const { data, error } = await supabase
    .from("courses_test")
    .select("*, lessons_test(name ,sub_lessons(name)))")
    .eq("course_id", id);
  // .from("courses")
  // .select("*")
  // .eq("course_id", id);
  if (error) {
    return Response.json({ message: "Fetch successfully", data: data });
  }
  return Response.json({ message: "Fetch successfully", data: data });
}

export async function PUT(request, { params }) {
  const id = params.course_id;

  const reqData = await request.json();
  const updated_at = new Date(Date.now());
  const { error } = await supabase
    .from("courses")
    .update({ ...reqData, updated_at })
    .eq("course_id", id);

  if (error) {
    return Response.json({ message: "Update fail", error });
  }
  return Response.json({ message: `Update course id: ${id} Successfully` });
}

export async function DELETE(req, { params }) {
  const id = params.course_id;
  console.log(id);
  const result = await supabase
    .from("courses_test_duplicate")
    .delete()
    .eq("course_id", id);
  console.log(result);
  if (result.error) {
    return Response.json({
      message: "Cannot delete course from the data base",
      error: result.error,
    });
  }
  return Response.json({
    message: `Delete course id: ${id} successfully`,
  });
}
