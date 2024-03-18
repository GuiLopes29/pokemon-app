import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import morgan from "morgan";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

app.use(morgan("dev")); // Log HTTP requests
app.use(cors()); // Enable CORS

app.use("/", authRoutes);

export default app;
