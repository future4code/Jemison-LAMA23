import { Request, Response } from "express";
import { connection } from "../database/connection";
import { TProduct } from "../models/TProduct";
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

        const findUser = await connection("labecommerce_users")
        .select()
        .where({id: user_id})

        if (findUser.length === 0) {
            errorCode = 404
            throw new Error ("Usuário não encontrado.")
        }

        const findProduct = await connection ("labecommerce_products")
        .select()
        .where({id: product_id})

        if (findProduct.length === 0) {
            errorCode = 404
            throw new Error ("Produto não encontrado.")
        }

        const product: TProduct = {
            id: findProduct[0].id,
            name: findProduct[0].name,
            price: findProduct[0].price
        }
        
        const newPurchase: TPurchase = {
            id: Date.now().toString(),
            user_id,
            product_id,
            quantity,
            total_price: product.price * quantity
        }
        await connection("labecommerce_purchases").insert(
            {   id:newPurchase.id,
                quantity: newPurchase.quantity,
                user_id: newPurchase.user_id,
                product_id: newPurchase.product_id,
                total_price: newPurchase.total_price
            } )
            res.status(200).send({message: "Compra feita com sucesso!", purchase: newPurchase})

    }catch (error:any){
        res.status(errorCode).send({message:error.message})
    }

}