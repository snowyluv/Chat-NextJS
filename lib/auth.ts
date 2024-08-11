import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import prisma from "@/lib/prismadb";
import bcrypt from "bcryptjs";

const secretKey = process.env.AUTH_SECRET; 
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("3 hours from now")
    .sign(key);
}
export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}
export async function login(formData: FormData) {
  const identifier = formData.get("identifier")?.toString();
  const password = formData.get("password")?.toString();

  if (!identifier || !password) {
    throw new Error("Identifier and password are required");
  }
  const user = await prisma.user.findFirst({
    where: {
       Username: identifier,
    },
})

  if (!user || !(await bcrypt.compare(password, user.Password))) {
    throw new Error("Invalid identifier or password");
  }
  const expires = new Date(Date.now() + 3 * 60 * 60 * 1000);
  const session = await encrypt({ user: { _id: user.id }, expires });
  cookies().set("auth-session", session, { expires, httpOnly: true, sameSite: "lax", secure: true, });
}

export async function logout() {
  cookies().set("auth-session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("auth-session")?.value;
  if (!session) return null;
  return await decrypt(session);
}