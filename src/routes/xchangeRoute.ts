import { Router } from 'express'
const router = Router();
import * as RateController from "../controllers/xchangerate.controller"


// Sale Routes
router.get('/getrates', RateController.getRates); // endpoint for retrieving all Rates GET
router.post('/add', RateController.addRate); //endpoint for creating new Rate POST
router.get('/get/:rateId', RateController.getRateById);  //endpoint for retrieving single Rate by id GET
router.put('/update', RateController.updateRate); //endpoint to update Rates profile  PUT
router.delete('/delete/:rateId', RateController.deleteRate); //endpoint to delete Rate by Id DELETE


export = router;