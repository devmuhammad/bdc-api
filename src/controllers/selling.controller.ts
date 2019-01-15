import { Request, Response } from "express";
import { getConnection, Repository, getManager } from "typeorm";
import { selling } from "../entities/selling";

let saleRepository: Repository<selling>;

const initializeDb = async () => {
    saleRepository = getManager().getRepository(selling);
}

/**
 * Loads all sales from the database.
 */

export const getSales = async (req: Request, res: Response) => {
    try {
        initializeDb();
        const allSales = await saleRepository.find()
        return res.status(200).json({ status: "success", message: "Users", data: allSales })

    } catch (error) {
        return res.status(500).json({ status: "error", message: "DB Error ", error })
    }
}

/**
* Load a sale by ID.
*/
export const getSaleById = async (req: Request, res: Response) => {
    try {
        initializeDb();
        const sale = await saleRepository.findOne(req.params.id)

        if (!sale) return res.status(404).json({ status: "error", message: "Sale does not exist" })

        return res.status(200).json({ status: "success", message: "Sale", data: sale })

    } catch (error) {
        return res.status(500).json({ status: "error", message: "DB Error ", error })
    }
}

/**
 * Create new Sale
 */
export const addSale = async (req: Request, res: Response) => {
    try {
        initializeDb();
        const newSale = await saleRepository.create(req.body)

        await saleRepository.save(newSale)
        return res.status(200).json({ status: "success", message: "New Sale", data: newSale })

    } catch (error) {
        return res.status(500).json({ status: "error", message: "DB Error ", error })
    }
}

/**
 * Update a sale
 */
export const updateSale = async (req: Request, res: Response) => {
    try {
        initializeDb();
        let toUpdate = await saleRepository.findOne(req.body.id);

        let updated = Object.assign(toUpdate, req.body)
        await saleRepository.save(updated)
        return res.status(200).json({ status: "success", message: "Sale Updated Successfully", data: updated })

    } catch (error) {
        return res.status(500).json({ status: "error", message: "DB Error ", error })
    }
}

/**
 * Delete a user
 */
export const deleteSale = async (req: Request, res: Response) => {
    try {
        initializeDb();
        await saleRepository.delete(req.params.id)
        return res.status(200).json({ status: "success", message: "Sales Deleted Successfully" })

    } catch (error) {
        return res.status(500).json({ status: "error", message: "DB Error ", error })
    }
}