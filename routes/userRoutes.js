//we want to have route for specific controller and models 

import  exppress  from "express";
import { registerUserCtrl  , loginUserCtrl , getUserProfileCtrl} from "../controllers/usersCtrl.js";
import {isLoggedIn} from '../middlewares/isLoggedIn.js';

const userRoutes = exppress.Router();

userRoutes.post('/register', registerUserCtrl);
userRoutes.post('/login', loginUserCtrl);
userRoutes.get('/profile' ,isLoggedIn , getUserProfileCtrl);


export default userRoutes;//we need toMount this route so get back to app and pass it as a middleware to expresss

 