
import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';


import {v4 as uuidv4} from 'uuid';
const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000', // Adjust this to your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));


//connect to the SQLite database
const db = new sqlite3.Database('./tasktable.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
})

// create the task table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS tasks (id TEXT PRIMARY KEY , title TEXT NOT NULL, description TEXT, status TEXT NOT NULL, dueDate TEXT, createdAt DATE NOT NULL, UpdatedAt DATE NOT NULL)`, (err) => {
  if (err) {
    console.error('Error creating tasks table:', err.message);
  } else {
    console.log('Tasks table is ready.');
  }
});




// apis

//api to get all tasks
app.get('/task', (req, res) => {
  db.all('SELECT * FROM tasks', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});


// api to create a new task
app.post('/task', (req, res) => {
  const { title, description, status, dueDate } = req.body;
  const createdAt = new Date().toISOString();
  const UpdatedAt = new Date().toISOString();
  console.log('Received task data:', req.body);
  const id = uuidv4(); // Generate a unique ID for the task
  db.run(`INSERT INTO tasks (id, title, description, status, dueDate, createdAt, UpdatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [id, title, description, status, dueDate, createdAt, UpdatedAt], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      } else {  
        res.status(201).json({ id, title, description, status, dueDate, createdAt, UpdatedAt });
      }
  });
});

// api to get a task by id
app.get('/task/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.json(row);
    }
  });
});

// api to update a task
app.put('/task/:id', express.json(), (req, res) => {
  const id = req.params.id;
  const { title, description, status, dueDate } = req.body;
  const UpdatedAt = new Date().toISOString(); 
  db.run(`UPDATE tasks SET title = ?, description = ?, status = ?, dueDate = ?, UpdatedAt = ? WHERE id = ?`,
    [title, description, status, dueDate, UpdatedAt, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.json({ id, title, description, status, dueDate, UpdatedAt });
    }
  });
  });


  // api to delete a task
app.delete('/task/:id', (req, res) => {
  const id = req.params.id;
  db.run(`DELETE FROM tasks WHERE id = ?`, [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(204).send();
    }
  });
});

// Start the server
app.listen(4000, () => {
  console.log('Server is running on port 4000');
});

