const bcrypt = require('bcryptjs');

const enteredPassword = '12345678';  // The plain password entered by the user
const storedHash = '$2a$10$3bgcXbIw1uuthXcpHr6ez.YkgHtmeotQgKBvNWuoznA3T3/rAgbuq';  // Stored hash from DB

console.log('Entered Password:', enteredPassword);  // Check the entered password
console.log('Stored Hash:', storedHash);  // Check the stored hash

// Compare password with hash
bcrypt.compare(enteredPassword, storedHash, function(err, isMatch) {
  if (err) {
    console.error('Error comparing passwords:', err);
  } else {
    console.log('Password match result:', isMatch);  // true if password matches
  }
});

console.log('Entered Password Length:', enteredPassword.length);
console.log('Stored Hash Length:', storedHash.length);


bcrypt.hash('12345678', 10, function(err, newHash) {
    if (err) {
      console.error('Error hashing new password:', err);
    } else {
      console.log('Generated New Hash:', newHash);
    }
  });
  