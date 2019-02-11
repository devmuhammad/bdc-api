import { Request, Response } from "express";
import { getConnection, Repository, getManager } from "typeorm";
import { selling } from "../entities/selling";
import { purchase_details } from "../entities/purchase_details";
import { currency } from "src/entities/currency";

let saleRepository: Repository<selling>;
let detailsRepository: Repository<purchase_details>;

const initializeDb = async () => {
    saleRepository = getManager().getRepository(selling);
    detailsRepository = getManager().getRepository(purchase_details)

}

/**
 * Loads all sales from the database.
 */

export const getSales = async (req: Request, res: Response) => {
    try {
        initializeDb();
        const allSales = await saleRepository.find({ relations: ["purchase_detail","currency"], order:{transaction_date: 'DESC'} })
        return res.status(200).json({ status: "success", message: "Sales", data: allSales })

    } catch (error) {
        return res.status(500).json({ status: "error", message: "DB Error ", err:error })
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
        return res.status(500).json({ status: "error", message: "DB Error ", err:error })
    }
}

/**
 * Create new Sale
 */
export const addSale = async (req: Request, res: Response) => {
    try {
        initializeDb();
        // const newSale = await saleRepository.create(req.body)
        let newSale = new selling

        newSale = req.body
        newSale.transaction_ref = 'SLS-'+(Date.now().toString(36).substring(2,5) +'-'+ Math.random().toString(36).substr(2, 5)).toUpperCase()
       
        const nwSale = await saleRepository.save(newSale)

        req.body.saleid = nwSale.id

        let nwdetail = new purchase_details
        let detlength = req.body.sale_detail.length

        let saledetail = req.body.sale_detail
        for (let i=0;i<detlength; i++){
            let savedetail = await detailsRepository.update({currencyno: saledetail[i].currencyno},
                {
                    status:"Sold",
                    sales: req.body.saleid,
                    soldrate:req.body.soldrate
            } )
        }

        // nwdetail = req.body.sale_detail
        
        // for (let i=0; i<detlength; i++ ){
        // nwdetail[i].sales = req.body.saleid    
        // }
        // let savedetail = await detailsRepository.save(nwdetail)
        // console.log(savedetail)

        return res.status(200).json({ status: "success", message: "New Sale", data: nwSale })

    } catch (error) {
        return res.status(500).json({ status: "error", message: "DB Error ", err:error })
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
        return res.status(500).json({ status: "error", message: "DB Error ", err:error })
    }
}

/**
 * Delete a sale
 */
export const deleteSale = async (req: Request, res: Response) => {
    try {
        initializeDb();
        await saleRepository.delete(req.params.id)
        return res.status(200).json({ status: "success", message: "Sales Deleted Successfully" })

    } catch (error) {
        return res.status(500).json({ status: "error", message: "DB Error ", err:error })
    }
}