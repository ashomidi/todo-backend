import { v4 as uuidv4 } from "uuid";
import { users } from "../users.js";

export const createUser = (req, res) => {
  const user = req.body;
  const userId = uuidv4();
  const userWithId = { id: userId, ...user };

  users.push(userWithId);
  res.json({ message: "User added", users });
};

export const getSingleUser = (req, res) => {
  const foundUser = users.find((user) => user.id == req.params.id);
  if (foundUser) {
    res.json(foundUser);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export const deleteUser = (req, res) => {
  const userId = req.params.id;
  const userIndex = users.findIndex((user) => user.id == userId);
  console.log(userIndex);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.json({ message: `User with id ${userId} deleted`, users: users });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export const changeUser = (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id == id);

  const { name, lastName, age } = req.body;

  if (user) {
    if (name) user.name = name;
    if (lastName) user.lastName = lastName;
    if (age) user.age = age;

    res.json(user);
  } else {
    return res.status(404).json({ message: "user not found." });
  }
};
