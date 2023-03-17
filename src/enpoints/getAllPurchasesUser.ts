import { Request, Response } from "express"
import { connection } from "../database/connection";

export const getAllPurchasesUser = async (req:Request, res: Response) =>{
    let errorCode = 400;
    try{
        const user_id = req.params.user_id

        const products = await connection.select(user_id).from("labecommerce_purchases");
        res.status(200).send(products)
    }catch(error:any){
        res.status(errorCode).send({message: error.message})
    }
}

