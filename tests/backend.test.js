const app = require('../app.js');
const supertest = require('supertest');
const request = supertest(app);

var ioRedis = require('ioredis');
const client = new ioRedis();

describe('Get index', () => {
  it('should create a new get', async () => {
    const res = await request.get('/')
    expect(res.statusCode).toEqual(200);
    var jsonObj = JSON.parse(res.text);
    expect(jsonObj.message).toBe('pass!');
  })
})

// describe('Create a group with max radius', () =>{
// 	it('should create a group with groupid', async () => {
// 		const response = await request.post('/create').send({
// 			"address": "641 Gayley Ave",
// 			"city": "Los Angeles",
// 			"state": "CA",
// 			"zipCode": "90024",
// 			"radius": "24"
// 		})
// 		console.log(response);
// 		expect(response.statusCode).toEqual(200);
// 	})
// })