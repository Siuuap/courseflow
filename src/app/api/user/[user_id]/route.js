import { supabase } from "@/utils/db";
import bcrypt from "bcrypt";

export async function GET(request, { params }) {
  //const req = await request.formData();

  //const userId = req.get("userId");
  // const firstName = req.get("firstName");
  // const lastName = req.get("lastName");
  // const dateOfBirth = req.get("dateOfBirth");
  // const educationBackground = req.get("educationBackground");
  // const email = req.get("email");

  // const { data, error } = await supabase
  //   .from("user_profiles")
  //   .select()
  //   .eq("userId");

  //const userId = data[0].user_id;
  //return Response.json({ data });

  const id = params.user_id;
  console.log(`id is:`, id);
  const { data, error } = await supabase
    .from("user_profiles")
    .select()
    .eq("user_id", id);
  console.log(`data:`, data);

  const profile = data[0];

  if (error) {
    return Response.json({ message: "Fetch error" });
  }
  return Response.json({ message: "Fetch successfully", data: profile });
}

// export async function PUT(request, { params }) {
//   const id = params.user_id;

//   const reqData = await request.json();
//   const updated_at = new Date(Date.now());
//   const { error } = await supabase
//     .from("user_profiles")
//     .update({ ...reqData, updated_at })
//     .eq("user_id", id);

//   if (error) {
//     return Response.json({ message: "Update fail", error });
//   }
//   return Response.json({ message: `Update course id: ${id} Successfully` });
// }

export async function PUT(request) {
  const reqData = await request.json();
  //console.log(`reqData`, reqData);

  // const newData = {
  //   user_id: reqData.user_id,
  //   firstName: reqData.first_name,
  //   lastName: reqData.last_name,
  //   dataOfBirth: reqData.date_of_birth,
  //   educational: reqData.educational_background,
  //   email: reqData.email,
  //   image: reqData.img_url,
  // };
  try {
    const { data, error } = await supabase
      .from("user_profiles")
      .update({ ...reqData, updated_at })
      .eq("user_id", id);
    console.log(`Update data:`, data);
    if (error) {
      console.log(`error from supabase when update user: ${error}`);
      return NextResponse.json({
        message: "Cannot update user profile",
        error,
      });
    }
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ message: "Create new course successfully" });
}

export async function DELETE(req, { params }) {
  const id = params.user_id;
  console.log(id);
  const result = await supabase
    .from("user_profiles")
    .delete()
    .eq("user_id", id);
  console.log(result);
  if (result.error) {
    return Response.json({
      message: "Cannot delete user from the database",
      error: result.error,
    });
  }
  return Response.json({
    message: `Delete user id: ${id} successfully`,
  });
}
