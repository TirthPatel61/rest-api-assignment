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
    res.status(201).json(users[id]);
});

// READ user by ID
app.get("/users/:id", (req, res) => {
    const user = users[req.params.id];
    if (!user) return res.status(404).send("User not found");
    res.status(200).json(user);
});

// UPDATE user by ID
app.put("/users/:id", (req, res) => {
    const user = users[req.params.id];
    if (!user) return res.status(404).send("User not found");
    const { name, email } = req.body;
    users[req.params.id] = { ...user, name: name || user.name, email: email || user.email };
    res.status(200).json(users[req.params.id]);
});

// DELETE user by ID
app.delete("/users/:id", (req, res) => {
    const userId = req.params.id;

    if (!users[userId]) {
        return res.status(404).json({ error: "User not found" });
    }

    delete users[userId];
    res.status(204).send();
});

module.exports = app;
