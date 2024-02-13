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
