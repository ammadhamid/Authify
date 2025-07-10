import express, { Request, Response } from "express";
import cors from "cors";
import userRoutes from "./routes/index.routes"

const app = express();
app.use(cors());
app.use(express.json());

app.use(userRoutes)

export default app;
 