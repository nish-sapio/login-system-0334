const mongoose = require('mongoose');
const schema = mongoose.Schema;

var fileSchema = new schema({
	originalName: String,
	encoding: String,
	mimeType: String,
	filename : String,
	size: Number,
});

const fileSchema= mongoose.model('file', fileSchema);

module.exports = fileSchema;  