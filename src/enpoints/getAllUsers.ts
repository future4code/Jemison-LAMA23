import { Request, Response } from "express"
import { connection } from "../database/connection";

export const getAllUsers = async (req:Request, res: Response) =>{
    let errorCode = 400;
    try{
        const users = await connection.select('*').from("labecommerce_users");
        res.status(200).send(users)
    }catch(error:any){
        res.status(errorCode).send({message: error.message})
    }
}