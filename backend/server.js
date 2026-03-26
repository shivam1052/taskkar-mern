import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import dns from "dns";
import connectDB from "./config/db.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

connectDB();
