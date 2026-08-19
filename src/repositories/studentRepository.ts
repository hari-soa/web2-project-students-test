import { Student } from "../models/studentModel";

const students: Student[] = [];

export const findAllStudents = (): Student[] => {
  return students;
};

export const findStudentById = (id: number): Student | undefined => {
  return students.find((student) => student.id === id);
};

export const getNextId = (): number => {
  return students.length + 1;
};

export const createStudent = (student: Student): Student => {
  students.push(student);
  return student;
};

export const updateStudent = (
  id: number,
  data: { name: string; age: number; email: string },
): Student | undefined => {
  const student = findStudentById(id);

  if (!student) {
    return undefined;
  }

  student.name = data.name;
  student.age = data.age;
  student.email = data.email;

  return student;
};

export const updateStudentPartially = (
  id: number,
  data: Partial<Omit<Student, "id">>,
): Student | undefined => {
  const student = findStudentById(id);

  if (!student) {
    return undefined;
  }

  if (data.name !== undefined) {
    student.name = data.name;
  }

  if (data.age !== undefined) {
    student.age = data.age;
  }

  if (data.email !== undefined) {
    student.email = data.email;
  }

  return student;
};

export const deleteStudent = (id: number): Student | undefined => {
  const index = students.findIndex((student) => student.id === id);

  if (index === -1) {
    return undefined;
  }

  const deletedStudent = students.splice(index, 1);

  return deletedStudent[0];
};
