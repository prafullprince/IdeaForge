import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import { NextFunction, Request, Response } from "express";
import { UserPayload } from "../types/env";
import { ErrorResponseHandling } from "../helper/EroorResponse";
import { userRole } from "../helper/constants";
configDotenv();


// auth
export const auth = async (req: Request, res: Response,next:NextFunction): Promise<any> => {
  try {

    // fetch token
    const token = req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');
    
    // validation
    if (!token) {
      return res.status(401).json({ success: false, message: `Token is Missing` });
    }

    // token verification
    try {

      // extract payload from payload
      const decode = jwt.verify(token, process.env.SECRET_KEY!) as UserPayload;

      // add this object in request of user
      req.user = decode;

    } catch (error) {
      console.log(error);
      return res
        .status(401)
        .json({ success: false, message: 'token is invalid' });
    }

    next();

  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: `Something Went Wrong While Validating the Token`,
    });
  }
};

// isInstructor
export const isInstructor = async (req: Request, res: Response,next:NextFunction): Promise<any> => {
  try {

    // fetch token
    const accountType = req.user?.role;

    // validation
    if(!accountType){
      return ErrorResponseHandling(res,400,"credentials failed");
    }

    // checkInstructor or not
    if(accountType !== userRole.INSTRUCTOR){
      return ErrorResponseHandling(res,404,"invalid credentials");
    }

    next();
    
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: `Something Went Wrong While Validating the Token`,
    });
  }
};

// isStudent
export const isStudent = async (req: Request, res: Response,next:NextFunction): Promise<any> => {
  try {

    // fetch token
    const accountType = req.user?.role;

    // validation
    if(!accountType){
      return ErrorResponseHandling(res,400,"credentials failed");
    }

    // checkInstructor or not
    if(accountType !== userRole.STUDENT){
      return ErrorResponseHandling(res,404,"invalid credentials");
    }

    next();
    
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: `Something Went Wrong While Validating the Token`,
    });
  }
};

// isAdmin
export const isAdmin = async (req: Request, res: Response,next:NextFunction): Promise<any> => {
  try {

    // fetch token
    const accountType = req.user?.role;

    // validation
    if(!accountType){
      return ErrorResponseHandling(res,400,"credentials failed");
    }

    // checkInstructor or not
    if(accountType !== userRole.ADMIN){
      return ErrorResponseHandling(res,404,"invalid credentials");
    }

    next();
    
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: `Something Went Wrong While Validating the Token`,
    });
  }
};

