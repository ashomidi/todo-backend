const pool = require("../db.js");

const suggestions = [
  "Buy groceries",
  "Complete the report",
  "Schedule a meeting",
  "Call a friend",
  "Clean the house",
];

const createTodo = async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.status(200).json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
};

const getTodos = async (req, res) => {
  try {
    const todos = await pool.query("SELECT * FROM todo");
    if (todos.rows.length == 0) {
      return res.status(200).json({ message: "No todos available yet!" });
    }
    res.json(todos.rows);
  } catch (error) {
    console.error(error.message);
  }
};

const getSingleTodo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Todo ID is required" });
    }

    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);

    if (todo.rows.length === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const newDate = new Date();
    const { id } = req.params;
    const { description, is_done } = req.body;

    // Ensure at least one field is provided
    if (description === undefined && is_done === undefined) {
      return res
        .status(400)
        .json({ message: "At least one field is required to update" });
    }

    // Build query dynamically based on provided fields
    let query = "UPDATE todo SET ";
    const values = [];
    let paramIndex = 1;

    if (description !== undefined) {
      query += `description = $${paramIndex++}, `;
      values.push(description);
    }
    if (is_done !== undefined) {
      query += `is_done = $${paramIndex++}, `;
      values.push(is_done);
    }

    query += `modified_at = $${paramIndex++}, `;
    values.push(newDate);

    query = query.slice(0, -2) + ` WHERE todo_id = $${paramIndex} RETURNING *`;
    values.push(id);

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(result.rows[0]);
    console.log(query);
    console.log(values);
    console.log(newDate);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1",
      [id]
    );
    if (deletedItem.rowCount === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error!");
  }
};

const bulkDelete = async (req, res) => {
  const { ids } = req.body;
  try {
    const result = await pool.query(
      "DELETE FROM todo WHERE todo_id = ANY($1::int[]) RETURNING *",
      [ids]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No todos found to delete" });
    }
    res.json({
      message: "Todos deleted successfully",
      deletedTodos: result.rows,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// static suggestions
const staticSuggests = async (req, res) => {
  try {
    res.json(suggestions);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error generating todos" });
  }
};

module.exports = {
  createTodo,
  getTodos,
  getSingleTodo,
  updateTodo,
  deleteTodo,
  bulkDelete,
  staticSuggests
};
