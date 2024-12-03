import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

import homeRoute from "./routes/api/home.js";
import loginRoute from "./routes/api/login.js";

app.use("/static", express.static(path.join(__dirname, "statics")));

app.use(express.json());

app.get("/users/:userId", (req, res) => {
  const userId = req.params.userId;
  res.send(`User ID: ${userId}`);
});

app.use("/api", homeRoute);
app.use("/api", loginRoute);

app.get("/file", (req, res) => {
  res.sendFile(path.join(__dirname, "statics/vercel.jpg"));
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  const { name } = req.body;
  res.send(`Welcome ${name}`);
});

app.listen(PORT, () => {
  console.log(`Server is listening at port :${PORT}`);
});
