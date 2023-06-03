import Brands from "../model/Brands.js";
import asyncHandler from 'express-async-handler';


//@desc  Create new Brand
//@route  POST api/v1/Brand
//@access private / Admin



export const createBrandCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;

    //if Brand exist
    const BrandExists = await Brands.findOne({ name })

    if (BrandExists) {
        throw new Error('Brand Already Exists ')
    }


    //create Brand
    const brand = await Brands.create({
        name : name.toLowerCase(),
        user: req.userAuthId,
    });

    //send responce
    res.json({
        message: ' Brand Successfully Created',
        status: 'Success',
        brand,

    });
});



//@desc  GET all Brands
//@route  GET api/v1/brands
//@access Public


export const getAllBrandsCtrl = asyncHandler(async (req, res) => {

    let brands = await Brands.find();

    //send responce
    res.json({
        message: ' Brand Successfully Fetched',
        status: 'Success',
        brands,

    });
});



//@desc  GET Single Brand
//@route  GET api/v1/brands/:id
//@access Public


export const getSingleBrandsCtrl = asyncHandler(async (req, res) => {

    let brand = await Brands.findById(req.params.id);

    if (!brand) {
        throw new Error("Brand not Found")
    }

    //send responce
    res.json({
        message: ' Brand Successfully Fetched',
        status: 'Success',
        brand,

    });
});



    //@desc  UPDATE single Brand
//@route  PUT api/brand/:id/update
//@access private / Admin

export const updateBrandCtrl = asyncHandler( async ( req , res)=>{
    // distructure the properties of product that we want to update
    const {name} = req.body ;
   
   //update 
   
   const brand = await Brands.findByIdAndUpdate(req.params.id , {

     name,
     
   },{
     new : true
   })
   
     res.json({
       status : "Success",
       message : "Brand Updated Successfully",
       brand,
     });
   } );
   



   //@desc  Delete single Brand
//@route  DELETE api/brand/:id/delete
//@access private / Admin


export const deleteBrandCtrl = asyncHandler( async (req , res) => {

    await Brands.findByIdAndDelete(req.params.id)
 
   res.json({
     status : "Success",
     message : "The Brand Deleted Successfully",
     
   })
 })