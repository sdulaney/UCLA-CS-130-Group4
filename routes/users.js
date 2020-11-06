var express = require('express');
var router = express.Router();
const uuid = require('uuid');
const redis = require('redis');
const client = redis.createClient();


/* GET unique url*/
router.get('/', function(req, res, next) {
	const uid = uuid.v4();
	//TODO: avoid duplicates
	res.render("uid", {uid});

});

/* POST user to a group*/
router.post('/:uid/:username', function(req, res, next){
	//TODO: other than redis?
	const uid = req.params.uid;
	const username = req.params.username;
	// add user to group
	client.on('connect', function() {
		console.log('connected')
	})

	client.rpush(uuid, username);
})

module.exports = router;
