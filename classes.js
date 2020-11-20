// import { checkForMatch } from './matcher'

const checkForMatch = require('./matcher.js')

var ioRedis = require('ioredis');

//push json objects
//group
//key: groupId, value: restId: restaurantId, members: [userId, userId2,...]

//user
//key: userId, value: name: userName, groupRestaurantMap: [groupId: [restaurantId, restaurantId, ...], groupId: []]
//assumeing userId ang groupId are different

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

//fly weight class, intialized only once and contains all the users
class Users {
    constructor() {
        this.client = new ioRedis()
    }
    insertNewUser(groupId,userId,name) {
        const data = JSON.stringify([]);
        this.client.hset(userId, "name", name, "groupId", groupId, "likedRestaurantId", data);  
    }
    async insertLikedRestaurant(userId, resId) {
        //wrap in transaction
        const transactClient = new ioRedis()
        let retry = true
        while(retry) {
            await transactClient.watch(userId)
            const val = await transactClient.hget(userId, 'likedRestaurantId')
            let restIdList = JSON.parse(val)
            restIdList.push(resId)
            const data = JSON.stringify(restIdList)
            await transactClient.multi()
                    .hset(userId, 'likedRestaurantId', data)
                    .exec((err, result) => {
                        if (result) {
                            retry = false
                        }
                    })
           await sleep( Math.random() * 100)
        }
        transactClient.quit()
    }
    async likeRestaurant(userId,resId) {
        //insert restaurant into userId
        this.insertLikedRestaurant(userId,resId)
        const groupId = this.getGroupId(userId)
       return checkForMatch(userId,groupId,resId)
    }
    async removeUser(userId) {
        await this.client.del(userId)
    }
    async getLikedRestaurant(userId){
        return await this.client.hget(userId, 'likedRestaurantId');
    }
    async getGroupId(userId){
        return await this.client.get(userId,'groupId')
    }
 }

 //fly weight, one instance contains all groups + its members
 class Groups {
    constructor() {
        this.client = new ioRedis()
    }
    insertNewGroup(groupId) {
        const data = JSON.stringify([])
        this.client.hset(groupId, 'members', data, 'fetchedRestaurants', data)
    }
    async insertNewMember(groupId, userId) {
        const transactClient = new ioRedis()
        let retry = true
        while(retry) {
            await transactClient.watch(groupId)
            let memStr = await this.client.hget(groupId, 'members')
            let memObj = JSON.parse(memStr)
            memObj.push(userId)
            memStr = JSON.stringify(memObj)
            await transactClient.multi()
                    .hset(groupId, 'members', memStr)
                    .exec((err, result) => {
                        if (result) {
                            retry = false
                        }
                    })
            await sleep( Math.random() * 100)
        }
        transactClient.quit()
    }
    async removeMember(groupId,userId) {
        const transactClient = new ioRedis()
        let retry = true
        while(retry) {
            await transactClient.watch(groupId)
            let tempStr = await this.client.hget(groupId, 'members')
            let tempObj = JSON.parse(tempStr)
            tempObj = tempObj.splice(tempObj.indexOf(userId), 1)
            tempStr = JSON.stringify(tempObj)
            await transactClient.multi()
                    .hset(groupId, 'members', tempStr)
                    .exec((err, result) => {
                        if (result) {
                            retry = false
                        }
                    })
            await sleep( Math.random() * 100)
        }
        transactClient.quit()
    }
    //this function does not append to existing restaurant id
    //it replaces the exisiting restaurant id of the group
    async setFetchedRestaurantLists(groupId, restIdList) {
        await this.client.hset(groupId, 'fetchedRestaurants', JSON.stringify(restIdList))
    }
    async getFetchedRestaurantLists(groupId){
        const tempStr = await this.client.hget(groupId, 'fetchedRestaurants')
        return JSON.parse(tempStr)
    }
    async removeGroup(groupId) {
        await this.client.hdel(groupId)
    }
    async getMembers(groupId) {
        const tempStr = await this.client.hget(groupId, 'members')
        return JSON.parse(tempStr)
    }
    async getMatch(groupId){
        return await this.client.hget(groupId, 'restaurantId')
    }
    async setMatch(groupId, resId){
        await this.client.hset(groupId, 'restaurantId', resId )
    }
 }

// let groups = new Groups();
// let users = new Users();

module.exports = {Groups:Groups, Users:Users};
