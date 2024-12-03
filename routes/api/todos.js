const express = require("express");

const {
  bulkDelete,
  createTodo,
  deleteTodo,
  getSingleTodo,
  getTodos,
  staticSuggests,
  updateTodo,
} = require("../../controllers/todos.js");

const router = express.Router();

router.get("/todos", getTodos);
router.post("/todos", createTodo);
router.get("/todo/:id", getSingleTodo);
router.put("/todo/:id", updateTodo);
router.delete("/todo/:id", deleteTodo);
router.delete("/todos/bulk-delete", bulkDelete);
// static suggestions
router.get("/suggestions", staticSuggests);

module.exports = router;
