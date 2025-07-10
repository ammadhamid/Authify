import app from "./app";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();
connectDB().then(() => {
  app.listen(8000, () => {
    console.log(`Server is running on port: http://localhost:8000`);
  });
});


