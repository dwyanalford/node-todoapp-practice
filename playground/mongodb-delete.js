// make an instance of mongodb to be able to connect to database
// const MongoClient = require('mongodb').MongoClient;
// we can destructure
const { MongoClient, ObjectID } = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

// then connect to the database
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    // 'return' here makes sure if err runs, prevents rest of function
    // from executing
    return console.log('Unable to connect to mongoDB server');
  }
  // if success
  console.log('Connected to MongoDB server');

  //deleteMany
  db.collection('Todos').deleteMany({
    text: 'find the pencil u lost'
  }).then( (result) => {
    console.log(result);
  });

  // findOneAndDelete
  db.collection('Todos').findOneAndDelete({
    completed: false
  }).then( (result) => {
    console.log(result);
  })

    // closes connection to database
    // db.close();
});
