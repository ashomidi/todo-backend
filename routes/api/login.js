import express from "express";
const router = express.Router();

router.get("/login", (req, res) => {
  res.json({ message: "You're in login page." });
});

export default router;