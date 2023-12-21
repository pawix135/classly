"use server";
import { db } from "@/db/prisma";
import { revalidatePath } from "next/cache";
import slugify from "slugify";
import { v4 } from "uuid";

export const createAssignmentAction = async () => {
  let ids = [1, 2, 3, 4, 5];
  let teacherId = 1;

  try {
    await db.$transaction([
      ...ids.map((id) => {
        return db.assignment.create({
          data: {
            deadline: new Date(),
            description: "This is a test assignment",
            name: "Test assignment",
            slug: slugify(`Test assignment-${v4()}`),
            pinned: false,
            teachers: {
              create: {
                teacherId: teacherId,
              },
            },
            start: new Date(),
            status: "NOT_STARTED",
            students: {
              create: {
                studentId: id,
              },
            },
          },
        });
      }),
    ]);
    revalidatePath("/(student)/dashboard");
    return "yas";
  } catch (error) {
    console.log(error);

    return {
      ok: false,
    };
  }
};
