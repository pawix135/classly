"use server";

import { TEACHER_ACCESS_TOKEN_COOKIE_NAME } from "@/constants";
import { db } from "@/db/prisma";
import { createTeacherAccessToken } from "@/utils/tokens";
import { TeacherSignInSchema } from "@/validators/teacher/auth";
import { compare, hash } from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

// Sign in teacher
export const TeacherSignInAction = async (state: any, formdata: FormData) => {
  try {
    let validated = TeacherSignInSchema.parse(Object.fromEntries(formdata));

    // Find teacher in database
    let teacher = await db.teacher.findFirst({
      where: {
        username: validated.username,
      },
    });

    // If teacher doesn't exist, return error
    if (!teacher) {
      return {
        errors: [{ path: "username", message: "Invalid username" }],
        auth: false,
      };
    }

    // If teacher exists, compare password
    if (!(await compare(validated.password, teacher.hash))) {
      return {
        auth: false,
        errors: [{ path: ["password"], message: "Invalid password" }],
      };
    }

    let accessToken = createTeacherAccessToken({
      id: teacher.id,
      username: teacher.username,
      name: teacher.name,
      surname: teacher.surname,
    });

    // Set access token as cookie
    cookies().set(TEACHER_ACCESS_TOKEN_COOKIE_NAME, accessToken, {
      httpOnly: true,
      path: "/",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
    });
  } catch (error) {
    console.debug(error);

    // If error is a zod error, return error
    if (error instanceof z.ZodError) {
      return {
        auth: false,
        errors: error.issues.map((issue) => ({
          path: issue.path,
          message: issue.message,
        })),
      };
    }

    // Something else went wrong, return internal server error
    return {
      auth: false,
      errors: [{ path: ["internal_error"], message: "Internal server error" }],
    };
  }

  // Successful sign in, redirect to dashboard
  redirect("/teacher/dashboard");
};

// TODO: Implement teacher account recovery
export const TeacherForgotPasswordAction = async (state: any, formData: FormData) => {
  console.log("TODO: Implement teacher account recovery");

  return {
    auth: false,
    errors: [{ path: ["email"], message: "Invalid email" }],
  };
};

// Sign out teacher
export const TeacherSignOutAction = async () => {
  cookies().delete(TEACHER_ACCESS_TOKEN_COOKIE_NAME);
  redirect("/");
};
