import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

//Signup controller
export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password)
      return res.status(400).json({ message: "Please enter all fields!" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters" });

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists!" });

    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();

    generateToken(newUser._id, res);
    return res.status(201).json({
      message: "User created successfully!",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//Login controller
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({ message: "Please enter all fields!" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials!" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials!" });

    generateToken(user._id, res);
    return res.status(200).json({
      message: "Log in successful!",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//Profile controller
export const profile = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    console.log("Error in profile controller", error.message);
    res.status(400).json({ message: "User not found" });
  }
};

//Update Profile controller
export const updateProfile = async (req, res) => {
  const { username, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).json({ message: "User not found" });

    if (username) user.username = username;

    if (currentPassword && newPassword) {
      const isMatch = await user.matchPassword(currentPassword);
      if (!isMatch)
        return res
          .status(401)
          .json({ message: "Current password is incorrect" });

      user.password = newPassword;
    }

    const updatedUser = await user.save();
    return res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
    });
  } catch (error) {
    console.log("Error in update profile controller", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};

//Logout controller
export const logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    maxAge: 0,
  });
  res.status(200).json({ message: "Logged out successfully!" });
};
