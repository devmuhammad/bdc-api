import { Router } from 'express'
const router = Router();
import { getUsers } from "../controllers/user.controller"
import { getUserById } from "../controllers/user.controller"
import { addUser } from "../controllers/user.controller"
import { updateUser } from "../controllers/user.controller"
import { deleteUser } from "../controllers/user.controller"



// User Routes
router.get('/getusers', getUsers); // endpoint for retrieving all users GET
router.post('/add', addUser); //endpoint for creating new user POST
router.get('/get/:userId', getUserById);  //endpoint for retrieving single user by id GET
router.put('/update', updateUser); //endpoint to update users profile  PUT
router.delete('/delete/:userId', deleteUser); //endpoint to delete user by Id DELETE


export = router;
