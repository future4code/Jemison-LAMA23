import { Request, Response } from "express"
import { connection } from "../database/connection";

export const getAllProducts = async (req:Request, res: Response) =>{
    let errorCode = 400;
    try{
        const products = await connection.select('*').from("labecommerce_products");
        res.status(200).send(products)
    }catch(error:any){
        res.status(errorCode).send({message: error.message})
    }
}


