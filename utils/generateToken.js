import  jwt  from "jsonwebtoken";

const generateToken = (id) => {  //using user id to generate the Token
    return jwt.sign({id} , process.env.JWT_KEY , {expiresIn : '3d'})
};

export default generateToken;

