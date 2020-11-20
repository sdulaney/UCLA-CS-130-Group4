// import { groups, users } from './classes'
// const {groups,users} = require('./classes.js');
const classes = require('./classes.js');
var users = classes.Users;
var groups = classes.Groups;
var ioRedis = require('ioredis')

//json classess
//Group
//- groupId
//- restaurantsId
//-members (User)
//User
//-name
//-map<groupId, preferredRestaurant>
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
//this module check for a matched restaurants in a group.
//It returns restaurantId if found, null if not found.
//this function will be wrapped in a transaction to protect race conditions
async function checkForMatch(userId, groupId, restaurantId) {
    //check for quick result
    const client = new ioRedis()
    const match = await client.hget(groupId, 'restaurantId')
    if (match) {
        //already has result
        if ( restaurantId === match ) {
            return restaurantId //matched
        }
        else {
            return null //no match
        }
    }
    //check if the restaurantId match with other restaurants that the user liked
    let count = 0;
    //wrap in transaction
    const transactClient = new ioRedis()
    let retry = true
    let returnVal = null;
    while(retry) {
        await transactClient.watch(groupId);
        const memStr = await transactClient.hget(groupId, 'members');
        const memObj = JSON.parse(memStr)
        await transactClient.watch(memObj);
        for (let i =0; i < memObj.length; i++){
            const userRestStr = await transactClient.hget(memObj[i], 'likedRestaurantId');
            for (let j =0; j<userRestStr; j++) {
                if (restaurantId == userRestStr) {
                    count += 1;
                    break;
                }
            }
        }
        if (count == memObj.length) {
            //matched successfully in the whole group
            await transactClient.multi()
                .hset(groupId, 'restaurantId', restaurantId)
                .exec((err,result) => {
                    if (result) {
                        retry = false
                    }
                })
            returnVal = restaurantId;
        }
        else {
            await transactClient.multi()
                    .exec((err, result) => {
                        if (result) {
                            retry = false
                        }
                    })
            }
        sleep(Math.random() * 100); //retry randomly
    }
    transactClient.quit()

    return returnVal;
}
