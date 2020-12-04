const {groups,users,restaurants} = require('../classes/classes.js');
var express = require('express');
var router = express.Router();
const uuid = require('uuid');

/* POST user to a group*/
router.post('/:uid/:username', async (req,res) =>{
	const groupid = req.params.uid;
	const username = req.params.username;
	const userid = uuid.v4();
	await groups.insertNewMember(groupid, userid);
	await users.insertNewUser(groupid,userid,username);
	var list = await groups.getFetchedRestaurantLists(groupid);
	res.status(200).json({"restaurantList":list, "userid":userid});
})

module.exports = router;
