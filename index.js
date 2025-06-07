const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5050;

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://dhrwkevefkffdzxwnpbm.supabase.co',       // 🔁 your Supabase URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocndrZXZlZmtmZmR6eHducGJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NDg5MjQsImV4cCI6MjA2MTUyNDkyNH0.1Ou_TskJFcQOZ6kJaWBAB_PvzXzeTnm8s29sTGfJMug'                    // 🔁 your anon key
);



console.log("🔧 index.js is running...");
console.log("🔥 Server starting...");

app.use(cors());
app.use(express.json());

let tasks = [];

// GET /tasks
app.get('/tasks', async (req, res) => {
    const { data, error } = await supabase.from('tasks').select('*');
  
    if (error) {
      console.error('❌ Error fetching tasks:', error.message);
      return res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  
    res.json(data);
  });
  
  app.post('/tasks', async (req, res) => {
    const { task } = req.body;
    console.log('📩 Received task:', task);
  
    if (!task || task.trim() === '') {
      console.log('❌ Empty task received');
      return res.status(400).json({ message: 'Invalid task' });
    }
  
    const { error } = await supabase.from('tasks').insert([{ task }]);
  
    if (error) {
      console.error('❌ Supabase insert error:', error.message);
      return res.status(500).json({ error: error.message });
    }
  
    console.log('✅ Task inserted successfully');
    res.status(201).json({ message: 'Task added.' });
  });
  
  

app.post('/tasks', (req, res) => {
    const { task } = req.body;
    console.log("📩 POST /tasks received:", task);
    if (task && task.trim() !== '') {
      tasks.push(task);
      res.status(201).json({ message: 'Task added.' });
    } else {
      res.status(400).json({ message: 'Invalid task.' });
    }
  });
  

app.listen(PORT, '0.0.0.0', () => {

  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
