import { supabase } from "@/utils/db";
import bcrypt from "bcrypt";

export async function GET() {
  let result = await supabase.from("users").select("*");
  return Response.json({ data: "GET" });
}

export async function POST(request) {
  const req = await request.json();

  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", req.email);

  if (!users[0]) {
    return Response.json({ message: "user not found" });
  }

  const isValidPassword = await bcrypt.compare(req.password, users[0].password);

  if (!isValidPassword) {
    return Response.json({
      message: "password is not valid",
    });
  }

  return Response.json({ message: "user found" });
}
