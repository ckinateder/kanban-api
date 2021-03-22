module.exports = app => {
    const tasks = require("../controllers/task.controller.js");
    // create router
    var router = require("express").Router();

    // Create a new task
    router.post("/", tasks.create);

    // Retrieve all tasks
    router.get("/", tasks.findAll);

    // Retrieve all tasks to do
    router.get("/todo", tasks.findAllToDo);

    // Retrieve all tasks in progress
    router.get("/inprogress", tasks.findAllInProgress);

    // Retrieve all tasks done
    router.get("/done", tasks.findAllDone);

    // Retrieve a single task with id
    router.get("/:id", tasks.findOne);

    // Update a task with id
    router.put("/:id", tasks.update);

    // Delete a task with id
    router.delete("/:id", tasks.delete);

    // delete all tasks
    router.delete("/", tasks.deleteAll); 

    // host at '/api/tasks'
    app.use('/api/tasks', router);
};
