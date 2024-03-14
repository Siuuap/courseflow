import { supabase } from "@/utils/db";
import bcrypt from "bcrypt";

export async function POST(request) {
  // data from auth (email , password)
  const newAdmin = await request.json();
  const salt = await bcrypt.genSalt(10); //
  newAdmin.password = await bcrypt.hash(newAdmin.password, salt); // salt password
  const { data, error } = await supabase.from("admins").insert(newAdmin); // {email , password(B)}
  if (error) {
    return Response.json({ message: "Cannot create new admin", error });
  }
  return Response.json({ message: "New admin has been created successfully" });
}
