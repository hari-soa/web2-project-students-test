import { Student } from "../models/student.model";

// In-memory storage for students
const students: Student[] = [];

// Get all students
export const findAllStudents = (): Student[] => {
  return students;
};

// Get one student by id
export const findStudentById = (id: number): Student | undefined => {
  return students.find((student) => student.id === id);
};

// Get the next available id
export const getNextId = (): number => {
  return students.length + 1;
};

// Add a new student
export const createStudent = (student: Student): Student => {
  students.push(student);
  return student;
};

// Update a student (replace all fields)
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

// Update a student partially (only the given fields)
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

// Delete a student
export const deleteStudent = (id: number): Student | undefined => {
  const index = students.findIndex((student) => student.id === id);

  if (index === -1) {
    return undefined;
  }

  const deletedStudent = students.splice(index, 1);

  return deletedStudent[0];
};
