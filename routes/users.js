// import { groups, users } from '../classes'
const classes = require('../classes.js');
var users = new classes.Users();
var groups = new classes.Groups();
var express = require('express');
var router = express.Router();
const uuid = require('uuid');
const redis = require('redis');
const client = redis.createClient();

/* POST user to a group*/
router.post('/:uid/:username', async (req,res) =>{
	const groupid = req.params.uid;
	const username = req.params.username;
	const userid = uuid.v4();
	console.log("in post "+userid);
	groups.insertNewMember(groupid, userid);
	users.insertNewUser(groupid,userid,username);
	var list = await groups.getFetchedRestaurantLists(groupid);
	res.status(200).json({"restaurantList":list, "userid":userid});

//---------------------------old version--------------------------------
	// // client.hmset(uid, "username", username);
	// client.hget(uid, "usernames", function(err,reply){
	// 	if(err){
	// 		res.status(404).send(err);
	// 	}else{
	// 		var obj = JSON.parse(reply); // username JSON array
	// 		console.log(obj);
	// 		obj.push(userid);
	// 		client.hset(uid, "usernames", JSON.stringify(obj));
	// 		client.hset(userid, "name", username, "likedRestaurants", '[]');
	// 		// res.status(200).send(reply);
	// 	}
	// });
	// console.log("after post "+userid);
	// client.hget(uid, "fetchedRestaurants", function(err,reply){
	// 	if(err){
	// 		res.status(404).send(err);
	// 	}else{
	// 		res.status(200).send(JSON.parse(reply));
	// 	}
	// });
	// res.status(200).end();
})

module.exports = router;
