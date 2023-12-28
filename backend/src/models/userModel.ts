import { randomUUID } from 'crypto';
import { NextFunction } from 'express';
import bycrpt from 'bcrypt';
import mongoose, { Mongoose } from 'mongoose'

export interface IUser extends mongoose.Document{
    name:string,
    email:string,
    password:string,
    chats:Array<{role: string; content: string }>,

    correctPassword(candidatePassword:string,userPassword:string):boolean
}

const chatSchema = new mongoose.Schema({
    // id:{
    //     type:String,
    //     default:randomUUID()
    // },
    role:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true
    },
})

const userShema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        select: false
    },
    chats:{ type: [chatSchema], default: [] },
})

userShema.pre('save',async function (next:NextFunction) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = await bycrpt.hash(this.password,12);
    
    next();
})

userShema.methods.correctPassword = async function (candidatePassword:string,userPassword:string) {
    return await bycrpt.compare(candidatePassword,userPassword)
}

export default mongoose.model<IUser>("User",userShema);