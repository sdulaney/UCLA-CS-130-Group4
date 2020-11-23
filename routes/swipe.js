var express = require('express');
var router = express.Router();

//Not being used rn. Couldn't make it work through here


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

router.get('/swipe', (req,res) => {
    res.send('in swipe.js');
})


module.exports = router;