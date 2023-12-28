import { db } from '@/db/prisma';

export const getClassesWithStudents = async (teacherId: number) => {
  return await db.class.findMany({
    where: {
      teachers: {
        some: {
          teacherId,
        },
      },
    },
    include: {
      students: {
        orderBy: {
          surname: 'desc',
        },
        select: {
          id: true,
          name: true,
          surname: true,
        },
      },
    },
  });
};

export const getLastSubmittedAssignments = async (teacherId: number) => {
  try {
    let assignments = await db.assignmentsOnTeachers.findMany({
      where: {
        teacherId,
      },
      take: 5,
      select: {
        assignment: {
          select: {
            name: true,
            id: true,
            slug: true,
            updated_at: true,
          },
        },
      },
      orderBy: {
        assignment: {
          updated_at: 'desc',
        },
      },
    });

    return assignments.flatMap((x) => x.assignment);
  } catch (error) {
    console.error(error);

    return [];
  }
};

export const getLatestNews = async (teacherId: number) => {
  try {
    let news = await db.teacherClassOnNews.findMany({
      where: {
        teacherId,
      },
      take: 5,
      orderBy: {
        news: {
          updated_at: 'desc',
        },
      },
      select: {
        teacher: true,
        news: {
          select: {
            title: true,
            updated_at: true,
            id: true,
          },
        },
      },
    });

    return news.flatMap((x) => x.news);
  } catch (error) {
    console.error(error);

    return [];
  }
};
