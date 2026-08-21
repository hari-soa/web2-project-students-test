import { Request, Response, NextFunction } from "express";
import * as studentRepository from "../repositories/studentRepository";

export const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const students = await studentRepository.findAllStudents();
    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
};

export const getStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const student = await studentRepository.findStudentById(id);
    if (!student) {
      const error = new Error("Student not found");
      (error as any).status = 404;
      return next(error);
    }
    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
};

export const addStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { first_name, last_name, age, email } = req.body;
    if (!first_name || !last_name || !age || !email) {
      const error = new Error("All fields are required");
      (error as any).status = 400;
      return next(error);
    }
    const newStudent = await studentRepository.createStudent({
      first_name,
      last_name,
      age: Number(age),
      email,
    });
    res.status(201).json(newStudent);
  } catch (error) {
    next(error);
  }
};

export const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const { first_name, last_name, age, email } = req.body;
    const updatedStudent = await studentRepository.updateStudent(id, {
      first_name,
      last_name,
      age: Number(age),
      email,
    });
    if (!updatedStudent) {
      const error = new Error("Student not found");
      (error as any).status = 404;
      return next(error);
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    next(error);
  }
};

export const updateStudentPartially = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const updatedStudent = await studentRepository.updateStudentPartially(
      id,
      req.body,
    );
    if (!updatedStudent) {
      const error = new Error("Student not found");
      (error as any).status = 404;
      return next(error);
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const deletedStudent = await studentRepository.deleteStudent(id);
    if (!deletedStudent) {
      const error = new Error("Student not found");
      (error as any).status = 404;
      return next(error);
    }
    res
      .status(200)
      .json({
        message: "Student deleted successfully",
        student: deletedStudent,
      });
  } catch (error) {
    next(error);
  }
};

export const getAgeStats = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const stats = await studentRepository.getAgeStatistics();
    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};
