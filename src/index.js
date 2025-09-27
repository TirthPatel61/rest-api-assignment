const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

let users = {};

// CREATE user
app.post("/users", (req, res) => {
    const { name, email } = req.body;
    const id = uuidv4();
    users[id] = { id, name, email };
    res.status(201).json(users[id]); // 201 Created
});

// READ user by ID
app.get("/users/:id", (req, res) => {
    const user = users[req.params.id];
    if (!user) return res.status(404).send("User not found"); // 404 for missing
    res.status(200).json(user);
});

// UPDATE user by ID
app.put("/users/:id", (req, res) => {
    const user = users[req.params.id];
    if (!user) return res.status(404).send("User not found"); // 404 for missing
    const { name, email } = req.body;
    users[req.params.id] = { ...user, name: name || user.name, email: email || user.email };
    res.status(200).json(users[req.params.id]); // 200 OK
});

// DELETE user by ID
app.delete("/users/:id", (req, res) => {
    const user = users[req.params.id];
    if (!user) return res.status(404).send("User not found"); // 404 for missing
    delete users[req.params.id];
    res.status(200).send("User deleted"); // 200 OK
});

module.exports = app;
