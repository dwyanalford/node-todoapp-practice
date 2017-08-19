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

  db.collection('Todos').insertOne( {
    text: 'need to improve my mongoDB skillz',
    completed: false
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert todo', err);
    }
    // if success, 'ops' attribute inserts all
    console.log(result.ops[0]._id.getTimestamp());
    console.log(result.ops);
  });



    // closes connection to database
    db.close();
});
