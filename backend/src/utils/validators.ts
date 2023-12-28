import { NextFunction, Request, Response } from "express";
import { ValidationChain, body, validationResult } from "express-validator";

export const validate = (validations:ValidationChain[]) => {
    return async(req:Request,res:Response,next:NextFunction) => {
        for (const validation of validations) {
            const errors = await validation.run(req);
            if (!errors.isEmpty()) {
                break;
            }
        }

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(400).json({errors:errors.array()});
    }
}
export const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password").trim().isLength({min:6}).withMessage("Password should contain atleast 6 characters"),
]

export const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    ...loginValidator,
]

export const newChatValidator = [
    body("message").notEmpty().withMessage("Message is required"),
]