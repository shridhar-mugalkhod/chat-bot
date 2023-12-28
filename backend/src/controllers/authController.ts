import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import User from "../models/userModel.js";

const signToke = (id:any) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    })
}

export  const createSendToken = (user:any,statusCode:number,req:Request,res:Response) => {
    const token = signToke(user._id);

    res.cookie('auth-token',token,{
        expires:new Date(
            Date.now() + parseInt(process.env.JWT_COOKIES_EXPIRES_IN) *24 *60 *60*1000
        ),
        httpOnly:true,
        secure: req.secure || req.headers['x-forworded-proto'] === 'https',
        signed:true,
    });

    user.password = undefined;

    res.status(statusCode).json({
        message:"success",
        name: user.name, email: user.email
    })
}

export const verifyToken = async (req:Request,res:Response,next:NextFunction) => {
    try {        
        const token = req.signedCookies['auth-token'];

        if (!token || token.trim() === "") {
            return res.status(401).json({message:"You are not logged in! Please log in to get access."})
        }

        const jwtVerifyPromisified = (token:string) => {
            return new Promise((resolve, reject) => {
                jwt.verify(token,process.env.JWT_SECRET,(err:any, success:any) => {
                    if (err) {
                        reject(err.message)
                        return res.status(401).json({message:"You are not logged in! Please log in to get access."})
                    } else {
                        resolve(success)
                    }
                });
            });
        }

        const decode = await jwtVerifyPromisified(token);
        
        const currentUser = await User.findById(decode['id'])   // ********************************************************This line has to change.*****************************************************
        if (!currentUser) {
            return res.status(401).json({message:"The user belonging to this token does no longer exist."})
        }
        
        res.locals.user = currentUser;
        next();
    } catch (error) {
        
    }

}