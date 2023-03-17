import { Request, Response } from "express";
import { connection } from "../database/connection";

export const createProduct = async (req: Request, res: Response) => {
    let errorCode = 400;
    try{
        const name = req.body.name;
        const price = req.body.price;
        const image_url = req.body.image_url;

        if (!name || !price || !image_url){
            throw new Error ("Body inválido")
        }

        await connection("labecommerce_products").insert(
            {
                name,
                price,
                image_url
            })
            res.status(200).send("Produto cadastrado com sucesso!")

    }catch (error:any){
        res.status(errorCode).send({message:error.message})
    }

}