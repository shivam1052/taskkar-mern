import express from "express";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import { checkAuth } from "../middleware/authMiddleware.js";

const route = express.Router();
