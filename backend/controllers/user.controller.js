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
    let userId = req.params.id;
    const user = await User.findById(req.params.id).select(
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
