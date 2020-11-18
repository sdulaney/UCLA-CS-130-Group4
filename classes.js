import { checkForMatch } from './matcher'


const redis = require("redis");
const client = redis.createClient();

client.on("error", function(error) {
	console.error(error)
});

//push json objects
//group
//key: groupId, value: restId: restaurantId, members: [userId, userId2,...]

//user
//key: userId, value: name: userName, groupRestaurantMap: [groupId: [restaurantId, restaurantId, ...], groupId: []]
//assumeing userId ang groupId are different
class User {
    constructor(groupId,userId) {
        this.userId = userId;
        this.groupId = groupId;
        this.likedRestaurants = []; //store restaurant' id
    }
}

class Group {
    constructor(groupId) {
        this.groupId = groupId
        this.members = [] //store users' id
        this.cachedResult = null
    }
}

//fly weight class, intialized only once and contains all the users
class Users {
    constructor() {
        
    }
    insertNewUser(groupId,userId) {
        this.userMap.set(userId, new User(groupId,userId))
    }
    likeRestaurant(userId,resId) {
        this.userMap.get(userId).likedRestaurants.push(resId)
        //call algorithm
        const gId = this.getGroupId(userId)
       return checkForMatch(this.userMap.get(user.userId),groups.groupMap.get(gId),resId)
    }
    removeUser(userId) {
        if (this.userMap.has(userId)){
            this.userMap.delete(userId)
        }
    }
    getLikedRestaurant(userId){
        return this.userMap.get(userId).likedRestaurants;
    }
    getGroupId(userId){
        return this.userMap.get(userId).groupId;
    }
 }

 //fly weight, one instance contains all groups + its members
 class Groups {
    constructor() {
        this.groupMap = new Map();
    }
    insertNewGroup(groupId) {
        this.groupMap.set(groupId, new Group(groupId))
    }
    insertNewMember(groupId, userId) {
        if(this.groupMap.has(groupId)){
            this.groupMap.get(groupId).members.push(userId)
        }
        else{
            this.groupMap.set(groupId,new Group(groupId))
            this.groupMap.get(groupId).insertNewMember(userId)
        }
    }
    removeMember(groupId,userId) {
        let arr = this.groupMap.get(groupId).members
        const index = arr.indexOf(userId)
        if (index > -1) {
            this.groupMap.set(groupId, arr.splice(index,1))
        }
    }
    removeGroup(groupId) {
        if (this.groupMap.has(groupId)) {
            this.groupMap.delete(groupId)
        }
    }
    getMembers(groupId) {
        return this.groupMap.get(groupId).members;
    }
    getCachedResult(groupId){
        return this.groupMap.get(groupId).cachedResult;
    }
    setCachedResult(groupId, resId){
        this.groupMap.get(groupId).cachedResult = resId;
    }

 }

 let groups = new Groups();
 let users = new Users();

 module.exports = groups
 module.exports = users