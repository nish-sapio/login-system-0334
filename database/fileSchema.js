const mongoose = require('mongoose');
const schema = mongoose.Schema;

var fileSchema = new schema({
	user_id: String,
	originalName: String,
	encoding: String,
	mimeType: String,
	filename : String,
	size: Number,
});

const file= mongoose.model('file', fileSchema);

module.exports = file;  