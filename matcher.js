import { groups, users } from './classes'
//json classess stored in mongoDB
//Group
//- groupId
//- restaurantsId
//-members (User)
//User
//-name
//-map<groupId, preferredRestaurant>

//this module check for a matched restaurants in a group.
//It returns restaurantId if found, null if not found.
//this function will be wrapped in a transaction to protect race conditions
export function checkForMatch(userId, groupId, restaurantId) {
    //check for quick result
    if (groups.getCachedResult(groupId)) {
        if ( groups.getCachedResult() == restaurantId) {
            return restaurantId //match
        }
        else {
            return null //not match
        }
    }
    //check if the restaurantId match with other restaurants that the user liked
    let count = 0;
    let groupMembers = groups.getMembers(groupId)
    for (let i = 0; i < groupMembers.length; i++) {
        memberRest = users.getLikedRestaurant(groupMembers[i])
        for (let j = 0; j < memberRest.length; j++) {
            if (restaurantId == memberRest[j]) {
                count += 1;
                break;
            }
        }
    }
    if (count == groupMembers.length) {
        //matched successfully in the whole group
        groups.setCachedResult(groupId,restaurantId)
        return restaurantId
    }
    return null
}
