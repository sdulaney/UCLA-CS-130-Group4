var checkForMatch =  require('./matcher');

var ioRedis = require('ioredis');

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}


/**
 * @typedef {Object} Restaurant
 * @typedef {Object} User
 * @typedef {Object} Group
 */

/** Class representing Users  */
class Users {
    /**
     * Create a connection to Redis
     */
    constructor() {
        this.client = new ioRedis()
    }
    /**
     * Create new user in database
     * @param {string} groupId 
     * @param {string} userId
     * @param {string} name
     * @return {void} 
     */
    async insertNewUser(groupId,userId,name) {
        const data = JSON.stringify([]);
        await this.client.hset(userId, "name", name, "groupId", groupId, "likedRestaurantId", data);  
    }
    /**
     * Insert a restaurant the user liked into the Database
     * @param {string} userId 
     * @param {string} resId
     * @return {void} 
     */
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
    /**
     * this method is called when the user likes a restaurant.
     * It insert the liked restaurant into DB and find a match in the group
     * @param {string} userId 
     * @param {string} resId
     * @return {string} a matched restaurant ID 
     */
    async likeRestaurant(userId,resId) {
        //insert restaurant into userId
        await this.insertLikedRestaurant(userId,resId)
        const groupId = await this.getGroupId(userId)
       return await checkForMatch(userId,groupId,resId)
    }
    /**
     * remove user from DB
     * @param {string} userId - User Id string
     * @return {void}
     */
    async removeUser(userId) {
        await this.client.del(userId)
    }
    /**
     * return restaurant ID that the user liked
     * @param {string} userId
     * @return {string[]}
     */
    async getLikedRestaurant(userId){
        return await this.client.hget(userId, 'likedRestaurantId');
    }
    /**
     * return group ID of the user
     * @param {string} userId
     * @returns {string} 
     */
   async getGroupId(userId){
        return await this.client.hget(userId,'groupId')
    }
    /**
     * return true of the user exists
     * @param {string} userId
     * @return {Boolean} 
     */
    async userExists(userId) {
        return await this.client.exists(userId)
    }
 }

/** Class representing groups */
 class Groups {
     /**
      * Create a new redis connection
      */
    constructor() {
        this.client = new ioRedis()
    }
    /**
     * Create a new group in DB
     * @param {string} groupId 
     */
    async insertNewGroup(groupId) {
        const data = JSON.stringify([])
        await this.client.hset(groupId, 'members', data, 'fetchedRestaurants', data)
    }
    /**
     * Insert a new member into the group
     * @param {*} groupId 
     * @param {*} userId
     * @param {void} 
     */
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
                    .hdel(groupId, 'restaurantId')
                    .exec((err, result) => {
                        if (result) {
                            retry = false
                        }
                    })
            await sleep( Math.random() * 100)
        }
        transactClient.quit()
    }
    /**
     * Remove a member from the group
     * @param {string} groupId 
     * @param {string} userId
     * @return {void} 
     */
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
    /**
     * This method does not append restaurants to existing restaurants
     * It replaces the exisiting restaurants of the group
     * @param {string} groupId 
     * @param {Restaurant[]} restIdList
     * @return {void}
     */
    async setFetchedRestaurantLists(groupId, restIdList) {
        await this.client.hset(groupId, 'fetchedRestaurants', JSON.stringify(restIdList))
    }
    /**
     * Return a list restaurants for a certain group
     * @param {string} groupId
     * @return {Restaurant[]} 
     */
    async getFetchedRestaurantLists(groupId){
        const tempStr = await this.client.hget(groupId, 'fetchedRestaurants')
        return JSON.parse(tempStr)
    }
    /**
     * Remove group from DB
     * @param {string} groupId
     * @return {void} 
     */
    async removeGroup(groupId) {
        await this.client.del(groupId)
    }
    /**
     * Return a list of users in the group
     * @param {string} groupId
     * @return {User[]}
     */
    async getMembers(groupId) {
        const tempStr = await this.client.hget(groupId, 'members')
        return JSON.parse(tempStr)
    }
    /**
     * Return a matched restaurant ID of a group
     * @param {string} groupId
     * @return {string} 
     */
    async getMatch(groupId){
        return await this.client.hget(groupId, 'restaurantId')
    }
    /**
     * Set a matched Restaurant ID of a group
     * @param {string} groupId 
     * @param {string} resId
     * @return {string} 
     */
    async setMatch(groupId, resId){
        await this.client.hset(groupId, 'restaurantId', resId )
    }
 }
 /** this singleton class is used to store list of restaurant objects fetched from Yelp API.   */
 class Restaurants {
     /**
      * Create a connection to DB
      */
     constructor() {
         this.client = new ioRedis()
     }
     /**
      * Insert list of restaurants objects for a group
      * @param {string} groupId 
      * @param {string} restList
      * @return {void} 
      */
     async insertListRestaurantObj(groupId, restList) {
         const tempStr = JSON.stringify(restList) 
         await this.client.hset('restaurantObj', groupId, tempStr)
     }
     /**
      * Return a list of restaurant objects for a group 
      * @param {string} groupId
      * @return {Restaurant[]} 
      */
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
