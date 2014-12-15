var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var courseSchema = new Schema({
	name: String,

	meta: {
		createAt: Date,
		updateAt: Date,
	}
});

module.exports = courseSchema;