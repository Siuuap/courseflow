import { supabase } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function GET(request, { params }) {
  const id = params.admin_id;
  const { data, error } = await supabase
    .from("admins")
    .select()
    .eq(" admin_id", id);
  if (error) {
    return Response.json({ message: `Fail to fetch`, error });
  }
  if (data.length === 0) {
    return Response.json({ message: `Cannot find admin_id: ${id}` });
  }
  return Response.json({
    message: `Fetching data of admin_id: ${id} Sucessfully`,
    data,
  });
}
export async function PUT(request, { params }) {
  const id = params.admin_id;
  const newAdminData = await request.json();

  const salt = await bcrypt.genSalt(10);
  newAdminData.password = await bcrypt.hash(newAdminData.password, salt);

  const { data, error } = await supabase
    .from("admins")
    .update(newAdminData)
    .eq("admin_id", id);
  if (error) {
    return Response.json({ message: "Cannot Update Data", error });
  }

  return Response.json({
    message: `Update admin_id: ${id} successfully`,
    data,
  });
}
export async function DELETE(request, { params }) {
  const id = params.admin_id;

  const { data, error } = await supabase
    .from("admins")
    .delete()
    .eq("admin_id", id);
  if (error) {
    return Response.json({ message: `Cannot delete admin_id:${id}`, error });
  }
  return Response.json({ message: `Delete admin_id: ${id} successfully` });
}
