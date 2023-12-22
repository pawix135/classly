import "server-only";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_COOKIE_NAME } from "@/constants";
import { JwtPayload, decode } from "jsonwebtoken";

// Get student data from access token
export const studentAuth = (): JwtPayload | null => {
  try {
    let accessToken = cookies().get(ACCESS_TOKEN_COOKIE_NAME);

    if (!accessToken) return null;

    let student = decode(accessToken.value);

    return student as JwtPayload;
  } catch (error) {
    return null;
  }
};
