import { supabase } from "@/utils/db";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;

  const search = searchParams.get("search");
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;

  const start = (page - 1) * limit;
  const end = start + limit - 1;

  console.log(search);
  const { data, error } = search
    ? await supabase
        .from("courses")
        .select("* , lessons(*)")
        .ilike("name", `%${search}%`)
        .order("updated_at", { ascending: false })
    : await supabase
        .from("courses")
        .select("* , lessons(*)")
        .range(start, end)
        .order("updated_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Courses can not be reach");
  }
  return NextResponse.json(
    { message: "Fetching Successfully", page: data.length },
    { status: 200 }
  );
}
