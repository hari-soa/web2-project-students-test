import express from "express";
import cors from "cors";
import studentRoutes from "./routes/studentRoutes";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const clientUrl = process.env.CLIENT_URL;
const app = express();
const PORT = process.env.PORT;

app.use(cors({ origin: clientUrl, credentials: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API students is working !");
});
app.use(studentRoutes);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
