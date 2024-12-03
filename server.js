const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const todosRouter = require("./routes/api/todos.js");
const suggestionsRouter = require("./routes/api/suggestions.js");

const app = express();
const PORT = 5001;

//middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api", todosRouter);
app.use("/api", suggestionsRouter);

app.listen(PORT, (req, res) => {
  console.log(`Server is listening on port ${PORT}`);
});
