import express from "express";

import studentsRoot from "../root/root";
import { errorMiddleware } from "../errors/errors";

const app = express();

const PORT = 3000;

app.use(express.json());

app.use(studentsRoot);

app.use(errorMiddleware);

app.listen(PORT, () => {
  const PORT: 3000 = 3000;
  console.log(`Server running in http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("API students is working !");
});
