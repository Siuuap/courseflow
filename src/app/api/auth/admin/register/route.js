import { supabase } from "@/utils/db";
import bcrypt from "bcrypt";
export async function POST(request) {
  const newAdmin = await request.json();

  const salt = await bcrypt.genSalt(10);
  newAdmin.password = await bcrypt.hash(newAdmin.password, salt);
  const { data, error } = await supabase.from("admins").insert(newAdmin);
  if (error) {
    return Response.json({ message: "Cannot create new admin", error });
  }
  return Response.json({ message: "New admin has been created successfully" });
}
