const app = require('../app.js');
const supertest = require('supertest');
const request = supertest(app);

var classes = require('../classes/classes')
var users = classes.users
var groups = classes.groups
var restaurants = classes.restaurants

var userid1;
var userid2;
var groupid;
it('should create a group with groupid', async () => {
	const data = {
		address: "641 Gayley Ave",
		city: "Los Angeles",
		state: "CA",
		zipCode: "90024",
		radius: "20"
	}
	const response = await request.post('/groups/create').send(data);
	groupid = response.text;
	console.log(groupid);
	expect(response.statusCode).toEqual(200);
	const restaurantList = await groups.getFetchedRestaurantLists(groupid);
	console.log(restaurantList);
	//TODO:check fetched restaurant
});

it('should add user to the group', async () => {
	const username = 'frank';
	const response = await request.post('/join/'+groupid+'/'+username);
	expect(response.statusCode).toEqual(200);
	const obj = JSON.parse(response.text);
	userid1 = obj.userid;
	expect(Object.keys(obj).length).toEqual(2);
});

it('should add another user to the group', async () => {
	const username = 'hank';
	const response = await request.post('/join/'+groupid+'/'+username);
	expect(response.statusCode).toEqual(200);
	const obj = JSON.parse(response.text);
	userid2 = obj.userid;
	expect(userid2).not.toEqual(userid1);
	expect(Object.keys(obj).length).toEqual(2);
});


it('should add restaurantId to user list', async () => {
	//insert new user groupId: 123, userId: 1234, name : hank
	await users.insertNewUser('123','1234','hank');
	//create a new group. groupId : 123
	await groups.insertNewGroup('123');
	//insert new member into groupId
	await groups.insertNewMember('123', '1234');
	const username = 'frank';
	const response = await request.post('/swipe/123/1234/12345');
	expect(response.statusCode).toEqual(200);
	// const obj = JSON.parse(response.text);
	const liked = await users.getLikedRestaurant('1234');
	expect(JSON.parse(liked)).toContain('12345');
});

it('should get a matched restaurantId', async () => {
	//insert new user groupId: 123, userId: 1234, name : hank
	await users.insertNewUser('123','1234','hank');
	await users.insertNewUser('123','1235','frank');
	//create a new group. groupId : 123
	await groups.insertNewGroup('123');
	//insert new member into groupId
	await groups.insertNewMember('123', '1234');
	await groups.insertNewMember('123', '1235');
	await users.likeRestaurant('1234', 'mcdonald');
	await users.likeRestaurant('1235', 'mcdonald');
	const response = await request.get('/match/123');
	expect(response.statusCode).toEqual(200);
	expect(response.text).toContain('mcdonald');
});