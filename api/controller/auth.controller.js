import user from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
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

//signup contrroller

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "all fields are required"));
  }
  try {
    const validUser = await user.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, "Invald creditinals"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(404, "Invald creditinals"));
    }

    const token = jwt.sign(
      {
        id: validUser._id,
      },
      process.env.jwt_key
    );

    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json({
        ...rest,
      });
  } catch (error) {
    next(error);
  }
};
