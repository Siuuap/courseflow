import { supabase } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request, { params }) {
  const id = params.user_id;
  console.log(`id is:`, id);

  const { data: data2, error: error2 } = await supabase
    .from("users")
    .select("email")
    .eq("user_id", id);
  console.log(`data2:`, data2);

  const { data, error } = await supabase
    .from("user_profiles")
    .select()
    .eq("user_id", id);
  console.log(`data:`, data);

  const profile = data[0];
  const user = data2[0];

  if (error) {
    return Response.json({ message: "Fetch error" });
  }
  return Response.json({
    message: "Fetch successfully",
    data: { ...profile, ...user },
  });
}

export async function PUT(request) {
  const reqData = await request.json();
  console.log(`reqData`, reqData);

  const newData = {
    user_id: reqData.user_id,
    first_name: reqData.firstName,
    last_name: reqData.lastName,
    date_of_birth: reqData.dateOfBirth,
    educational_background: reqData.education,
    email: reqData.email,
    img_url: reqData.img_url,
  };
  let result = [];
  try {
    const { data, error } = await supabase
      .from("user_profiles")
      .update({
        ...newData,
        email: undefined,
        updated_at: new Date(Date.now()).toISOString(),
      })
      .eq("user_id", newData.user_id)
      .select();
    result = data;
    console.log("Update data1:", data);
    if (error) {
      console.log(`error from supabase when update data1: ${error}`, error);
      return Response.json({
        message: "Cannot update user profile1",
        error,
      });
    }

    const { data: data2, error: error2 } = await supabase
      .from("users")
      .update({ email: newData.email })
      .eq("user_id", newData.user_id);
    //.select();
    console.log(`Update data2:`, data2);
    if (error2) {
      console.log(`error from supabase when update user2: ${error2}`, error2);
      return Response.json({
        message: "Cannot update user profile2",
        error,
      });
    }
    console.log(`data`, data);
  } catch (error) {
    console.log(error);
    return Response.json({
      message: "Cannot update user profile",
      error,
    });
  }

  return Response.json({ message: "Update user profile successfully", result });
}
