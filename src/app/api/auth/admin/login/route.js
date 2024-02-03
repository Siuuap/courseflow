import { supabase } from "@/utils/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export async function POST(request) {
  const { email, password } = await request.json();

  // ให้ Supabase ไปหา data
  const { data, error } = await supabase
    .from("admins")
    .select("*")
    .eq("email", email);
  if (error) {
    return Response.json({ message: "Login Fail", error });
  }

  // เมื่อได้ data ให้เอา data[0] ไปเก็บไว้ในตัวแปร adminData
  const adminData = data[0];
  // ถ้ากรอก email ที่ไม่มีใน data base ให้ส่ง This email does not exist. กลับไป
  if (!adminData) {
    return Response.json({
      message: "Login Fail, wrong username or password",
      status: 401,
    });
  }

  // ผ่านขั้นที่ตรวจสอบอีเมลมาแล้ว หากกรอกรหัสผ่านผิดแล้ว เอารหัสผ่านที่ส่งมา กับรหัสผ่านที่อยู่ใน database มาเปรียบเทียบกัน
  const match = await bcrypt.compare(password, adminData.password);
  // ถ้าไม่ match ส่ง "Login Fail, wrong password" กลับไป
  if (!match) {
    return Response.json({
      message: "Login Fail, wrong username or password",
      status: 401,
    });
  }

  // สร้าง JWT Token
  const token = jwt.sign({ email, role: "admin" }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });

  return Response.json({ message: "Login Successfully", token });
}
