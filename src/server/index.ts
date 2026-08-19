import express from "express";

import studentRoutes from "./routes/student.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API students is working !");
});

app.use(studentRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
