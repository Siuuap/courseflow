import { supabase } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { useSearchParams } from "next/navigation";
import multer from "multer";
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;

  const search = searchParams.get("search");

  const page = searchParams.get("page") || 1;

  const limit = 10;
  const start = (page - 1) * limit;
  const end = start + limit - 1;

  console.log(search);
  const { data, error } = search
    ? await supabase
        .from("courses")
        .select("* , lessons(*)")
        .ilike("name", `%${search}%`)
        .limit(limit)
    : await supabase.from("courses").select("* , lessons(*)").range(start, end);

  if (error) {
    console.error(error);
    throw new Error("Courses can not be reach");
  }
  return NextResponse.json(
    { message: "Fetching Successfully", data },
    { status: 200 }
  );
}

export async function POST(request) {
  const reqData = await request.json();
  console.log(reqData);
  const query = {
    name: reqData.courseName,
    description: reqData.courseDetail,
    price: Number(reqData.price).toFixed(2),
    length: Number(reqData.duration),
    img_url: reqData.imgUrl,
    video_url: reqData.videoUrl,
    attach_file: reqData.attachFile,
  };
  console.log(query);
  const { data, error } = await supabase.from("courses").insert(query);

  if (error) {
    return Response.json({
      message: "Cannot create new course",
      error,
    });
  }
  return Response.json({
    message: "Create new course successfully",
    newCourse: reqData,
  });
}

// import { supabase } from "@/utils/db.js";
// import { NextResponse } from "next/server";
// import { useSearchParams } from "next/navigation";

// export async function GET(request, { params }) {
//   const searchParams = request.nextUrl.searchParams;
//   const search = searchParams.get("search");
//   console.log(search);
//   const { data, error } = await supabase
//     .from("courses_test")
//     .select("* , lessons_test (name)")
//     .ilike("name", `%${search}%`);

//   if (error) {
//     console.error(error);
//     throw new Error("Courses can not be reach");
//   }
//   return NextResponse.json({ data });
// }
