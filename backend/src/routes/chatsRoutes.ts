import {Router} from 'express'
import { verifyToken } from '../controllers/authController.js';
import { newChatValidator, validate } from '../utils/validators.js';
import { generateChatCompletion ,sendChatsToUser,deleteChats} from '../controllers/chatsController.js';

const chatsRouter = Router();

chatsRouter.route("/new").post(validate(newChatValidator),verifyToken,generateChatCompletion);
chatsRouter.get("/all-chats", verifyToken, sendChatsToUser);
chatsRouter.delete("/delete", verifyToken, deleteChats);
export default chatsRouter;