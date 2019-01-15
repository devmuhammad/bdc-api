import {getUsers} from "./controllers/user.controller"
import {getUserById} from "./controllers/user.controller"
import {addUser} from "./controllers/user.controller"
import {updateUser} from "./controllers/user.controller"
import {deleteUser} from "./controllers/user.controller"


/**
 * All application routes.
 */
const baseUrl ="cabsolbdc/api/v1"


export const AppRoutes = [

    // User Routes

    {
        // Endpoint to get all users
        path: baseUrl+"/users",
        method: "get",
        action: getUsers
    },
    {
        // Endpoint to get single user
        path: baseUrl+"/user",
        method: "get",
        action: getUserById
    },
    {
        // Endpoint to add user
        path: baseUrl+"/user/add",
        method: "post",
        action: addUser
    },
    {
        // Endpoint to update user
        path: baseUrl+"/user/update",
        method: "put",
        action: updateUser
    },
    {
        // Endpoint to delete user
        path: baseUrl+"/user/:userId",
        method: "delete",
        action: deleteUser
    },

];