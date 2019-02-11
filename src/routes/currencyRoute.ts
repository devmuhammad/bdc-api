import { Router } from 'express'
const router = Router();
import * as CurrencyController from "../controllers/currency.controller"


// Currency Routes
router.get('/getcurrencies', CurrencyController.getCurrencies); // endpoint for retrieving all currencies GET
router.get('/:id', CurrencyController.getcurrencyById);

export = router