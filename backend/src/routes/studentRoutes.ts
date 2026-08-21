import { Router } from "express";
import {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  updateStudentPartially,
  deleteStudent,
  getAgeStats,
} from "../controllers/studentController";
import { registerUser, loginUser } from "../controllers/authController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);

router.use(authenticateToken);
router.get("/students", getAllStudents);
router.get("/students/stats/age", getAgeStats);
router.get("/students/:id", getStudentById);
router.post("/students", addStudent);
router.put("/students/:id", updateStudent);
router.patch("/students/:id", updateStudentPartially);
router.delete("/students/:id", deleteStudent);

export default router;
