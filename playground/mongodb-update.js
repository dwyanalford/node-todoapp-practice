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

  // create collection
  // db.collection('Users').insertOne({
  //   name: 'Lavender',
  //   inStock: 99,
  //   lowStock: 25,
  //   newStock: 0
  // }).then( (results) => {
  //   console.log(results);
  // })


// findOneAndUpdate example 2 with users collection

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('599855a3a5f9a8075cee8238')
  }, {
    $inc: {
      inStock: 20
    },
    $set: {
      name: 'Peppermint Eucalyptus'
    }
  }, {
    returnOriginal: false
  }).then( (result) => {
    console.log(result);
  });



  // findOneAndUpdate example 1
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5997870987df90b6e779f047')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then( (result) => {
  //   console.log(result);
  // })


    // closes connection to database
    // db.close();
});
