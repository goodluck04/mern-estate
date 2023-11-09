import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"; 

// it will crash if provide empty body from fronted
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email: email });

    // if user not foud in db
    if (!validUser) return next(errorHandler(404, "User not found!"));

    // if password is not correct => return boolean
    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    // authenticate
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    
    // remove password before sending to client
    // destructure validUser then send data without password
    const { password: pass , ...rest } = validUser._doc; //it will avoid password in res

    
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
