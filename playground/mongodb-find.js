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

  // db.collection('Todos').find({
  //   _id: new ObjectID('5997870987df90b6e779f045')
  // }).toArray().then( (docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch Todos');
  // });

  db.collection('Todos').find().count().then( (count) => {
    console.log(`Todos count: ${count}`);
  }, (err) => {
    console.log('Unable to fetch Todos');
  });

    // closes connection to database
    // db.close();
});
