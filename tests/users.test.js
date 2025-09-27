const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

// In-memory user storage
let users = [];

// Create a User
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required.' });
    }
    const newUser = { id: uuidv4(), name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Retrieve a User
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }
    res.json(user);
});

// Update a User
app.put('/users/:id', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required.' });
    }
    const index = users.findIndex(u => u.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'User not found.' });
    }
    users[index] = { id: req.params.id, name, email };
    res.json(users[index]);
});

// Delete a User
app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'User not found.' });
    }
    users.splice(index, 1);
    res.status(204).send();
});

// Export for tests, run if called directly
if (require.main === module) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
}

module.exports = app;
