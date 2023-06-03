//we want to have route for specific controller and models 

import  express  from "express";
import  {createProductCtrl, getProductsCtrl , getProductCtrl , updateProductCtrl , deleteProductCtrl}  from "../controllers/productCtrl.js";
import  {isLoggedIn}  from "../middlewares/isLoggedIn.js";





const productsRouter = express.Router();

productsRouter.post('/', isLoggedIn ,createProductCtrl);
productsRouter.get('/' ,getProductsCtrl);
productsRouter.get('/:id' ,getProductCtrl);
productsRouter.put('/:id' , isLoggedIn ,updateProductCtrl);
productsRouter.delete('/:id/delete' , isLoggedIn ,deleteProductCtrl);



export default productsRouter;//we need toMount this route so get back to app and pass it as a middleware to expresss

 