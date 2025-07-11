
import express from "express";
import cors from "cors";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Sample route
app.get("/", (_, res) => {
  res.send("API is running...");
});


app.use('/api',authRoutes);
app.use(globalErrorHandler)
export default app;
