'use server';

import { db } from '@/db/prisma';
import { createAssignmentSlug } from '@/utils/slugs';
import { CreateAssignmentSchema } from '@/validators/teacher/assignments';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const createAssignment = async (state: any, formData: FormData) => {
  try {
    let validated = CreateAssignmentSchema.parse(Object.fromEntries(formData));

    console.log(validated);

    let students = await db.student.findMany({
      where: {
        classId: parseInt(validated.classId),
      },
      select: {
        id: true,
      },
    });

    let data = await db.$transaction([
      ...students.map((student: any) => {
        return db.assignment.create({
          data: {
            name: validated.name,
            description: validated.description,
            deadline: new Date(),
            start: new Date(),
            slug: createAssignmentSlug(validated.name),
            students: {
              create: {
                studentId: student.id,
              },
            },
            teachers: {
              create: {
                teacherId: parseInt(validated.teacherId),
              },
            },
          },
        });
      }),
    ]);

    console.log(data);

    revalidatePath('/(teacher)/teacher/dashboard');

    return {
      success: true,
      errors: undefined,
    };
  } catch (error) {
    console.log(error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.issues.map((issue) => ({
          path: issue.path as any,
          message: issue.message,
        })),
      };
    }
    return {
      success: false,
      errors: [{ path: ['internal_error'], message: 'Something went wrong!' }],
    };
  }

  return null;
};
