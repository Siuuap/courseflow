import { supabase } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req, { params }) {
  const searchParams = req.nextUrl.searchParams;
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const limit = 8;

  try {
    const { data: allData } = await supabase
      .from("assignments")
      .select("*")
      .ilike("question", `%${search}%`);

    const maxPage = Math.ceil(allData.length / limit);

    const { data, error } = await supabase
      .from("assignments")
      .select("*, sub_lessons(*, lessons(*, courses(*)))")
      .ilike("question", `%${search}%`)
      .order("created_at", { ascending: false })
      .range(limit * (page - 1), limit * page - 1);

    return Response.json({ maxPage: maxPage, data });
  } catch {
    return Response.json(
      { message: "error while fetching data" },
      { status: 404 }
    );
  }
}
