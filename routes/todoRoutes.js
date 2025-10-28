const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

router.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

router.post('/', async (req, res) => {
  const todo = new Todo({
    title: req.body.title
  });
  await todo.save();
  res.json(todo);
});

router.delete('/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Todo deleted' });
});

module.exports = router;
