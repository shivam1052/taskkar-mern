import express from "express";
import { checkAuth } from "../middleware/authMiddleware.js";
import {
  signup,
  login,
  profile,
  updateProfile,
  logout,
} from "../controllers/authController.js";

const route = express.Router();

//signup route
route.post("/signup", signup);

//login route
route.post("/login", login);

//logout route
route.post("/logout", logout);

//profile route
route.get("/profile", checkAuth, profile);

//update profile
route.put("/profile", checkAuth, updateProfile);

export default route;
