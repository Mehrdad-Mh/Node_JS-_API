import  express  from "express";
import  {isLoggedIn}  from "../middlewares/isLoggedIn.js";
import { createColorCtrl, deleteColorCtrl, getAllColorsCtrl, getSingleColorsCtrl, updateColorCtrl } from '../controllers/colorsCtrl.js'



const colorsRouter = express.Router();


colorsRouter.post('/', isLoggedIn ,createColorCtrl);
colorsRouter.get('/',getAllColorsCtrl);
colorsRouter.get('/:id',getSingleColorsCtrl);
colorsRouter.put('/:id',isLoggedIn ,updateColorCtrl);
colorsRouter.delete('/:id',isLoggedIn,deleteColorCtrl);



export default colorsRouter;