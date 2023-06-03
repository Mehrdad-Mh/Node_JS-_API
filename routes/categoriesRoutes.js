import  express  from "express";
import {createCategoryCtrl , deleteCategoryCtrl, getAllCategoryCtrl , getSingleCategoryCtrl, updateCategoryCtrl} from '../controllers/categoriesCtrl.js'
import  {isLoggedIn}  from "../middlewares/isLoggedIn.js";

const categoriesRouter = express.Router();


categoriesRouter.post('/', isLoggedIn ,createCategoryCtrl);
categoriesRouter.get('/',getAllCategoryCtrl);
categoriesRouter.get('/:id',getSingleCategoryCtrl);
categoriesRouter.put('/:id',isLoggedIn ,updateCategoryCtrl);
categoriesRouter.delete('/:id',isLoggedIn,deleteCategoryCtrl);



export default categoriesRouter;