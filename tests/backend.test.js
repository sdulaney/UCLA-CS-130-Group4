const app = require('../app.js');
const supertest = require('supertest');
const request = supertest(app);

var classes = require('../classes/classes')
var users = classes.users
var groups = classes.groups
var restaurants = classes.restaurants

// -----------simulate the process with a group of hank, frank and stewart-------------
// All three of them like saffron-and-rose-ice-cream

var userid1;
var userid2;
var groupid;
it('should create a group with groupid and add hank to the group', async () => {
	const data = {
		"address": "641 Gayley Ave",
		"city": "Los Angeles",
		"state": "CA",
		"zipCode": "90024",
		"radius": "20"
	}
	const response = await request.post('/groups/create').send(data)
	groupid = response.text;
	console.log(groupid)
	expect(response.statusCode).toEqual(200);
	const reslist = await groups.getFetchedRestaurantLists(groupid)
	const response1 = await request.post(`/join/${groupid}/hank`);
	const obj = JSON.parse(response1.text)
	userid2 = obj.userid;
	expect(userid2).not.toEqual(userid1);
	expect(Object.keys(obj).length).toEqual(2);
	expect(reslist).toEqual(obj.restaurantList);
});
it('should add frank to the group', async () => {
	const username = 'frank';
	const response = await request.post('/join/'+groupid+'/'+username);
	expect(response.statusCode).toEqual(200);
	const obj = JSON.parse(response.text);
	userid1 = obj.userid;
	expect(Object.keys(obj).length).toEqual(2);
});
it('add the stewart and get matched for them', async () => {
	const username = 'stewart';
	var response = await request.post('/join/'+groupid+'/'+username);
	expect(response.statusCode).toEqual(200);
	const obj = JSON.parse(response.text);
	userid3 = obj.userid;
	
	await request.post('/swipe/'+groupid+'/'+userid1+'/piXuRfZ81xFGA64WFJrKkQ');
	await request.post('/swipe/'+groupid+'/'+userid1+'/l5AhBWCPmPk4EKq1bu04EQ');
	await request.post('/swipe/'+groupid+'/'+userid2+ '/l5AhBWCPmPk4EKq1bu04EQ');
	await request.post('/swipe/'+groupid+'/'+userid2+ '/oZn4oaOKOI-HcUGecfG4Vw');
	await request.post('/swipe/'+groupid+'/'+userid3+ '/FoEMpu0X_bGCb7yRreMxMQ');
	await request.post('/swipe/'+groupid+'/'+userid3+ '/l5AhBWCPmPk4EKq1bu04EQ');

	response = await request.get('/match/'+groupid);
	expect(response.statusCode).toEqual(200);
	expect(response.text).toContain('l5AhBWCPmPk4EKq1bu04EQ');
});


// -------------------Tests for basic functionalities------------------------

it('add user to a group', async () => {
	//create a new group. groupId : 122
	await groups.insertNewGroup('122');
	//insert new member into groupId
	const response = await request.post('/join/122/hank');
	expect(response.statusCode).toEqual(200);
	const obj = JSON.parse(response.text);
	userid4 = obj.userid;
	// const obj = JSON.parse(response.text);
	const member = await groups.getMembers('122');
	expect(member).toContain(userid4);
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
	//insert new user groupId: 124, userId: 1234, name : hank
	await users.insertNewUser('124','1234','hank');
	await users.insertNewUser('124','1235','frank');
	//create a new group. groupId : 124
	await groups.insertNewGroup('124');
	//insert new member into groupId
	await groups.insertNewMember('124', '1234');
	await groups.insertNewMember('124', '1235');
	await users.likeRestaurant('1234', 'mcdonald');
	await users.likeRestaurant('1235', 'mcdonald');
	const response = await request.get('/match/124');
	expect(response.statusCode).toEqual(200);
	expect(response.text).toContain('mcdonald');
});

