const express = require('express');
const app = express();
const port = 3000;

let todos = [
    { id: 1, title: 'Learn JavaScript', completed: false },
    { id: 2, title: 'Learn Express', completed: false },
];

app.use(express.json());

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        title: req.body.title,
        completed: false
    };

    if (!newTodo.title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    todo.title = req.body.title !== undefined ? req.body.title : todo.title;
    todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;

    res.json(todo);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
