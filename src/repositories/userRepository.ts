import { pool } from "../configuration/database";
import { User } from "../models/userModel";

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  const { first_name, last_name, email, password } = user;
  const result = await pool.query(
    "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, email",
    [first_name, last_name, email, password],
  );
  return result.rows[0];
};

export const findUserByIdentifier = async (
  identifier: string,
): Promise<User | undefined> => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1 OR LOWER(last_name) = LOWER($1)",
    [identifier],
  );
  return result.rows[0];
};
