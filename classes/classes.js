var checkForMatch =  require('./matcher');

var ioRedis = require('ioredis');

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Users {
    constructor() {
        this.client = new ioRedis()
    }
    //@param: groupId : string, userId : string, name : string
    //@return: void
    async insertNewUser(groupId,userId,name) {
        const data = JSON.stringify([]);
        await this.client.hset(userId, "name", name, "groupId", groupId, "likedRestaurantId", data);  
    }
    //@param: userId : string, resId : string
    //@return: void
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
    //@param: userId : string, resId : string
    //@return: restaurantId : string
    async likeRestaurant(userId,resId) {
        //insert restaurant into userId
        await this.insertLikedRestaurant(userId,resId)
        const groupId = await this.getGroupId(userId)
       return await checkForMatch(userId,groupId,resId)
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
    //@param: userId : string
    //@return: void
    async removeUser(userId) {
        await this.client.del(userId)
    }
    //@param: userId : string
    //@return: list_restaurantId : string[] //list of restaurant Id the user likes
    async getLikedRestaurant(userId){
        return await this.client.hget(userId, 'likedRestaurantId');
    }
    //@param: userId : string
    //@return: groupId : string
   async getGroupId(userId){
        return await this.client.hget(userId,'groupId')
    }
 }


 class Groups {
    constructor() {
        this.client = new ioRedis()
    }
    //@param: groupId : string
    //@return: void
    async insertNewGroup(groupId) {
        console.log("break point")
        const data = JSON.stringify([])
        await this.client.hset(groupId, 'members', data, 'fetchedRestaurants', data)
        console.log("break point2")
    }
    //@param: groupId : string, userId : string
    //@return: void
    async insertNewMember(groupId, userId) {
        const transactClient = new ioRedis()
        let retry = true
        while(retry) {
            await transactClient.watch(groupId)
            let memStr = await transactClient.hget(groupId, 'members')
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
    //@param: groupId: string, userId: string
    //@return: void
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
    //@param: groupId : string, restIdList : string[] // list of restaurant id
    //@return: void
    async setFetchedRestaurantLists(groupId, restIdList) {
        await this.client.hset(groupId, 'fetchedRestaurants', JSON.stringify(restIdList))
    }
    //@param: groupId : string
    //@return: list_restaurantId : string[]
    async getFetchedRestaurantLists(groupId){
        const tempStr = await this.client.hget(groupId, 'fetchedRestaurants')
        return JSON.parse(tempStr)
    }
    async removeGroup(groupId) {
        await this.client.hdel(groupId)
    }
    //@param: groupId : string
    //@return: void
    async removeGroup(groupId) {
        await this.client.hdel(groupId)
    }
    //@param: groupId : string
    //@return: list_userId : string[]
    async getMembers(groupId) {
        const tempStr = await this.client.hget(groupId, 'members')
        return JSON.parse(tempStr)
    }
    async getMatch(groupId){
        return await this.client.hget(groupId, 'restaurantId')
    }
    //@param: groupId : string
    //@return: matched_restaurantId : string
    async getMatch(groupId){
        return await this.client.hget(groupId, 'restaurantId')
    }
    //@param: groupId : string, resId : string
    //@return: void
    async setMatch(groupId, resId){
        await this.client.hset(groupId, 'restaurantId', resId )
    }
 }
 //this singleton class is used to store list of restaurant objects fetched from Yelp API. 
 class Restaurants {
     constructor() {
         this.client = new ioRedis()
     }
     //@param: groupId : string, restList : Object[] // list of restaurant object
     //@return: void
     async insertListRestaurantObj(groupId, restList) {
         const tempStr = JSON.stringify(restlist) 
         await this.client.hset('restaurantObj', groupId, tempStr)
     }
     //@param: groupId : string
     //@return: list_of_restaurantObj : Object[]  
     async getListRestaurantObj(groupId) {
        const tempStr = await this.client.hget('restaurantObj', groupId)
        return JSON.parse(tempStr);
     }
 }

 let groups = new Groups();
 let users = new Users();
 let restaurants = new Restaurants(); 
 module.exports = {
     groups,
     users,
     restaurants,
 };
