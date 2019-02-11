import { Request, Response } from "express";
import { getConnection, Repository, getManager } from "typeorm";
import { daily_rate } from "../entities/daily_rate";
import { currency } from "../entities/currency";

let rateRepository: Repository<daily_rate>;
let currencyRepository : Repository<currency>;

const initializeDb = async () => {
    rateRepository = getManager().getRepository(daily_rate);
    currencyRepository = getManager().getRepository(currency);
}

/**
 * Loads all Rates from the database.
 */

export const getRates = async (req: Request, res: Response) => {
    try {
        initializeDb();
        const allXchange = await rateRepository.find({order:{datecreated:'DESC'}})

        return res.status(200).json({ status: "success", message: "Rates", data:allXchange })

    } catch (error) {
        
        return res.status(500).json({ status: "error", message: "DB Error ", err:error })
    }
}

/**
* Load a rate by ID.
*/
export const getRateById = async (req: Request, res: Response) => {
    try {
        initializeDb();
        const rate = await rateRepository.findOne(req.params.id)

        if (!rate) return res.status(404).json({ status: "error", message: "Rate does not exist" })

        return res.status(200).json({ status: "success", message: "Rate", data: rate })

    } catch (error) {
        return res.status(500).json({ status: "error", message: "DB Error ", err:error })
    }
}

/**
 * Create new Rate
 */
export const addRate = async (req: Request, res: Response) => {
    try {
        initializeDb();
        const newRate = await rateRepository.create(req.body)

        const nwRate = await rateRepository.save(newRate)

        return res.status(200).json({ status: "success", message: "New Rate", data: nwRate })

    } catch (error) {
        return res.status(500).json({ status: "error", message: "DB Error ", err:error })
    }
}

/**
 * Update a rate
 */
export const updateRate = async (req: Request, res: Response) => {
    try {
        initializeDb();
        let toUpdate = await rateRepository.findOne(req.body.id);

        let updated = Object.assign(toUpdate, req.body)
        await rateRepository.save(updated)
        return res.status(200).json({ status: "success", message: "Rate Updated Successfully", data: updated })

    } catch (error) {
        return res.status(500).json({ status: "error", message: "DB Error ", err:error })
    }
}

/**
 * Delete a rate
 */
export const deleteRate = async (req: Request, res: Response) => {
    try {
        initializeDb();
        await rateRepository.delete(req.params.id)
        return res.status(200).json({ status: "success", message: "Rate Deleted Successfully" })

    } catch (error) {
        return res.status(500).json({ status: "error", message: "DB Error ", err:error })
    }
}

