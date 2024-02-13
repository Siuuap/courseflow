import { supabase } from "@/utils/db";
import bcrypt from "bcrypt";

export async function POST(request) {
  const req = await request.json();
  let nameParts = req.fullname.split(" ");
  let firstName = nameParts[0];
  let lastName = nameParts[1];
  const email = req.email;
  let password = req.password;
  const dateofBirth = req.dateofBirth;
  const EducationalBackground = req.EducationalBackground;

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        email: email,
        password: password,
      },
    ])
    .select();

  const userId = data[0].user_id;

  await supabase
    .from("user_profiles")
    .insert([
      {
        user_id: userId,
        first_name: firstName,
        last_name: lastName,
        date_of_birth: dateofBirth,
        educational_background: EducationalBackground,
      },
    ])
    .select();

  if (error) {
    return Response.json({ message: "cannot created new account" });
  }
  return Response.json({ message: "created account successfully" });
}
