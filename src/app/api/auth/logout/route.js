import { supabase } from "@/utils/db";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function POST(request) {

  cookies().delete('token')
  return Response.json({ message: "logged out successfully" });
}
