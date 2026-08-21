import express from "express";
import cors from "cors";

import studentRoutes from "../routes/studentRoutes";
import { errorMiddleware } from "../middlewares/error";

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API students is working !");
});

app.use(studentRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
