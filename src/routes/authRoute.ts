import { Router } from 'express'
const router = Router();
import * as AuthController from "../controllers/auth.controller"


// Authentication Routes
router.post('/login', AuthController.login); //endpoint for login POST
router.post('/register', AuthController.register);  //endpoint for register POST
router.get('/logout', AuthController.logout); //endpoint to logout  GET

export = router;
