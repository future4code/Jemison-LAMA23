import { Request, Response } from "express"

export const teste = async (req: Request, res: Response) => {
    let errorCode = 400;
    try{
        res.status(200).send("Pong!")
    }catch (error:any){
        res.status(errorCode).send({message:error.message})
    }

}