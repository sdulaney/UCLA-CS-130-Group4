var express = require('express');
var router = express.Router();
var request = require('request');
var yelp = require('../yelp.js');

class Group {
    constructor(groupId, restaurants, members) {
      this.groupId = groupId;
      this.restaurants = restaurants;
      this.members = members;
    }
  }

router.post('/create', async(req, res, next) => {
    // TODO: generate unique groupId using uuid library
    var groupId = "10332339-fIV3H";
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
    Promise.all(promises).then(values => {
        console.log(values);
    });
    // TODO: persist Group, Restaurant data
    res.redirect(200, '/join/${groupId}'); 
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
