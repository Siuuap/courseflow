import { supabase } from "@/utils/db";
import bcrypt from "bcrypt";

export async function POST(request) {
  const req = await request.formData();

  const email = req.get("email");
  let password = req.get("password");
  const firstName = req.get("firstName");
  const lastName = req.get("lastName");
  const dateOfBirth = req.get("dateOfBirth");
  const educationBackground = req.get("educationBackground");

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  const { data, error } = await supabase
    .from("users")
    .insert([{ email: email, password: password }])
    .select();

  const userId = data[0].user_id;

  if (data) {
    const { data, error } = await supabase
      .from("user_profiles")
      .insert([
        {
          user_id: userId,
          first_name: firstName,
          last_name: lastName,
          date_of_birth: dateOfBirth,
          educational_background: educationBackground,
        },
      ])
      .select();
  }

  return Response.json({ message: "created account successfully" });
}
