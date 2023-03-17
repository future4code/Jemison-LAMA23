import { Request, Response } from "express";
import { connection } from "../database/connection";

export const createUser = async (req: Request, res: Response) => {
    let errorCode = 400;
    try{
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        if (!name || !email || !password){
            throw new Error ("Body inválido")
        }

        await connection("labecommerce_users").insert(
            {
                name,
                email,
                password
            })
            res.status(200).send("Usuário criado com sucesso!")

    }catch (error:any){
        res.status(errorCode).send({message:error.message})
    }

}