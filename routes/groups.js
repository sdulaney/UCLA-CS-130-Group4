var express = require('express');
var router = express.Router();
var request = require('request');
var yelp = require('../yelp.js');

class Restaurant {
    constructor(name, imageUrl, rating, distance, phone, location) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.rating = rating;
        this.distance = distance;
        this.phone = phone;
        this.location = location;
    }
}

class Group {
    constructor(groupId, restaurants, members) {
      this.groupId = groupId;
      this.restaurants = restaurants;
      this.members = members;
    }
}

var groups = [];

router.post('/create', async(req, res, next) => {
    // TODO: generate unique groupId using uuid library
    var groupId = "123e4567-e89b-12d3-a456-426614174000";
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
        // TODO: persist Group, Restaurant data
        // console.log(JSON.parse(values));
        var data = JSON.parse(values);
        var restaurants = [];
        for (const property in data) {
            if (property == 'businesses') {
                console.log(`${property}`);
                for (const index in data[property]) {
                    // console.log(`${data[property][index]['name']}`);
                    var locationStr = data[property][index]['location']['address1'] + ', ' + data[property][index]['location']['city'] + ', ' + data[property][index]['location']['state'] + ' ' + data[property][index]['location']['zip_code'];
                    restaurants.push(new Restaurant(
                        data[property][index]['name'],
                        data[property][index]['image_url']), 
                        data[property][index]['rating'], 
                        data[property][index]['distance'], 
                        data[property][index]['phone'], 
                        locationStr
                    );
                }
            }
        }
        console.log(restaurants);
    });
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
