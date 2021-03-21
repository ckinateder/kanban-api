module.exports = app => {
    const tasks = require("../controllers/task.controller.js");
    // create router
    var router = require("express").Router();

    // Create a new task
    router.post("/", tasks.create);

    // Retrieve all tasks
    router.get("/", tasks.findAll);

    // Update a task with id
    router.put("/:id", tasks.update);

    // Delete a task with id
    router.delete("/:id", tasks.delete);
/**
    // delete all tasks
    router.delete("/", tasks.deleteAll); */
    // host at '/api/tasks'
    app.use('/api/tasks', router);
};
