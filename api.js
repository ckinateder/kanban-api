require('dotenv').config();

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

// change this to change listen port
const LISTENPORT = '5001';

// listen at port
app.use(cors()); // use cors options that we described (url)

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require("./app/routes/task.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});