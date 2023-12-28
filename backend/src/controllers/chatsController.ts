import { NextFunction, Request, Response } from "express";
import { configureOpenAI } from "../config/openapiConfig.js";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";
import User from "../models/userModel.js";

export const generateChatCompletion = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const {message} = req.body;
        const user = await User.findById(res.locals.user.id);

        const chats = user.chats.map(({role,content}) => ({
            role, content
        })) as ChatCompletionRequestMessage[];

        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });
        
        const config = configureOpenAI();
        const openai = new OpenAIApi(config);

        const chatResponse = (await openai.createChatCompletion({model:"gpt-3.5-turbo",messages:chats})).data.choices[0].message
            
        user.chats.push({content:chatResponse.content,role:chatResponse.role});
        await user.save();
        return res.status(200).json({ chats: user.chats });

    } catch (error) {
        res.status(500).json({message:"Something went wrong!"});
    }
}


export const sendChatsToUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //user token check
      const user = await User.findById(res.locals.user.id);
      if (!user) {
        return res.status(401).send("User not registered OR Token malfunctioned");
      }
      if (user._id.toString() !== res.locals.user.id) {
        return res.status(401).send("Permissions didn't match");
      }
      return res.status(200).json({ message: "OK", chats: user.chats });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };
  
  export const deleteChats = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //user token check
      const user = await User.findById(res.locals.user.id);
      if (!user) {
        return res.status(401).send("User not registered OR Token malfunctioned");
      }
      if (user._id.toString() !== res.locals.user.id) {
        return res.status(401).send("Permissions didn't match");
      }
      user.chats = [];
      await user.save();
      return res.status(200).json({ message: "OK" });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };