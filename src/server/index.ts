import express from "express";
import cors from "cors";

import studentRoutes from "../routes/studentRoutes";
import { errorMiddleware } from "../middlewares/error";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API students is working !");
});

app.use(studentRoutes);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});