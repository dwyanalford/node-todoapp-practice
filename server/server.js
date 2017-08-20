// root of app
var express = require('express');
var bodyParser = require('body-parser');

var { db } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();

// config the middleware so we can send json to our express application
app.use(bodyParser.json());

// create a new todo route handler, get body data from the client
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

// made accessible for testing purposes
// module.exports = { app };
