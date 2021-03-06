const port = (process.env.PORT || 3001)

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var groupRouter = require('./routes/groups');
var matchRouter = require('./routes/getMatch');
var swipeRouter = require('./routes/swipe');

var app = express();
var cors = require('cors');
var classes = require('./classes/classes')
var users = classes.users
var groups = classes.groups
var restaurants = classes.restaurants

const { exit } = require('process');

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
app.use('/swipe', swipeRouter);

////////// START: Routes to create seed data for demo/testing purposes //////////

//initializes redis with some dummy data
//userId: 1234
//groupId: 123
//restaurantId: 567
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
	//restaurantId: "567"
	const matchedRestaurant = await users.likeRestaurant('1234','567')
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
	await users.likeRestaurant('12345', 'mcdonald')
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

app.get('/populate-dummy-data', async (req, res) => {
	//insert new user groupId: 123, userId: 1234, name : hank
	await users.insertNewUser('123','1234','hank')
	//insert multiple users
	await users.insertNewUser('123','12345','hank1')
	await users.insertNewUser('123', '123456', 'hank2')	
	//create a new group. groupId : 123
	await groups.insertNewGroup('123')
	//insert new members into groupId
	await groups.insertNewMember('123', '1234')
	await groups.insertNewMember('123', '12345')
	await groups.insertNewMember('123', '123456')
	//restaurantId: "567"
	await users.likeRestaurant('1234','567')
	await users.likeRestaurant('1234','678')
	await users.likeRestaurant('12345','789')
	await users.likeRestaurant('12345', '567')
	await users.likeRestaurant('123456', '789')
	await users.likeRestaurant('123456', '567')
	console.log(await groups.getMatch('123')) //should return '567'
	res.status(200).send('dummy data successfully populated')
})

////////// END: Routes to create seed data for demo/testing purposes //////////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(port, () => console.log(`Chicken Tinder listening on port ${port}!`))

module.exports = app;
