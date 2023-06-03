import  express  from "express";
import  {isLoggedIn}  from "../middlewares/isLoggedIn.js";
import { createBrandCtrl, deleteBrandCtrl, getAllBrandsCtrl, getSingleBrandsCtrl, updateBrandCtrl } from '../controllers/brandsCtrl.js'



const brandsRouter = express.Router();


brandsRouter.post('/', isLoggedIn ,createBrandCtrl);
brandsRouter.get('/',getAllBrandsCtrl);
brandsRouter.get('/:id',getSingleBrandsCtrl);
brandsRouter.put('/:id',isLoggedIn ,updateBrandCtrl);
brandsRouter.delete('/:id',isLoggedIn,deleteBrandCtrl);



export default brandsRouter;