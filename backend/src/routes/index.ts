import {Router} from 'express'
import userRouter from './userRoutes.js';
import chatsRouter from './chatsRoutes.js';

const appRouter = Router();

appRouter.use("/user",userRouter);
appRouter.use("/chat",chatsRouter);

export default appRouter;