const express = require("express"); // backend
const cors = require("cors"); // middleware
const app = express(); // create express
const db = require("./app/models"); // connect

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connected to the kanban-board database");
    })
    .catch(err => {
        console.log("Cannot connect to the kanban-board database. Quitting ...", err);
        process.exit();
    });
// listen at all
app.use(cors()); 

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require("./app/routes/task.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});