import { supabase } from "@/utils/db";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
export async function GET() {
  try {
    const { data, error } = await supabase.from("admins").select("*");
    if (error) {
      return Response.json({ message: "" });
    }
    return Response.json({ message: "Fetching Successfully", admins: data });
  } catch (error) {
    return Response.json({ message: "authentication fail", error });
  }
}
