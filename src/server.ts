
import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectToDatabase } from "./config/db";

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
  });
};

startServer();
