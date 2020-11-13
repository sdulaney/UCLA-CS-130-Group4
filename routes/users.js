var express = require('express');
var router = express.Router();
const uuid = require('uuid');
const redis = require('redis');
const client = redis.createClient();


/* GET unique url*/
router.get('/', function(req, res, next) {
	const uid = uuid.v4();
	//TODO: generate an entry in the db
	res.status(200).json({groupid:uid});

});

/* POST user to a group*/
router.post('/:uid/:username', function(req, res, next){
	const uid = req.params.uid;
	const username = req.params.username;
	// TODO: add user to group
	// const client = redis.createClient();
	// client.on('connect', function() {
	// 	console.log('connected')
	// })

	// client.rpush(uuid, username);
	res.status(200);
})

/* GET users from a group*/
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
	// res.status(200);
})

module.exports = router;
