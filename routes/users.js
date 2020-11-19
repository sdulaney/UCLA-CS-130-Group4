var express = require('express');
var router = express.Router();
const uuid = require('uuid');
const redis = require('redis');
const client = redis.createClient();
// var groupModel = require('./groupSchema')


// /* GET unique url*/
// router.get('/', function(req, res, next) {
// 	const uid = uuid.v4();
// 	//TODO: generate an entry in the db
// 	res.status(200).json({groupid:uid});

// });

/* POST user to a group*/
router.post('/:uid/:username', function(req, res, next){
	// const uid = req.params.uid;
	// const username = req.params.username;
	// // TODO: add user to group

	// client.rpush(uuid, username);

	// client.get(uuid, function(err, reply){
	// 	if (err){
	// 		console.log(err);
	// 		res.status(404);
	// 	}
	// 	res.status(200).json(reply);
	// });

	// var findquery = {"groupId":{uid}}

	res.status(200);
});

/* GET restaurant from a group*/
router.get('/:uid', function(req, res, next){
	//TODO: other than redis?
	const uid = req.params.uid;
	// TODO: get users from a group
	// const client = redis.createClient();
	// client.on('connect', function() {
	// 	console.log('connected')
	// })

	// client.get(uuid, function(err, reply){
		// if (err) then throw err;
	// 	res.status(200).json(reply);
	// });
	// const query = {"groupId":{uid}}
	// groupModel.findOne(query, function(err, data{
	// 	if(err){
	// 		console.log(err);
	// 	}else{
	// 		res.status(200).send(data);
	// 	}
	// }))
	// res.status(200);
})

module.exports = router;
