import User from "../model/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from 'bcryptjs'
import generateToken from "../utils/generateToken.js";
import  {getTokenFromHeader}  from "./../utils/getTokenFromHeader.js";
import  {verifyToken}  from "./../utils/verifyToken.js";

//@desc RegisterUser


//@routes POST api/v1/users/register

//access Private/Admin

export const registerUserCtrl = asyncHandler(
   async( req , res ) => {

      const {fullname , email , password} =req.body; //distructure the payload
          //check if user exist  
          const userExists = await User.findOne({email})  //want to find specific user
          if(userExists){
             //throw alert
              throw new Error('user already exists')
          }
 
          //hash password 
 
          const salt = await bcrypt.genSalt(10);  //generating some randoms string characters of the user password  || we can increase the number and it makes more security but slower down the app
          const hashedPassword = await bcrypt.hash(password , salt); // actual hash pass
          //create new user(if userExists cant find user with existion email)
          const user = await User.create({
             fullname,
             email,
             password : hashedPassword,
          });
 
          res.status(201).json({
             status : 'success',
             message : 'user Registered Successfully',
             data : user,
          })
 }
)

// we need to call registerUserCtrl and to achive that we need to pass it as a middleware to express router


//@desc  POST Users
//@route  POST api/v1/users/login
//@access  Public

//creating controller for login

export const loginUserCtrl = asyncHandler(
   async ( req , res) => {
      const {email , password} = req.body // user provides email and pass for login
   
      //allow user to log in just by email : in this case we need to find the email in db
      const userFound = await User.findOne({
         email,
      });
   
     if (userFound && await bcrypt.compare(password , userFound && userFound.password)){
      res.json({
         status : 'Success',
         message : 'User Logged in Succsessfully',
         userFound,
         token : generateToken(userFound._id)
      })
     }else{
    throw new Error('Invalid Login Cridentials')
     }
   }  //we need to create a route for this controller to be called and lets go to the usersRoutes
);


//@desc  get user profile
//@route  GET api/v1/user/profile
//@access Private

export const getUserProfileCtrl = asyncHandler(async (req , res) => {
 
   const token = getTokenFromHeader(req);
   console.log(token)

   //verify token
   const verified = verifyToken(token)
console.log(verified);

   res.json({
      msg : 'Welcom to profile page'
   })
});