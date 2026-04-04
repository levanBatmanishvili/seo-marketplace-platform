import argon2 from "argon2";
import User from "../models/user.model.js";
import { generateToken } from "../utils/jwt.js";

export async function register(req, res) {
  try {
    const { email, password, role } = req.validatedData;

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already in use.",
      });
    }

    const hashedPassword = await argon2.hash(password);

    const user = await User.create({
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.validatedData;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const token = generateToken({
      id: user.id,
      role: user.role,
    });

    return res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }
}