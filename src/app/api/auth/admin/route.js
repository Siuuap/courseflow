import { supabase } from "@/utils/db";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
export async function GET() {
  const { data, error } = await supabase.from("admins").select("*");
  if (error) {
    return Response.json({ message: "" });
  }
  return Response.json({ message: "Fetching Successfully", data });
}
