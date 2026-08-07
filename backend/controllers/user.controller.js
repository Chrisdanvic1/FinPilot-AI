import mongoose from "mongoose";
import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      message: "All users",
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Check if the variable is missing or evaluated as a string "undefined"
    if (!userId || userId === "undefined") {
      return res.status(400).json({
        success: false,
        message: "User ID is required and cannot be undefined.",
      });
    }

    // Check if it's a valid 24-character MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid User ID format." });
    }

    const user = await User.findById(userId).select(
      "-password -theme -currency",
    );

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: `User by id ${userId} found `,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
