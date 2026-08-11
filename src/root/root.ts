import { Router } from "express";

import {
  getStudent,
  getStudents,
  addStudents,
  modifyStudents,
  modifyPartiallyStudents,
  deleteStudents,
} from "../functions/functions";

const router = Router();

router.get("/students", getStudent);

router.get("/students/:id", getStudents);

router.post("/students", addStudents);

router.put("/students/:id", modifyStudents);

router.patch("/students/:id", modifyPartiallyStudents);

router.delete("/students/:id", deleteStudents);

export default router;
