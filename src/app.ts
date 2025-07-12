
import express from "express";
import cors from "cors";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { authRoutes } from "./modules/auth/auth.routes";
import cookieParser from "cookie-parser";

const app = express();

// Middlewares
app.use(cookieParser())

app.use(cors());
app.use(express.json());

// Sample route
app.get("/", (_, res) => {
  res.send("API is running...");
});


app.use('/api',authRoutes);
app.use(globalErrorHandler)
export default app;
