import { Response } from "express";

export const ErrorResponseHandling = (
    res:Response,
    status:number,
    message:string
): Response => res.status(status).json({success:false,message});
