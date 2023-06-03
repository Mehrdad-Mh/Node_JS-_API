import Category from "../model/Caregory.js";
import asyncHandler from 'express-async-handler';


//@desc  Create new Category
//@route  POST api/v1/categories
//@access private / Admin



export const createCategoryCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;

    //if Category exist
    const categoryExists = await Category.findOne({ name })

    if (categoryExists) {
        throw new Error('Category Already Exists ')
    }


    //create category
    const category = await Category.create({
        name : name.toLowerCase(),
        user: req.userAuthId,
    });

    //send responce
    res.json({
        message: ' Category Successfully Created',
        status: 'Success',
        category,

    });
});



//@desc  GET all Categories
//@route  GET api/v1/categories
//@access Public


export const getAllCategoryCtrl = asyncHandler(async (req, res) => {

    let categories = await Category.find();

    //send responce
    res.json({
        message: ' Category Successfully Created',
        status: 'Success',
        categories,

    });
});



//@desc  GET Single Categories
//@route  GET api/v1/categories/:id
//@access Public


export const getSingleCategoryCtrl = asyncHandler(async (req, res) => {

    let category = await Category.findById(req.params.id);

    if (!category) {
        throw new Error("Category not Found")
    }

    //send responce
    res.json({
        message: ' Category Successfully Fetched',
        status: 'Success',
        category,

    });
});



    //@desc  UPDATE single Category
//@route  PUT api/category/:id/update
//@access private / Admin

export const updateCategoryCtrl = asyncHandler( async ( req , res)=>{
    // distructure the properties of product that we want to update
    const {name} = req.body ;
   
   //update 
   
   const category = await Category.findByIdAndUpdate(req.params.id , {

     name,
     
   },{
     new : true
   })
   
     res.json({
       status : "Success",
       message : "Category Updated Successfully",
       category,
     });
   } );
   



   //@desc  Delete single Category
//@route  DELETE api/category/:id/delete
//@access private / Admin


export const deleteCategoryCtrl = asyncHandler( async (req , res) => {

    await Category.findByIdAndDelete(req.params.id)
 
   res.json({
     status : "Success",
     message : "Category Deleted Successfully",
     
   })
 })