import { Request, Response } from "express";
import { getConnection, Repository, getManager } from "typeorm";
import { purchase } from "../entities/purchase";
import { purchase_details } from "../entities/purchase_details";


let purchaseRepository: Repository<purchase>;
let detailsRepository: Repository<purchase_details>;

const initializeDb = async () => {
    purchaseRepository = getManager().getRepository(purchase);
    detailsRepository = getManager().getRepository(purchase_details)
}

/**
 * Loads all purchase from the database.
 */

export const getPurchases = async (req: Request, res: Response) => {
    try {
        initializeDb();
        const allPurchases = await purchaseRepository.find( { relations: ["currency","purchase_detail"], order:{transaction_date: 'DESC'} })
        
        return res.status(200).json({ status: "success", message: "Purchases", data: allPurchases })

    } catch (error) { 
        // console.log(error)
        return res.status(500).json({ status: "error", message: "DB Error ", err:error })
    }
}

/**
* Loads a purchase by ID.
*/
export const getPurchaseById = async (req: Request, res: Response) => {
    try {
        initializeDb();
        const purchase = await purchaseRepository.findOne(req.params.id)

        if (!purchase) return res.status(404).json({ status: "error", message: "Purchase not found" })

        return res.status(200).json({ status: "success", message: "Purchase", data: purchase })

    } catch (error) {
        return res.status(500).json({ status: "error", message: "DB Error ", err:error })
    }
}

/**
* Get a single purchase detail;
*/
export const getPurchaseDetail = async (req: Request, res: Response) => {
    try {
        initializeDb();
        const purchase = await detailsRepository.find({ where:{currency:req.params.currencyid, status : "available"}})

        if (!purchase) return res.status(404).json({ status: "error", message: "Not found" })

        return res.status(200).json({ status: "success", message: "Purchase", data: purchase })

    } catch (error) {
        return res.status(500).json({ status: "error", message: "DB Error ", err:error })
    }
}



/**
 * Create new purchase
 */
export const addPurchase = async (req: Request, res: Response) => {
    try {
        initializeDb();
        let newPurchase = new purchase

        // let newPurchase = await purchaseRepository.create(req.body)
        // newPurchase.purchase_detail.push(req.body.purchase_detail)
        newPurchase = req.body
        newPurchase.transaction_ref = 'PCH-'+(Date.now().toString(36).substring(2,5) +'-'+ Math.random().toString(36).substr(2, 5)).toUpperCase()
        // newPurchase.purchase_detail = [nwdetail]
        
        const nwPurchase = await purchaseRepository.save(newPurchase)
        
        req.body.purchas = nwPurchase.id
        
        let nwdetail = new purchase_details
        
        // nwdetail.currency = req.body.purchase_detail[0].currency.code
        let detlength = req.body.purchase_detail.length
        nwdetail = req.body.purchase_detail
        for (let i=0; i<detlength; i++ ){
        nwdetail[i].purchase = req.body.purchas
        }
        await detailsRepository.save(nwdetail)
        
        return res.status(200).json({ status: "success", message: "Purchase Added Successfully", data: nwPurchase })

    } catch (error) { console.log(error)
        return res.status(500).json({ status: "error", message: "DB Error ", err:error })
    }
}


/**
 * Update a purchase
 */
export const updatePurchase = async (req: Request, res: Response) => {
    try {
        initializeDb();
        let toUpdate = await purchaseRepository.findOne(req.body.id);

        let updated = Object.assign(toUpdate, req.body)
        await purchaseRepository.save(updated)
        return res.status(200).json({ status: "success", message: "Purchase Updated Successfully", data: updated })

    } catch (error) {
        return res.status(500).json({ status: "error", message: "DB Error ", err:error })
    }
}

/**
 * Delete a purchase
 */
export const deletePurchase = async (req: Request, res: Response) => {
    try {
        initializeDb();
       
        await purchaseRepository.delete(req.params.purchaseId)
        return res.status(200).json({ status: "success", message: "Purchase Deleted Successfully" })

    } catch (error) {
       
        return res.status(500).json({ status: "error", message: "DB Error ", err:error })
    }
}


