import { supabase } from "@/utils/db";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token").value;
    const userDataFromToken = jwtDecode(token);

    const userId = userDataFromToken.userId;

    let { data: users, error_user } = await supabase
      .from("users")
      .select("email")
      .eq("user_id", userId);
    let { data: profiles, error_profile } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("user_id", userId);

    const userData = {
      email: users[0].email,
      firstName: profiles[0].first_name,
      lastName: profiles[0].last_name,
      dateOfBirth: profiles[0].date_of_birth,
      educationalBackground: profiles[0].educational_background,
    };


    return Response.json(userData);
  } catch {
    return Response.json({ message: "request data error", data : {}});
  }
}
