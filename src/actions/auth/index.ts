"use server";

import { db } from "@/db/prisma";
import { createAccessToken } from "@/utils/tokens";
import { SignInSchema } from "@/validators/user/auth";
import { compare } from "bcrypt";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_COOKIE_NAME } from "@/constants";

export const signInAction = async (formData: FormData) => {
  try {
    // Validate user input
    let validated = SignInSchema.parse(Object.fromEntries(formData));

    // Find user in database
    let student = await db.student.findFirst({
      where: {
        username: validated.username,
      },
    });

    // If student doesn't exist, return error
    if (!student) {
      return {
        auth: false,
      };
    }

    // If student exists, compare password
    if (!(await compare(validated.password, student.hash))) {
      return {
        auth: false,
        message: "Invalid password",
      };
    }

    // Create access token for student
    let accessToken = createAccessToken({
      id: student.id,
      username: student.username,
      name: student.name,
      surname: student.surname,
      classId: student.classId,
    });

    // Set access token as cookie
    cookies().set(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
      httpOnly: true,
      path: "/",
      expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days,
    });
  } catch (error) {
    console.log(error);
    return {
      auth: false,
      message: "Something went wrong.",
    };
  }

  // If student signed in successfully, redirect to dashboard
  redirect("../dashboard");
};

export const signOutAction = async () => {
  // Remove access token cookie
  cookies().delete(ACCESS_TOKEN_COOKIE_NAME);

  // Redirect to home page
  redirect("/");
};
