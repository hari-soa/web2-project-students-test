import { Request, Response, NextFunction } from "express";
import { students } from "../configuration/data";

// GET /etudiants
export const getStudent = (req: Request, res: Response) => {
  res.status(200).json(students);
};

// GET /etudiants/:id
export const getStudents = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = Number(req.params.id);

  const student = students.find((e) => e.id === id);

  if (!student) {
    const erreur = new Error("students not found");
    (erreur as any).status = 404;
    return next(erreur);
  }

  res.status(200).json(student);
};

// POST /etudiants
export const addStudents = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, age, email } = req.body;

  if (!name || !age || !email) {
    const erreur = new Error("name, age, email requiered");

    (erreur as any).status = 400;

    return next(erreur);
  }

  const newStudent = {
    id: students.length + 1,
    name,
    age,
    email,
  };

  students.push(newStudent);

  res.status(201).json(newStudent);
};

// PUT /etudiants/:id
export const modifyStudents = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = Number(req.params.id);

  const student = students.find((e) => e.id === id);

  if (!student) {
    const erreur = new Error("students not found");
    (erreur as any).status = 404;
    return next(erreur);
  }

  const { name, age, email } = req.body;

  if (!name || !age || !email) {
    const erreur = new Error("champs requiered");

    (erreur as any).status = 400;

    return next(erreur);
  }

  student.name = name;
  student.age = age;
  student.email = email;

  res.status(200).json(students);
};

// PATCH /etudiants/:id
export const modifyPartiallyStudents = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = Number(req.params.id);

  const student = students.find((e) => e.id === id);

  if (!student) {
    const erreur = new Error("Étudiant introuvable");
    (erreur as any).status = 404;
    return next(erreur);
  }

  const { name, age, email } = req.body;

  if (name !== undefined) {
    student.name = name;
  }

  if (age !== undefined) {
    student.age = age;
  }

  if (email !== undefined) {
    student.email = email;
  }

  res.status(200).json(students);
};

// DELETE /etudiants/:id
export const deleteStudents = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = Number(req.params.id);

  const index = students.findIndex((e) => e.id === id);

  if (index === -1) {
    const erreur = new Error("students not found");
    (erreur as any).status = 404;
    return next(erreur);
  }

  const studentDeleted = students.splice(index, 1);

  res.status(200).json({
    message: "student deleted",
    etudiant: studentDeleted[0],
  });
};
