const { SHA256 } = require('crypto-js');

var message = 'I am user number 3';
var hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`hash: ${hash}`);

var data = {
  id: 4
};
 var token = {
   data,
   // salt the hash
   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
 }

 token.data.id = 5;
 token.hash = SHA256(JSON.stringify(token.data)).toString();

 var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

 if (resultHash === token.hash) {
   console.log('data was not changed, we can trust it');
 } else {
   console.log('data was changed, Do NOT TRUST!');
 }
