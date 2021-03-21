module.exports = app => {
    const tasks = require("../controllers/task.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", tasks.create);

    // Retrieve all Tutorials
    router.get("/", tasks.findAll);
    app.use('/api/tasks', router);
};
