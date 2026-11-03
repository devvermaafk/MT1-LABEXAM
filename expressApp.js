
import express from 'express';

const app = express();

app.use(express.json());

// Sample employee tasks
let tasks = [
    {
        id: 1,
        taskName: "Develop Login Page",
        assignedTo: "Rahul Sharma",
        status: "Pending",
        priority: "High"
    },
    {
        id: 2,
        taskName: "Create Database",
        assignedTo: "Amit Kumar",
        status: "Completed",
        priority: "Medium"
    },
    {
        id: 3,
        taskName: "Design Dashboard",
        assignedTo: "Priya Singh",
        status: "Pending",
        priority: "Low"
    }
];

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Get task by ID
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
});

// Add new task
app.post('/tasks', (req, res) => {
    const { id, taskName, assignedTo, status, priority } = req.body;

    if (!id || !taskName || !assignedTo || !status || !priority) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newTask = { id, taskName, assignedTo, status, priority };
    tasks.push(newTask);

    res.status(201).json({
        message: "Task added successfully",
        task: newTask
    });
});

// Update task
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    Object.assign(task, req.body);

    res.json({
        message: "Task updated successfully",
        task
    });
});

// Delete task
app.delete('/tasks/:id', (req, res) => {
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({ message: "Task not found" });
    }

    tasks.splice(index, 1);

    res.json({ message: "Task deleted successfully" });
});

// Start server
app.listen(4000, () => {
    console.log('Express Server running at http://localhost:4000');
});
