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
        const allCurrencies = await currencyRepository.find({ relations: ["daily_rates"] })
        
        return res.status(200).json({ status: "success", message: "Currencies", data: allCurrencies })

    } catch (error) {
        return res.status(500).json({ status: "error", message: "DB Error ", err:error })
    }
}

export const getcurrencyById = async (req: Request, res: Response) => {
    try {
        initializeDb();

        const currencydet = await currencyRepository.createQueryBuilder("curr")
        .innerJoinAndSelect(
          "curr.daily_rates",
          "daily_rates",
        )
        .where("curr.id = :id", {id : req.params.id})
        .orderBy("datecreated", "DESC")
        .getMany();
        

        if (!currencydet) return res.status(404).json({ status: "error", message: "Currency does not exist" })

        return res.status(200).json({ status: "success", message: "Rate", data: currencydet })

    } catch (error) {
        return res.status(500).json({ status: "error", message: "DB Error ", err:error })
    }
}
