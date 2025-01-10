import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/userModel.js";

export const register = async (req, res) => {
  const { email, password, name } = req.body;
  const lowerCaseEmail = email.toLowerCase();

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await createUser({
      email: lowerCaseEmail,
      password: hashedPassword,
      name,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json("User already exists");
  }

  ///////////////
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }
  // Mock response for registration
  res.status(201).json({ message: "User registered successfully." });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const lowerCaseEmail = email.toLowerCase();
  const user = await findUserByEmail(lowerCaseEmail);
  if (!user) {
    return res.status(404).json({ error: "Invalid email or password" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(404).json({ error: "Invalid email or password" });
  }
  const token = jwt.sign({ userId: user.id }, "your_jwt_secret", {
    expiresIn: "1h",
  });
  res.json({ token });
};

// module.exports = {
//   register,
//   login,
// };
