import {Router} from 'express'
import { allUsers, userAuthStatus, userLogin, userLogout, userSignup } from '../controllers/userController.js';
import { loginValidator, signupValidator, validate } from '../utils/validators.js';
import {verifyToken } from '../controllers/authController.js';

const userRouter = Router();


userRouter.route("/signup").post(validate(signupValidator),userSignup);
userRouter.route("/login").post(validate(loginValidator),userLogin);
userRouter.route("/auth-status").get(verifyToken,userAuthStatus);
userRouter.route("/logout").get(verifyToken,userLogout);
userRouter.route("/").get(verifyToken,allUsers);

export default userRouter;