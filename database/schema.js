const mongoose = require('mongoose');
const schema = mongoose.Schema;

var userSchema = new schema({
	googleId: String,
	username: String,
	FirstName: String,
	LastName: String,
	email: String,
	photo : String,
	gender: String,
});

const User = mongoose.model('user', userSchema);

module.exports = User;  