import { db } from "@/db/prisma";

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
        select: {
          id: true,
          name: true,
          surname: true,
        },
      },
    },
  });
};
