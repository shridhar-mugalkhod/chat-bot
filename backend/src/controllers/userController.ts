import { NextFunction, Request, Response } from "express";
import User from "../models/userModel.js"
import { createSendToken } from "./authController.js";

export const allUsers =async (req:Request,res:Response,next:NextFunction) => {
    try {
        const user = await User.find();
        res.status(200).json({allUsers:user})
    } catch (error) {
        return res.status(500).json({message:error});        
    }
}


export const userSignup = async(req:Request,res:Response,next:NextFunction) => {
  try {
    const {name,email,password} = req.body;

    const newUser = await User.create({
        name,email,password
    })

    createSendToken(newUser,201,req,res)

  } catch (error) {
    return res.status(500).json({error:error})
  }   
}


export const userLogin = async(req:Request,res:Response,next:NextFunction) => {
    try {
        const {email,password} = req.body;
  
        const user = await User.findOne({email}).select('+password');

        if (!user || !(await user.correctPassword(password,user.password))) {
            return res.status(400).json({message:"Incorrect Email or Password"});
        }

        createSendToken(user,200,req,res)
  
    } catch (error) {
      console.log(error);
      
      return res.status(500).json({error:error})
    }   
}

export const userAuthStatus = async(req:Request,res:Response,next:NextFunction) => {
  try {
    const user= res.locals.user;
    
    return res
    .status(200)
    .json({ message: "OK", name: user.name, email: user.email });

  } catch (error) {
    return res.status(500).json({error:error})
  }   
}

export const userLogout = async(req:Request,res:Response,next:NextFunction) => {
  try {
    res.clearCookie("auth-token", {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    // res.cookie('jwt', 'loggedout', {
    //   expires: new Date(Date.now() + 10 * 1000),
    //   httpOnly: true
    // });
    
    return res
      .status(200)
      .json({ message: "Logout successful"});

  } catch (error) {
    return res.status(500).json({error:error})
  }   
}