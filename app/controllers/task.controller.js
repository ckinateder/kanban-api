const db = require("../models");
const Task = db.tasks;

// Create and Save a new Task
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Body can't be empty" });
        return;
    }

    // Create a Task
    const task = new Task({
        title: req.body.title,
        type: req.body.type ? req.body.type : "to do", // validate later
        due: req.body.due, // when it's due
        priority: req.body.priority ? req.body.priority : "low",
        description: req.body.description,
    });

    // Save Task in the database
    task
        .save(task)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "ERROR creating Task"
            });
        });
};

// Retrieve all Tasks from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Task.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "ERROR finding all Tasks"
            });
        });
};
// update a task by id
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Body can't be empty"
      });
    }
  
    const id_to_update = req.params.id;
  
    Task.findByIdAndUpdate(id_to_update, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Couldn't update Task with id=${id_to_update}.`
          });
        } else res.send({ message: "Task was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "ERROR updating Task with id=" + id_to_update
        });
      });
  };