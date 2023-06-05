//@desc  Create New Product
//@route  POST api/v1/products
//@access Private / Admin

import Brand from "../model/Brands.js";
import Category from "../model/Caregory.js";
import Product from "../model/Product.js";
import asyncHandler from "express-async-handler";

export const createProductCtrl = asyncHandler(async(req , res) => {
  const {
  
    name,
    description,
    brand,
    category,
    sizes,
    colors,
    price,
    totalQty,
 } = req.body ;// new we have the property of the products we want to create || //next step is send this controller to admin for check || if the logged in user is admin ////and we are going to create a middleware for that

//if Product exist
const productExists = await Product.findOne({name});
 
  if(productExists){
    throw new Error('Product Already Exists');
  }

  //find the brand

  const brandFound = await Brand.findOne({
    name : brand.toLowerCase(),
  });
  
  if(!brandFound){
    throw new Error ("Brand not found / please create or check brand name")
  }

 // find the category
  const categoryFound = await Category.findOne({
    name : category,
  });
  
  if(!categoryFound){
    throw new Error ("Category not found / please create or check cat name")
  };



  //find the brand






  //create product
  const product = await Product.create({
    name,
    description,
    brand,
    category,
    sizes,
    colors,
    user: req.userAuthId,
    price,
    totalQty,
  });

  //push the created products in to category ||when we fetch that category we can findout how many products are in that category

categoryFound.products.push(product._id);


//resave

await categoryFound.save();
  //send responce
  res.json({
    message : 'the Category Successfully Created',
    status : 'Success',
    product,

  });

//push the created brands in to category 

  brandFound.products.push(product._id)

//resave
  await brandFound.save();
  //send responce
  res.json({
    message : 'the Brand Successfully Created',
    status : 'Success',
    product,

  });

}
);



//@desc  GET all Products
//@route  GET api/v1/products
//@access Public

export const getProductsCtrl = asyncHandler(async(req , res) =>{


  // use mongoose method on the products || 
  //for methods any time we use mongodb method what comes back is what we call query
  // any time we bring the await infront of query means that we have endded proccess
  // means there is no where we can use other mongodb methods


  // console.log(productQuery);

  // const products = await Product.find(); //it returns the query with all objects that we dont need 

  //query
  let productQuery = Product.find();



  // search by name
  //query string : http://localhost:7000/api/v1/products?name=laptop ||
  // whats come after ? means that we are passing additional payload to the request

  if(req.query.name){  // user try to find a product by name
    productQuery = productQuery.find({
      name : { // we want to ignore the camlecasing and transformit as what is saved inside the db
        $regex : req.query.name , $options : 'i'
      },
    })
  }

  // filter by color

  if(req.query.colors){  // user try to find a product by name
    productQuery = productQuery.find({
      colors : { // we want to ignore the camlecasing and transformit as what is saved inside the db
        $regex : req.query.colors , $options : 'i'
      }, 
    })
  }

  // filter by brand
  if(req.query.brand){  // user try to find a product by name
    productQuery = productQuery.find({
      brand : { // we want to ignore the camlecasing and transformit as what is saved inside the db
        $regex : req.query.brand , $options : 'i'
      }, 
    })
  }

  //fiter by category

  if(req.query.category){  // user try to find a product by name
    productQuery = productQuery.find({
      category : { // we want to ignore the camlecasing and transformit as what is saved inside the db
        $regex : req.query.category , $options : 'i'
      }, 
    })
  }

  //filter by size 
  if(req.query.sizes){  // user try to find a product by name
    productQuery = productQuery.find({
      sizes : { // we want to ignore the camlecasing and transformit as what is saved inside the db
        $regex : req.query.sizes , $options : 'i'
      }, 
    })
  }

  //filter by price range

if(req.query.price){
  const priceRange = req.query.price.split("-");
  //mongodb method
  //gte : grater than or equel to
  // lte : less than or equel to
  productQuery = productQuery.find({
    price : {$gte : priceRange[0] , $lte : priceRange[1]}  // if the value is grater or equel to the first value [100-400] witch is the first index
  })
}


//pagination requirement : 
//page : a page is what is visible to the user ( we have one in post man) || we gonno pass it as a query
const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1 ;  

// limit : specified that howmany records are going to be retuen in the single page

const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10 ;
//startIndex : 
const startIndex = (page -1) * limit ; // we have the starting point to paginating to start
//endIndex : 
const endIndex = page * limit ; // we have the ending point to paginating to end

//total product : for this we using what is call countDocument 
const total = await Product.countDocuments(); // this give us the total document for this particular mode

// pagination result
const pagination = {};

if(endIndex < total){
  pagination.next = {
    page : page + 1,
    limit,// how many records
  }
}

if(startIndex > 0){ // means there is no next page but previus page
pagination.previus = {
  page : page -1,
  limit,
}
}

productQuery = productQuery.skip(startIndex).limit(limit) ; // it let ignore the ending and total for now

    // await the query

    let products = await productQuery.populate("reviews"); // it just return the product object that we need

  res.json({
    status : "Success",
    total,
    pagination,
    result : Product.length,
    products,
    message : "Product Fetched Successfully"
  });
});


//@desc  GET single Products
//@route  GET api/v1/products/:id
//@access Public

export const getProductCtrl = asyncHandler( async ( req , res)=>{
  const product = await Product.findById(req.params.id).populate("reviews");
  if(!product){
    throw new Error ("Product not found");
  }
  res.json({
    status : "Success",
    message : "Product Fetched Successfully",
    product,
  });
} );



//@desc  UPDATE single Products
//@route  POST api/v1/products/:id/update
//@access private / Admin

export const updateProductCtrl = asyncHandler( async ( req , res)=>{
 // distructure the properties of product that we want to update
 const {
  user,
   name,
   description,
   brand,
   category,
   sizes,
   colors,
   price,
   totalQty,
} = req.body ;

//update 

const product = await Product.findByIdAndUpdate(req.params.id , {
  user,
  name,
  description,
  brand,
  category,
  sizes,
  colors,
  price,
  totalQty,
},{
  new : true
})

  res.json({
    status : "Success",
    message : "Product Updated Successfully",
    product,
  });
} );


//@desc  Delete single Products
//@route  DELETE api/v1/products/:id/delete
//@access private / Admin





export const deleteProductCtrl = asyncHandler( async (req , res) => {

   await Product.findByIdAndDelete(req.params.id)

  res.json({
    status : "Success",
    message : "Product Deleted Successfully",
    
  })
})