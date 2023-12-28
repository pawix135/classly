'use server';

import { db } from '@/db/prisma';
import { createNewsSlug } from '@/utils/slugs';
import { teacherAuth } from '@/utils/useAuth';
import { CreateNewsSchema } from '@/validators/teacher/news';
import { revalidatePath } from 'next/cache';

export const CreateNewsAction = async (state: any, formData: FormData) => {
  try {
    let teacher = teacherAuth();

    if (!teacher) {
      revalidatePath('/teacher/dashboard');
      return {
        success: false,
        date: new Date(),
      };
    }
    console.log(teacher);

    let validated = CreateNewsSchema.parse(Object.fromEntries(formData));
    console.log(validated);

    await db.news.create({
      data: {
        content: validated.content,
        slug: createNewsSlug(validated.title),
        title: validated.title,
        class: {
          create: {
            classId: parseInt(validated.classId),
            teacherId: teacher.id,
          },
        },
      },
    });

    revalidatePath('/teacher/dashboard');
    return {
      success: true,
      date: new Date(),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      errors: [{ path: ['title'], message: 'Error' }],
      date: new Date(),
    };
  }
};
