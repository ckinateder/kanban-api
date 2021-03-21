const dbConfig = require("../config/db.config.js"); // dbconfig

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tasks = require("./task.model.js")(mongoose);

module.exports = db; // send to be used by controller