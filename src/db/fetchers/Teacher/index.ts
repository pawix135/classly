import { db } from '@/db/prisma';
import { teacherAuth } from '@/utils/useAuth';

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

export const getAssignmentsForStudent = async ({
  classId,
  studentId,
}: {
  studentId: number;
  classId: number;
}) => {
  try {
    let teacher = teacherAuth();

    if (!teacher) throw Error('Not authenticated');

    let assignments = await db.assignment.findMany({
      orderBy: {
        grade: 'asc',
      },
      where: {
        students: {
          some: {
            studentId,
          },
        },
        AND: {
          teachers: {
            some: {
              teacherId: teacher.id,
            },
          },
        },
      },
    });

    return assignments;
  } catch (error) {
    console.error(error);

    return [];
  }
};

export const getStudentById = async (studentId: number, classId: number) => {
  try {
    let teacher = teacherAuth();
    if (!teacher) throw Error('Not authenticated');

    let student = await db.student.findFirst({
      where: {
        id: studentId,
        classId: classId,
      },
      select: {
        name: true,
        surname: true,
        id: true,
        class: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
    return student;
  } catch (error) {
    return null;
  }
};
