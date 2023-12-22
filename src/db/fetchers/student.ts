"server only";
import { db } from "@/db/prisma";

export const getStudentInfo = async (id: number) => {
  const data = await db.student.findFirst({
    where: {
      id: id,
    },
    select: {
      assignments: {
        include: {
          assignment: {
            select: {
              pinned: true,
              name: true,
              status: true,
              updated_at: true,
              grade: true,
            },
          },
        },
      },
      _count: {
        select: {
          assignments: true,
        },
      },
    },
    take: 5,
  });
  return data;
};

export const getClassNews = async (
  classId: number,
  take?: number,
  order?: "asc" | "desc"
) => {
  return await db.teacherClassOnNews.findMany({
    where: {
      classId,
    },
    include: {
      news: true,
    },
    orderBy: {
      news: {
        updated_at: order,
      },
    },
    take,
  });
};
