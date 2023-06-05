import Color from "../model/Colors.js";
import asyncHandler from 'express-async-handler';


//@desc  Create new Color
//@route  POST api/v1/color
//@access private / Admin



export const createColorCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;

    //if Brand exist
    const ColorExists = await Color.findOne({ name })

    if (ColorExists) {
        throw new Error('Color Already Exists ')
    }


    //create Brand
    const color = await Color.create({
        name : name.toLowerCase(),
        user: req.userAuthId,
    });

    //send responce
    res.json({
        message: ' Color Successfully Created',
        status: 'Success',
        color,

    });
});



//@desc  GET all Colors
//@route  GET api/v1/colors
//@access Public


export const getAllColorsCtrl = asyncHandler(async (req, res) => {

    let colors = await Color.find();

    //send responce
    res.json({
        message: ' Color Successfully Fetched',
        status: 'Success',
        colors,

    });
});



//@desc  GET Single Color
//@route  GET api/v1/colors/:id
//@access Public


export const getSingleColorsCtrl = asyncHandler(async (req, res) => {

    let color = await Color.findById(req.params.id);

    if (!color) {
        throw new Error("Color not Found")
    }

    //send responce
    res.json({
        message: ' Color Successfully Fetched',
        status: 'Success',
        color,

    });
});



    //@desc  UPDATE single Color
//@route  PUT api/color/:id/update
//@access private / Admin

export const updateColorCtrl = asyncHandler( async ( req , res)=>{
    // distructure the properties of product that we want to update
    const {name} = req.body ;
   
   //update 
   
   const color = await Color.findByIdAndUpdate(req.params.id , {

     name,
     
   },{
     new : true
   })
   
     res.json({
       status : "Success",
       message : "Color Updated Successfully",
       color,
     });
   } );
   



   //@desc  Delete single Color
//@route  DELETE api/color/:id/delete
//@access private / Admin


export const deleteColorCtrl = asyncHandler( async (req , res) => {

    await Color.findByIdAndDelete(req.params.id)
 
   res.json({
     status : "Success",
     message : "The Color Deleted Successfully",
     
   })
 })