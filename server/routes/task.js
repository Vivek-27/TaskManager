const express = require('express');
const router = express.Router();
const requireLogin = require('../middleware/requireLogin');
const mongoose = require('mongoose');
const Task = mongoose.model('Task');

router.post('/addTask', requireLogin, (req, res) => {
  //addTask
  const { title, desc, deadlineDate, deadlineTime, color, status } = req.body;
  const task = new Task({
    title,
    desc,
    deadlineDate,
    deadlineTime,
    status,
    color,
    taskBy: req.user
  });
  try {
    task.save().then((taskDone) => {
      res.status(200).json({ message: taskDone });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/myTask', requireLogin, async (req, res) => {
  await Task.find({ taskBy: req.user._id })
    .then((allTask) => {
      res.status(200).json({ allTask });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put('/updateTask', requireLogin, async (req, res) => {
  await Task.findByIdAndUpdate(
    req.body.taskId,
    {
      $set: {
        title: req.body.title
      }
    },
    {
      new: true
    }
  )
    .then((result) =>
      Task.findByIdAndUpdate(
        req.body.taskId,
        {
          $set: {
            desc: req.body.desc
          }
        },
        {
          new: true
        }
      )
    )
    .then((result) =>
      Task.findByIdAndUpdate(
        req.body.taskId,
        {
          $set: {
            status: req.body.done
          }
        },
        {
          new: true
        }
      )
    )
    .then((result) =>
      Task.findByIdAndUpdate(
        req.body.taskId,
        {
          $set: {
            deadline: req.body.deadline
          }
        },
        {
          new: true
        }
      )
    )
    .then((response) => {
      res.json(response);
    })
    .catch((err) => console.log(err));
});

router.put('/doneTask/:taskId', requireLogin, async (req, res) => {
  await Task.findByIdAndUpdate(
    req.params.taskId,
    {
      $set: {
        status: true
      }
    },
    {
      new: true
    }
  )
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

router.put('/deleteTask/:taskId', requireLogin, async (req, res) => {
  await Task.deleteOne({ _id: req.params.taskId });
  res.json('task deleted');
});

module.exports = router;
