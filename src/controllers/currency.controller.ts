import { Request, Response } from "express";
import { Repository, getManager } from "typeorm";
import { currency } from "../entities/currency";

let currencyRepository: Repository<currency>;

const initializeDb = async () => {
    currencyRepository = getManager().getRepository(currency);
}

/**
 * Loads all sales from the database.
 */

export const getCurrencies = async (req: Request, res: Response) => {
    try {
        initializeDb();
        const allCurrencies = await currencyRepository.find()
        return res.status(200).json({ status: "success", message: "Currencies", data: allCurrencies })

    } catch (error) {
        return res.status(500).json({ status: "error", message: "DB Error ", error })
    }
}