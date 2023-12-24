import "server-only";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_COOKIE_NAME, TEACHER_ACCESS_TOKEN_COOKIE_NAME } from "@/constants";
import { JwtPayload, TeacherJwtPayload, decode } from "jsonwebtoken";
import { redirect } from "next/navigation";

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

// Get teacher data from access token
export const teacherAuth = (): TeacherJwtPayload | null => {
  try {
    let accessToken = cookies().get(TEACHER_ACCESS_TOKEN_COOKIE_NAME);

    if (!accessToken) redirect("/teacher/signin");

    let teacher = decode(accessToken.value);

    return teacher as TeacherJwtPayload;
  } catch (error) {
    return null;
  }
};
