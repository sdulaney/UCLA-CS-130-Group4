var express = require('express');
var router = express.Router();
var request = require('request');
var yelp = require('../yelp.js');
var uuid = require('uuid');

const { groups,users,restaurants } = require('../classes/classes.js');

router.post('/create', async(req, res, next) => {
    const groupId = uuid.v4();
    // Create new group in db
    await groups.insertNewGroup(groupId);
    var address = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var zipCode = req.body.zipCode;
    var radius = Math.round(req.body.radius / 0.00062137);      // radius provided in miles, converted to meters (integer)
    var addressFormatted = address + ", " + city + ", " + state + " " + zipCode;
    addressFormatted = addressFormatted.replace(" ", "+");
    var auth = 'Bearer ' + yelp.key;
    var headers = {
        'Content-type': 'application/json',
        'Authorization': auth
    }
    var promises = [];
    promises.push(requestPromise({
        url: `https://api.yelp.com/v3/businesses/search?limit=10&categories=Restaurant&location=${addressFormatted}&radius=${radius}`,
        headers: headers
    }));
    var data = {};
    Promise.all(promises).then(async(values) => {
        // Set fetchedRestaurants for new group in db
        await groups.setFetchedRestaurantLists(groupId, values);
    });
    var list = await groups.getFetchedRestaurantLists(groupId);
    console.log(list);
    res.status(200).send(groupId); 
});

function requestPromise(options) {
    return new Promise(function(resolve, reject){
        request.get(options, (err, resp, body) => {
            if (err) 
            	return reject(err);
            try {
                resolve(body);
            } 
            catch(e) {
                reject(e);
            }
        });
    });
}

module.exports = router;
