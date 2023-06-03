import  {getTokenFromHeader}  from '../utils/getTokenFromHeader.js';
import  {verifyToken}  from '../utils/verifyToken.js';



export const isLoggedIn = ( req , res , next ) => {

    //get token from headers
   const token = getTokenFromHeader(req);
    //verify the token 
    const decodedUser= verifyToken(token);

    if(decodedUser === undefined){
        throw new Error( " Invalid token / please login again");
    }else{
            // save the user into req obj || req obj is an object we can pass our property to that

         req.userAuthId = decodedUser?.id;
         next();
    }
    
};

 