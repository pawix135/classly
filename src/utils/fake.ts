import { Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { db } from '@/db/prisma';
import { v4 } from 'uuid';

export const fakeCall = async (time: number) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res('done');
    }, time);
  });
};

export const generateFakeStudent = (classId: number) => {
  let student: Prisma.StudentCreateManyInput = {
    name: faker.person.firstName(),
    surname: faker.person.lastName(),
    email: faker.internet.email(),
    hash: '$2b$10$RfJUZPOq8crvZ07WAtiDN.SYmtu/Labm0ZvVMREZz.FKwtz66iS0C',
    username: faker.internet.userName(),
    classId: classId,
  };
  return student;
};

export const generateFakeTeacher = () => {
  let teacher: Prisma.TeacherCreateInput = {
    name: faker.person.firstName(),
    surname: faker.person.lastName(),
    email: v4() + '@wp.pl',
    hash: '$2b$10$RfJUZPOq8crvZ07WAtiDN.SYmtu/Labm0ZvVMREZz.FKwtz66iS0C',
    username: faker.internet.userName(),
  };
  return teacher;
};

export const generateFakeClass = (teacherId: number) => {
  let newClass: Prisma.ClassCreateInput = {
    name: faker.lorem.word(),
    supervisor: {
      connect: {
        id: teacherId,
      },
    },
  };
  return newClass;
};

export const generateDatabaseExample = async () => {
  let fakeTeachers: { data: Prisma.TeacherCreateInput }[] = [];

  for (let i = 0; i < 2; i++) {
    fakeTeachers.push({
      data: generateFakeTeacher(),
    });
  }

  let create = await prisma?.$transaction(async (ctx) => {
    let createdTeachers = await Promise.all([
      ctx.teacher.create(fakeTeachers[0]),
      ctx.teacher.create(fakeTeachers[1]),
    ]);

    let createdClasses = await Promise.all([
      ctx.class.create({
        data: generateFakeClass(createdTeachers[0].id),
      }),
      ctx.class.create({
        data: generateFakeClass(createdTeachers[1].id),
      }),
    ]);

    await ctx.classesOnTeachers.createMany({
      data: [
        { classId: createdClasses[0].id, teacherId: createdTeachers[0].id },
        { classId: createdClasses[1].id, teacherId: createdTeachers[1].id },
      ],
    });

    let fakeStudentsOne: Prisma.StudentCreateManyInput[] = [];
    let fakeStudentsTwo: Prisma.StudentCreateManyInput[] = [];

    for (let i = 0; i < 30; i++) {
      fakeStudentsOne.push(generateFakeStudent(createdClasses[0].id));
      fakeStudentsTwo.push(generateFakeStudent(createdClasses[1].id));
    }
    let createdStudents = await Promise.all([
      ctx.student.createMany({
        data: fakeStudentsOne,
      }),
      ctx.student.createMany({
        data: fakeStudentsTwo,
      }),
    ]);

    return true;
  });
};
