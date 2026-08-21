import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import { pool } from "../configuration/database";

const seedTeachers = async () => {
  try {
    const schemaPath = path.join(__dirname, "schema.sql");
    const schemaSql = fs.readFileSync(schemaPath, "utf8");
    await pool.query(schemaSql);
    console.log("Database schema initialized successfully.");

    const defaultPassword = await bcrypt.hash("Teacher2026!", 10);

    const authorizedTeachers = [
      { first_name: "Rakoto", last_name: "Koto", email: "rakoto@gmail.com" },
      { first_name: "Rabe", last_name: "Rindra", email: "rabe@gmail.com" },
    ];

    for (const teacher of authorizedTeachers) {
      await pool.query(
        `INSERT INTO users (first_name, last_name, email, password)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (email) DO NOTHING`,
        [teacher.first_name, teacher.last_name, teacher.email, defaultPassword],
      );
    }

    console.log("Authorized teachers injected successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedTeachers();
