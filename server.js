const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

const TaskSchema = new mongoose.Schema({
  title: String,
  completed: { type: Boolean, default: false }
});
const Task = mongoose.model('Task', TaskSchema);

app.get('/api/tasks', async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

app.post('/api/tasks', async (req, res, next) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/tasks/:id', async (req, res, next) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));