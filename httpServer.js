
import http from 'http';
import fs from 'fs';

let tasks = [];

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    // A2: Home route
    if (url === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Welcome to Employee Task Management</h1>');
    }

    // A2 and A3: Get all tasks
    else if (url === '/tasks' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(tasks));
    }

    // A2: About route
    else if (url === '/about' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Employee Task Management Application</h1><p>Manage and track employee tasks easily.</p>');
    }

    // A4: Serve HTML using FS module
    else if (url === '/home' && method === 'GET') {
        fs.readFile('./public/index.html', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error reading HTML file');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }

    // A3: Add new task using POST
    else if (url === '/add-task' && method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            try {
                const task = JSON.parse(body);

                if (
                    task.id === undefined ||
                    !task.taskName ||
                    !task.assignedTo ||
                    !task.status
                ) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'All required fields are needed' }));
                    return;
                }

                tasks.push(task);

                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Task added successfully', task: task }));

            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid JSON data' }));
            }
        });
    }

    // A5: Invalid routes
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Page Not Found');
    }
});

// A1: Start HTTP server on port 3000
server.listen(3000, () => {
    console.log('HTTP Server running at http://localhost:3000');
});
