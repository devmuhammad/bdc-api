import { Request, Response } from "express";
import { Repository, getManager } from "typeorm";
import { purchase } from "../entities/purchase";
import { purchasemain } from "../entities/purchasemain";


let purchaseRepository: Repository<purchasemain>;
let purchRepository: Repository<purchase>;

const initializeDb = async () => {
    purchaseRepository = getManager().getRepository(purchasemain);
    purchRepository = getManager().getRepository(purchase);
}

/**
 * Creates new bid
 */
export const addbidPurchase = async (req: Request, res: Response) => {
    try {
        initializeDb();
        const mainpurch = await purchaseRepository.create(req.body)

        const savedmain = await purchaseRepository.save(mainpurch)
        
        // let nwPurchase = new purchase
        //     await purchRepository.create(req.body)
        // nwPurchase.main = savedmain[0].id      

        // const savepurch = await purchRepository.save(nwPurchase)
        // const newPurchase = await purchaseRepository.findOne(savedpurchase.id, { relations: ["purchases"] });

        return res.status(200).json({ status: "success", message: "Bidding Purchase Added Successfully", data: savedmain })

    } catch (error) {
        return res.status(500).json({ status: "error", message: "DB Error ", err:error })
    }
}

/**
 * Get All bid purchases
 */
export const getbidPurchases = async (req: Request, res: Response) => {
    try {
        initializeDb();

        const newPurchase = await purchaseRepository.find({ relations: ["purchases"] });

        return res.status(200).json({ status: "success", message: "Bidding Purchases", data: newPurchase })

    }catch (error) {
        return res.status(500).json({ status: "error", message: "DB Error ", err:error })
    }
};


/**
 * Get bid by Id
 */
export const getbidPurchase = async (req: Request, res: Response) => {
    try {
        initializeDb();

        const newPurchase = await purchaseRepository.findOne(req.params.id, { relations: ["purchases"] });

        return res.status(200).json({ status: "success", message: "Bidding Purchase", data: newPurchase })

    }catch (error) {
        return res.status(500).json({ status: "error", message: "DB Error ", err:error })
    }
};


/**
 * Update a purchase
 */
export const updatebidPurchase = async (req: Request, res: Response) => {
    try {
        initializeDb();
        let toUpdate = await purchaseRepository.findOne(req.body.id);

        let updated = Object.assign(toUpdate, req.body)
        await purchaseRepository.save(updated)
        return res.status(200).json({ status: "success", message: "Bid Purchase Updated Successfully", data: updated })

    } catch (error) {
        return res.status(500).json({ status: "error", message: "DB Error ", err:error })
    }
}

/**
 * Delete a purchase
 */
export const deletebidPurchase = async (req: Request, res: Response) => {
    try {
        initializeDb();
        await purchaseRepository.delete(req.params.id)
        return res.status(200).json({ status: "success", message: "Purchase Deleted Successfully" })

    } catch (error) {
        return res.status(500).json({ status: "error", message: "DB Error ", err:error })
    }
}

const generateCurrencies = async (mainpurchases) => {

    let bidpurchase = new purchase();

    const range = (start, end) => Array.from({ length: (end - start) }, (v, k) => k + start);
    const currNums = range(mainpurchases.starting_no, mainpurchases.ending_no)

    // bidpurchase.purchase_details.forEach(element => {
    for (let i = 0; i <= mainpurchases.quantity; i++) {
        const purchdetails = {
            currencyno: mainpurchases.currency_prefix + currNums[i] + mainpurchases.currency_suffix,
            note: mainpurchases.note,
            status: "available"
        }
        // bidpurchase.purchase_details.push()
    }

    bidpurchase.buyingrate = mainpurchases.buyingrate
    bidpurchase.currency   = mainpurchases.currency
    bidpurchase.quantity   = mainpurchases.quantity
    bidpurchase.totalamount = mainpurchases.totalamount
    bidpurchase.mode_of_purchase = mainpurchases.mode_of_purchase
    bidpurchase.mode_of_id = mainpurchases.mode_of_id
    bidpurchase.id_no = mainpurchases.id_no
    bidpurchase.id_expirydate = mainpurchases.id_expirydate
    bidpurchase.bvn     = mainpurchases.bvn
    bidpurchase.transaction_date = mainpurchases.transaction_date


    await purchRepository.save(bidpurchase);

    return bidpurchase;
}
