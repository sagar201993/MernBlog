import user from "../models/user.model.js";
import bcryptjs from "bcryptjs";
export const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password || username === "" || password === "") {
    return res.status(400).json({
      message: "all fields are required",
    });
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
    res.status(500).json({
      message: error.message,
    });
  }
};
