import dotenv from 'dotenv';
dotenv.config();  // it helps to use the MONGO_URL in the dbConnect
import  express  from "express";
import dbConnect from "../config/dbConnect.js";
import userRoutes from '../routes/userRoutes.js';
import { globslErrHandler , notFound } from '../middlewares/globalErrHandler.js';
import productsRouter from '../routes/productsRoutes.js';
import categoriesRouter from '../routes/categoriesRoutes.js';
import brandsRouter from '../routes/brandsRoutes.js';

//db Connect
dbConnect();

const app = express();

//pass incoming data
app.use(express.json())


//routes
//to be able to progress with middleware
// middleware is a function that have
//access to the requestObject and the Responce and we can do some operations between them before and after 

//here we're going to prog with middleware

app.use('/api/v1/users/' , userRoutes);
app.use('/api/v1/products/' , productsRouter);
app.use('/api/v1/categories/' , categoriesRouter)
app.use('/api/v1/brands/' , brandsRouter)
//err handler
app.use(notFound)
app.use(globslErrHandler)



export default app ;