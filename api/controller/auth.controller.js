import user from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password || username === "" || password === "") {
    next(errorHandler(400, "all fields are required"));
  }

  const hashPassword = bcryptjs.hashSync(password, 10);
  const newUser = new user({
    username,
    email,
    password: hashPassword,
  });

  try {
    await newUser.save();
    res.json({
      message: "signup succesfull",
    });
  } catch (error) {
    next(error);
  }
};
