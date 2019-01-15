import { Router } from 'express'
const router = Router();
import * as SaleController from "../controllers/selling.controller"


// Sale Routes
router.get('/getsales', SaleController.getSales); // endpoint for retrieving all sales GET
router.post('/add', SaleController.addSale); //endpoint for creating new sale POST
router.get('/get/:saleId', SaleController.getSaleById);  //endpoint for retrieving single sale by id GET
router.put('/update', SaleController.updateSale); //endpoint to update sales profile  PUT
router.delete('/delete/:saleId', SaleController.deleteSale); //endpoint to delete sale by Id DELETE


export = router;