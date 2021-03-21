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

// delete task by id
exports.delete = (req, res) => {
const id_to_delete = req.params.id;

Task.findByIdAndRemove(id_to_delete)
    .then(data => {
    if (!data) {
        res.status(404).send({
        message: `Couldn't delete Task with id=${id_to_update}.`
        });
    } else {
        res.send({
        message: "Task was deleted successfully!"
        });
    }
    })
    .catch(err => {
    res.status(500).send({
        message: "ERROR updating Task with id=" + id_to_update
    });
    });
};

// delete all tasks
exports.deleteAll = (req, res) => {
  Task.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tasks were removed successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ERROR deleting all Tasks"
      });
    });
};

// find all to do
exports.findAllToDo = (req, res) => {
  Task.find({ type: 'to do' })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ERROR retrieving tasks."
      });
    });
};

// find all in progress
exports.findAllInProgress = (req, res) => {
  Task.find({ type: 'in progress' })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ERROR retrieving tasks."
      });
    });
};

// find all done
exports.findAllDone = (req, res) => {
  Task.find({ type: 'done' })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ERROR retrieving tasks."
      });
    });
};
// add methods to get priorities for each as well