import { Router } from 'express'
const router = Router();
import * as BiddingController from "../controllers/bidding.controller"


// Purchase Routes
router.get('/getbidpurchases', BiddingController.getbidPurchases); // endpoint for retrieving all purchases GET
router.post('/add', BiddingController.addbidPurchase); //endpoint for creating new purchase POST
router.get('/get/:purchaseId', BiddingController.getbidPurchase);  //endpoint for retrieving single purchase by id GET
router.put('/update', BiddingController.updatebidPurchase); //endpoint to update purchases profile  PUT
router.delete('/delete/:purchaseId', BiddingController.deletebidPurchase); //endpoint to delete purchase by Id DELETE


export = router;