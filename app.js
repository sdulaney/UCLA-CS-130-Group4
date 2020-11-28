const port = (process.env.PORT || 3001)

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var summary = require('./summary.js');
var bodyParser = require('body-parser');
var azure = require('./azure.js');
var request = require('request');
var cheerio = require('cheerio');
var ioRedis = require('ioredis');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var groupRouter = require('./routes/groups');
var matchRouter = require('./routes/getMatch')

var app = express();
var cors = require('cors');
var classes = require('./classes/classes')
var users = classes.users
var groups = classes.groups
var restaurants = classes.restaurants
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

const client = new ioRedis()
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/join', usersRouter);
app.use('/groups', groupRouter);
app.use('/match', matchRouter);

app.get('/getme', async (req, res) => {
	//insert new user groupId: 123, userId: 1234, name : hank
	await users.insertNewUser('123','1234','hank')
	//create a new group. groupId : 123
	await groups.insertNewGroup('123')
	//insert new member into groupId
	await groups.insertNewMember('123', '1234')
	console.log(await users.getLikedRestaurant('1234'))
	console.log(await users.getGroupId('1234'))
	console.log(await groups.getMembers('123'))
	//this likeRestaurant function inserts the restaurantId into user's liked list
	//and find a match, it return restaurantId if match found. null if match not found
	const matchedRestaurant = await users.likeRestaurant('1234','in-n-out')
	console.log(matchedRestaurant) //should return null
	console.log(await users.getLikedRestaurant('1234')) //should return 'in-n-out'
	console.log('================')
	await users.likeRestaurant('1234', 'mcdonald')
	console.log(await users.getLikedRestaurant('1234'))
	//============
	await users.insertNewUser('123','12345','hank1')
	await groups.insertNewMember('123','12345')
	let match = await users.likeRestaurant('12345','in-n-out')
	console.log(`this group has a matched restaurant: ${match}`)
	console.log(`Matched result is ${await groups.getMatch('123')}`)
	//=============
	await users.insertNewUser('123', '123456', 'hank2')
	await groups.insertNewMember('123', '123456')
	match = await users.likeRestaurant('123456', 'mcdonald' )
	console.log(`match restaurant is ${match}`)
	console.log(`Match result is ${await groups.getMatch('123')}`)
	console.log(`1234 user has ${await users.getLikedRestaurant('1234')}`)
	console.log(`12345 user has ${await users.getLikedRestaurant('12345')}`)
	console.log(`123456 user has ${await users.getLikedRestaurant('123456')}`)
	console.log(`members: ${await groups.getMembers('123')} `)
	groups.removeGroup('123')
	users.removeUser('1234')
	users.removeUser('12345')
	users.removeUser('123456')
	res.status(200).send()
})

app.post("/api/summarizeurl", (req, res) => {
	if(!req.body.url)
  		return res.send("[ERROR] Missing field 'url'");

  	var url = req.body.url;
  	requestPromise({
  		url: url
  	}).then(data => {
  		var $ = cheerio.load(data);
  		var num = 2;
		if(req.body.num && parseInt(req.body.num) >= 1)
			num = parseInt(req.body.num);

		summarize($("body").text().replace(/\s+/g, " "), num, (data) => {
			res.json(data);
		});
  	});
});


app.post("/api/summarize", (req, res) => {
  if(!req.body.text)
  	return res.send("[ERROR] Missing field 'text'");

  var text = req.body.text;
  var num = 2;
  if(req.body.num && parseInt(req.body.num) >= 1)
  	num = parseInt(req.body.num);

  summarize(text, num, (data) => {
  	res.json(data);
  })
});

function summarize(text, num, cb) {
	var response = {};
  	summary.summarize("", text, num, function(err, summary) {
	    response.summary = summary;
	    var body = JSON.stringify({
	  		"documents": [{
			    "language": "en",
			    "id": "1",
			    "text": text.substring(0, 4000) //max char limit in azure
			}]
		});
		var headers = {
			'Ocp-Apim-Subscription-Key': azure.key,
			'Content-type': 'application/json'
		}

	    var promises = [];
	    promises.push(requestPromise({
	    	url: "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/entities",
	    	headers: headers,
	  		body: body
	    }));
	    promises.push(requestPromise({
	    	url: "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases",
	    	headers: headers,
	  		body: body
	    }));
	    promises.push(requestPromise({
	    	url: "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment",
	    	headers: headers,
	  		body: body
	    }));

	    Promise.all(promises).then(values => {
	    	console.log(JSON.parse(values[0]));
	    	response.entities = JSON.parse(values[0]).documents[0].entities;
	    	response.keyPhrases = JSON.parse(values[1]).documents[0].keyPhrases;
	    	response.sentiment = JSON.parse(values[2]).documents[0].score;

	    	cb(response);
	    });
  	});
}

function requestPromise(options) {
    return new Promise(function(resolve, reject){
        request.post(options, (err, resp, body) => {
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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;
