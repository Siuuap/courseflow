import { supabase } from "@/utils/db";
import bcrypt from "bcrypt";
import { SignJWT, importJWK } from "jose";
import { cookies } from "next/headers";

export async function POST(request) {
  const req = await request.json();
  //query data form users database
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", req.email);

  //user validation
  if (!users[0]) {
    return Response.json({ message: "user not found" });
  }

  //password validation
  const isValidPassword = await bcrypt.compare(req.password, users[0].password);

  if (!isValidPassword) {
    return Response.json({
      message: "password is not valid",
    });
  }

  const secretJWK = {
    kty: "oct",
    k: process.env.SECRET_KEY,
  };

  const secretKey = await importJWK(secretJWK, "HS256");

  const token = await new SignJWT({
    userId: users[0].user_id,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h") // Token expires in 1 hour
    .sign(secretKey);

  cookies().set("token", token);
  return Response.json({ message: "login successfully", token });
}
