const express = require("express");

const router = express.Router();

const Todo = require("../models/Todo");


// GET TODOS
router.get("/", async (req, res) => {

  try {

    const todos = await Todo.find();

    res.json(todos);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});


// POST TODO
router.post("/", async (req, res) => {

  try {

    const newTodo = new Todo({
      text: req.body.text,
      completed: req.body.completed,
      deadline: req.body.deadline,
    });

    const savedTodo = await newTodo.save();

    res.status(201).json(savedTodo);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});


// DELETE TODO
router.delete("/:id", async (req, res) => {

  try {

    await Todo.findByIdAndDelete(req.params.id);

    res.json({
      message: "Todo deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});


// UPDATE TODO
router.put("/:id", async (req, res) => {

  try {

    const updatedTodo = await Todo.findByIdAndUpdate(

      req.params.id,

      {
        completed: req.body.completed,
      },

      {
        new: true,
      }
    );

    res.json(updatedTodo);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});


module.exports = router;