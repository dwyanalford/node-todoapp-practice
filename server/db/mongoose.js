const mongoose = require('mongoose');

// set up to use promises
mongoose.Promise = global.Promise;

// Database configuration with mongoose & prep for deployment (production)
mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true
});

var db = mongoose.connection;

// Show any mongoose errors
db.on("error", (error) => {
  console.log("Mongoose Error: ", error);
});

db.once("open", () => {
  console.log("Mongoose connection successful.");
});

module.exports = { db };
