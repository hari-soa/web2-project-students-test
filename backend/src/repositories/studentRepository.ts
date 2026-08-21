import { pool } from "../configuration/database";
import { Student, AgeStatistic } from "../models/studentModel";

export const findAllStudents = async (): Promise<Student[]> => {
  const result = await pool.query("SELECT * FROM students ORDER BY id ASC");
  return result.rows;
};

export const findStudentById = async (
  id: number,
): Promise<Student | undefined> => {
  const result = await pool.query("SELECT * FROM students WHERE id = $1", [id]);
  return result.rows[0];
};

export const createStudent = async (
  student: Omit<Student, "id">,
): Promise<Student> => {
  const { first_name, last_name, age, email } = student;
  const result = await pool.query(
    "INSERT INTO students (first_name, last_name, age, email) VALUES ($1, $2, $3, $4) RETURNING *",
    [first_name, last_name, age, email],
  );
  return result.rows[0];
};

export const updateStudent = async (
  id: number,
  data: Omit<Student, "id">,
): Promise<Student | undefined> => {
  const { first_name, last_name, age, email } = data;
  const result = await pool.query(
    "UPDATE students SET first_name = $1, last_name = $2, age = $3, email = $4 WHERE id = $5 RETURNING *",
    [first_name, last_name, age, email, id],
  );
  return result.rows[0];
};

export const updateStudentPartially = async (
  id: number,
  data: Partial<Omit<Student, "id">>,
): Promise<Student | undefined> => {
  const currentStudent = await findStudentById(id);
  if (!currentStudent) return undefined;

  const result = await pool.query(
    "UPDATE students SET first_name = COALESCE($1, first_name), last_name = COALESCE($2, last_name), age = COALESCE($3, age), email = COALESCE($4, email) WHERE id = $5 RETURNING *",
    [data.first_name, data.last_name, data.age, data.email, id],
  );
  return result.rows[0];
};

export const deleteStudent = async (
  id: number,
): Promise<Student | undefined> => {
  const result = await pool.query(
    "DELETE FROM students WHERE id = $1 RETURNING *",
    [id],
  );
  return result.rows[0];
};

export const getAgeStatistics = async (): Promise<AgeStatistic[]> => {
  const result = await pool.query(
    "SELECT age, COUNT(*)::int AS count FROM students GROUP BY age ORDER BY age ASC",
  );
  return result.rows;
};
