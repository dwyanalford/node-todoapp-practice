const { SHA256 } = require('crypto-js');

const jwt = require('jsonwebtoken');

var data = {
  id: 10
}

// takes object with user id and creates the token
var token = jwt.sign(data, '123abc');
console.log(token);
// verify it by making sure data was not manipulated
var decoded = jwt.verify(token, '123abc');
console.log('Decoded: ', decoded);
