import { Request, Response } from "express";
import { connection } from "../database/connection";
import { TPurchase } from "../models/TPurchase";

export const createPurchase = async (req: Request, res: Response) => {
    let errorCode = 400;
    try{
        const quantity = req.body.quantity;
        const user_id = req.body.user_id;
        const product_id = req.body.product_id

        if (!user_id || !product_id || !quantity){
            throw new Error ("Body inválido")
        }

        const productCompra = await connection ("labecommerce_products").where('id', product_id)
       
        const id = Date.now().toString()
        
        //const total_price = price * quantity
        
        const newPurchase: TPurchase = {
            id: Date.now().toString(),
            user_id,
            product_id,
            quantity,
            total_price
        }
        await connection("labecommerce_purchases").insert(
            {   id:newPurchase.id,
                quantity: newPurchase.quantity,
                user_id: newPurchase.user_id,
                product_id: newPurchase.product_id,
                total_price: newPurchase.total_price
            } )
            res.status(200).send("Compra feita com sucesso!", newPurchase)

    }catch (error:any){
        res.status(errorCode).send({message:error.message})
    }

}