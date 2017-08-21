const bcrypt = require('bcryptjs');

var password = '123abc!';

// to hash a password need to call 2 methods
// salting a password important because you adding random characters to the hash

// bcrypt.genSalt(10, (err, salt) => {
//   // do the hashing in here, pass 3 arguments
//   bcrypt.hash(password, salt, (err, hash) => {
//     // 'hash' is what we want to store in our database, not the 'password'
//
//   console.log(hash);
//   });
// });


// bcrypt.hash(password, 10, (err, hash) => {
//   // Store hash in your DB.
//   console.log(hash);
// });


var hashedPassword = '$2a$10$SyLRCXZub3Ufugtn8Xi/j.LnE6u14ZA1vyrAEMhqR7CkqTTwclJ42';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});
