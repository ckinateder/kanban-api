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
const LISTENPORT = '8081'

// listen at port
var corsOptions = {
    origin: `http://localhost:${LISTENPORT}`
};

app.use(cors(corsOptions)); // use cors options that we described (url)

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require("./app/routes/task.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});