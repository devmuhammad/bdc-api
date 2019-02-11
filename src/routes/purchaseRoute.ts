import { Router } from 'express'
const router = Router();
import * as PurchaseController from "../controllers/purchase.controller"


// Purchase Routes
router.get('/getpurchases', PurchaseController.getPurchases); // endpoint for retrieving all purchases GET
router.post('/add', PurchaseController.addPurchase); //endpoint for creating new purchase POST
router.get('/get/:purchaseId', PurchaseController.getPurchaseById);  //endpoint for retrieving single purchase by id GET
router.get('/getpurchasedetail/:currencyid', PurchaseController.getPurchaseDetail);  //endpoint for retrieving single purchase by id GET
router.put('/update', PurchaseController.updatePurchase); //endpoint to update purchases profile  PUT
router.delete('/delete/:purchaseId', PurchaseController.deletePurchase); //endpoint to delete purchase by Id DELETE


export = router;