import { errorHandler } from "../utils/error.js";
import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.json({ message: "Api Working!" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account"));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        // only these things you canchange
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  // req.user.id get from cookie or session
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "you can only delete your own account"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token").status(200).json("User has been deleted!");
  } catch (error) {}
};
