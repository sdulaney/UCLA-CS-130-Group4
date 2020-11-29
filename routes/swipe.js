var express = require('express');
var router = express.Router();
var classes = require('../classes/classes');
var users = classes.users;
var groups = classes.groups;
var restaurants = classes.restaurants;

/**
* POST /swipe/{groupId}/{userId}/{restaurantId}
* @groupId
* @userId
* @restaurantId
* Frontend:
*   - Each swipe actions sends a post request to backend
* Database:
*   - Save preferred restaurants for user/group in redis
*/
router.post('/:groupId/:userId/:restaurantId', async (req, res) => {
	//if we're here, then user has liked restaurant
	//need to store in redis
	//  add restaurantId under user's likedRestaurant list
	const groupId = req.params.groupId;
	const userId = req.params.userId;
	const restaurantId = req.params.restaurantId;

	if (users.userExists(userId) === 0) {
		console.log("user doesn't exist:", userId);
		res.status(404).send();
	}

	if (users.userExists(userId) === 1) {
		await users.likeRestaurant(userId, restaurantId);	
	}

	res.status(200).send();
	console.log('userId:', userId)
	console.log('likes restaurantId:', restaurantId);
	console.log("this user's liked restaurants: ");
	//tests if the restaurant is added to user's likedRestaurants
	console.log(await users.getLikedRestaurant(userId));
});

module.exports = router;