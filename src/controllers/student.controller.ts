import { Request, Response, NextFunction } from "express";
import * as studentRepository from "../repositories/student.repository";
import { Student } from "../models/student.model";

// GET /students
export const getAllStudents = (req: Request, res: Response) => {
  const students = studentRepository.findAllStudents();
  res.status(200).json(students);
};

// GET /students/:id
export const getStudentById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = Number(req.params.id);

  const student = studentRepository.findStudentById(id);

  if (!student) {
    const error = new Error("student not found");
    (error as any).status = 404;
    return next(error);
  }

  res.status(200).json(student);
};

// POST /students
export const addStudent = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, age, email } = req.body;

  if (!name || !age || !email) {
    const error = new Error("name, age, email required");
    (error as any).status = 400;
    return next(error);
  }

  const newStudent: Student = {
    id: studentRepository.getNextId(),
    name,
    age,
    email,
  };

  studentRepository.createStudent(newStudent);

  res.status(201).json(newStudent);
};

// PUT /students/:id
export const updateStudent = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = Number(req.params.id);

  const existingStudent = studentRepository.findStudentById(id);

  if (!existingStudent) {
    const error = new Error("student not found");
    (error as any).status = 404;
    return next(error);
  }

  const { name, age, email } = req.body;

  if (!name || !age || !email) {
    const error = new Error("fields required");
    (error as any).status = 400;
    return next(error);
  }

  const updatedStudent = studentRepository.updateStudent(id, {
    name,
    age,
    email,
  });

  res.status(200).json(updatedStudent);
};

// PATCH /students/:id
export const updateStudentPartially = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = Number(req.params.id);

  const existingStudent = studentRepository.findStudentById(id);

  if (!existingStudent) {
    const error = new Error("student not found");
    (error as any).status = 404;
    return next(error);
  }

  const { name, age, email } = req.body;

  const updatedStudent = studentRepository.updateStudentPartially(id, {
    name,
    age,
    email,
  });

  res.status(200).json(updatedStudent);
};

// DELETE /students/:id
export const deleteStudent = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = Number(req.params.id);

  const deletedStudent = studentRepository.deleteStudent(id);

  if (!deletedStudent) {
    const error = new Error("student not found");
    (error as any).status = 404;
    return next(error);
  }

  res.status(200).json({
    message: "student deleted",
    student: deletedStudent,
  });
};
