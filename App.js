import React, { useState, useEffect } from 'react';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/todos')
            .then(response => response.json())
            .then(data => setTodos(data));
    }, []);

    const addTodo = () => {
        fetch('http://localhost:3000/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTodo }),
        })
            .then(response => response.json())
            .then(data => setTodos([...todos, data]));

        setNewTodo('');
    };

    const toggleComplete = id => {
        const todo = todos.find(t => t.id === id);
        fetch(`http://localhost:3000/todos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: !todo.completed }),
        })
            .then(response => response.json())
            .then(data => setTodos(todos.map(t => t.id === id ? data : t)));
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <input 
                type="text" 
                value={newTodo} 
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task"
            />
            <button onClick={addTodo}>Add</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <span 
                            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                            onClick={() => toggleComplete(todo.id)}
                        >
                            {todo.title}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
