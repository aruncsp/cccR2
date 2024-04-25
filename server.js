const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [
  { id: 1, name: "Arun", email: "a@a.com", phone: 123 },
  { id: 2, name: "Kumar", email: "k@a.com", phone: 456 },
  { id: 3, name: "Kabali", email: "ka@a.com", phone: 789 },
];

// get all users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// get user by id
app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: `user not found` });
  }
});

// save user
app.post("/api/users", (req, res) => {
  const { name, email, phone } = req.body;
  const id = users.length + 1;
  users.push({ id, name, email, phone });
  res.status(201).json({ id, name, email, phone });
});

// update user
app.put("/api/users/:name", (req, res) => {
  const name = req.params.name;
  const user = users.find((user) => user.name === name);

  if (user) {
    const { name, email, phone } = req.body;
    user.name = name;
    user.email = email;
    user.phone = phone;
    res.json(user);
  } else {
    res.status(404).json({ message: `User ${name} not found` });
  }
});

// delete user
app.delete("/api/users/:name", (req, res) => {
  const name = req.params.name;
  const index = users.findIndex((user) => {
    return user.name === name;
  });

  if (index > -1) {
    users.splice(index, 1);
    res.json({ message: `user ${name} deleted` });
  } else {
    res.status(404).json({ message: `user ${name} not found` });
  }
});
app.listen(5001, () => {
  console.log("Server is running in port 5001");
});
