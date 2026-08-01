import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User Name is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, "User Email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      minLength: 5,
      maxLength: 255,
      match: [/\S@\S+\.\S+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: [true, "User Password is required"],
      trim: true,
      minLength: 6,
      maxLength: 255,
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP", "NGN"],
      default: "NGN",
    },
    theme: {
      type: String,
      enum: ["dark", "light"],
      default: "dark",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
