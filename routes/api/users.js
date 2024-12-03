import express from "express";
import { users } from "../../users.js";

import {
  changeUser,
  createUser,
  deleteUser,
  getSingleUser,
} from "../../controllers/users.js";

const router = express.Router();

router.get("/users", (req, res) => {
  res.json(users);
});

router.post("/users", createUser);
router.get("/user/:id", getSingleUser);
router.delete("/user/:id", deleteUser);
router.patch("/user/:id", changeUser);

export default router;
