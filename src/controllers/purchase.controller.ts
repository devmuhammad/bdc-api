import { Request, Response } from "express";
import { getConnection, Repository, getManager } from "typeorm";
import { purchase } from "../entities/purchase";
import { purchasemain } from "../entities/purchasemain";

let purchaseRepository: Repository<purchase>;

const initializeDb = async () => {
    purchaseRepository = getManager().getRepository(purchase);
}

/**
 * Loads all purchase from the database.
 */

export const getPurchases = async (req: Request, res: Response) => {
    try {
        initializeDb();
        const allPurchases = await purchaseRepository.find()
        return res.status(200).json({ status: "success", message: "Purchases", data: allPurchases })

    } catch (error) {
        return res.status(500).json({ status: "error", message: "DB Error ", error })
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
        return res.status(500).json({ status: "error", message: "DB Error ", error })
    }
}

/**
 * Create new purchase
 */
export const addPurchase = async (req: Request, res: Response) => {
    try {
        initializeDb();
        const newPurchase = await purchaseRepository.create(req.body)

        await purchaseRepository.save(newPurchase)
        return res.status(200).json({ status: "success", message: "Purchase Added Successfully", data: newPurchase })

    } catch (error) {
        return res.status(500).json({ status: "error", message: "DB Error ", error })
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
        return res.status(500).json({ status: "error", message: "DB Error ", error })
    }
}

/**
 * Delete a purchase
 */
export const deletePurchase = async (req: Request, res: Response) => {
    try {
        initializeDb();
        await purchaseRepository.delete(req.params.id)
        return res.status(200).json({ status: "success", message: "Purchase Deleted Successfully" })

    } catch (error) {
        return res.status(500).json({ status: "error", message: "DB Error ", error })
    }
}


