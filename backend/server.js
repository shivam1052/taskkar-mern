import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import dns from "dns";
import connectDB from "./config/db.js";
// import userRoutes from "./routes/userRoutes.js";
// import taskRoutes from "./routes/taskRoutes.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

connectDB();
