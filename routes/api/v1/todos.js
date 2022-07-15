const express = require("express");
const router = express.Router();
var TodoList = require("../../../models/Todos");

router.get("/", async (req, res) => {
  try {
    const todoList = await TodoList.find();
    if (todoList.length === 0)
      return res.status(404).json({ message: "list is empty" });
    res.status(200).json(todoList);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});

router.get("/:id", async (req, res) => {
  var id = req.params.id;
  try {
    const data = await TodoList.find({ _id: id });
    if (data.length === 0)
      return res.status(404).json({ message: "id does not exist" });
    return res.status(200).json(data);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});

router.post("/", async (req, res) => {
  const newTodo = new TodoList(req.body);
  try {
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteTodo = await TodoList.deleteOne({ _id: req.params.id });
    if (deleteTodo.acknowledged && deleteTodo.deletedCount > 0)
      return res.status(200).json(deleteTodo);
    res.status(404).json({ message: `${req.params.id} not found` });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const changeTodo = await TodoList.updateOne(
      { _id: req.params.id },
      { $set: req.body },
      {
        runValidators: true,
      }
    );

    if (changeTodo.acknowledged === true && changeTodo.matchedCount === 0)
      return res.status(404).json({ message: `${req.params.id} not found` });
    res.status(200).json(changeTodo);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

module.exports = router;
