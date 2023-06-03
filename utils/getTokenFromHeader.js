export const getTokenFromHeader = (req) => {
    // get token from header
const token = req?.headers?.authorization?.split(' ')[1]; // provide for us the token come from user || when we use split it seprate the string by (' ') and seprate for us the bearer and token by [1] we can choose the second argument in array and thats just token that we need
// console.log(token)
if(token === undefined){
    return 'No token Found '
}else{
    return token;
};
};

