var mongoose = require('mongoose');

var GroupSchema = new mongoose.Schema({
	groupId: Number,
	Restaurants: {type:[String], "default":[]},
	users: {type:[String], "default":[]}
})

//Export model
module.exports = mongoose.model('GroupInfo', GroupSchema);