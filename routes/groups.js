var express = require('express');
var router = express.Router();

class Group {
    constructor(groupId, restaurants, members) {
      this.groupId = groupId;
      this.restaurants = restaurants;
      this.members = members;
    }
  }

router.post('/', function(req, res, next) {
    // TODO: generate unique groupId using uuid library
    var groupId = "10332339-fIV3H";
    var address = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var zipCode = req.body.zipCode;
    var radius = req.body.radius / 0.00062137;      // radius provided in miles, converted to meters
    var addressFormatted = address + ", " + city + ", " + state + " " + zipCode;
    addressFormatted = addressFormatted.replace(" ", "+");
    const response = await fetch('https://api.yelp.com/v3/businesses/search?limit=10&categories=Restaurant&location=${addressFormatted}&radius=${radius}', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(response.json());
    // TODO: persist Group, Restaurant data
    res.redirect(200, '/join/${groupId}'); 
});

module.exports = router;
