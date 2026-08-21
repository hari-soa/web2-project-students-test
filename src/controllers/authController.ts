import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepository from "../repositories/userRepository";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
      const error = new Error("All fields are required");
      (error as any).status = 400;
      return next(error);
    }
    const existingUser = await userRepository.findUserByIdentifier(email);
    if (existingUser) {
      const error = new Error("User already registered with this email");
      (error as any).status = 400;
      return next(error);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userRepository.createUser({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { identifier, password } = req.body;

    // Recherche uniquement parmi les utilisateurs enregistrés en base
    const user = await userRepository.findUserByIdentifier(identifier);

    if (!user || !(await bcrypt.compare(password, user.password!))) {
      const error = new Error("Unauthorized access. Invalid credentials.");
      (error as any).status = 401;
      return next(error);
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: `${user.first_name} ${user.last_name}`,
      },
      process.env.JWT_SECRET || "default_secret_key",
      { expiresIn: "8h" },
    );

    res.status(200).json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    next(error);
  }
};
