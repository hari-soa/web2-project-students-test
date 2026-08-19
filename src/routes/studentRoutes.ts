import { Router } from "express";

import {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  updateStudentPartially,
  deleteStudent,
} from "../controllers/studentController";

const router = Router();

router.get("/students", getAllStudents);

router.get("/students/:id", getStudentById);

router.post("/students", addStudent);

router.put("/students/:id", updateStudent);

router.patch("/students/:id", updateStudentPartially);

router.delete("/students/:id", deleteStudent);

export default router;
