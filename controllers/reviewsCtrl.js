import Review from "../model/Review.js";
import asyncHandler from 'express-async-handler';
import Product from "../model/Product.js";


//@desc  Create new Review
//@route  POST api/v1/reviews
//@access private / Admin

export const createReviewCtrl = asyncHandler(async (req, res) => {
 
const {product , message , rating} = req.body

// 1- find the product
const {productID} = req.params;
const productFound = await Product.findById(productID).populate('reviews');

if(!productFound){
    throw new Error("Product not Found")
}
    
// checked if user already reviewed this product

const hasReviewed = productFound.reviews.find((review) => {
    console.log(review)
    return review?.user?.toString() === req?.userAuthId.toString();

    
});
if(hasReviewed){
    throw new Error (" You have already reviewed the product")
}

// Create Review
const review = await Review.create({
    message,
    rating,
    product : productFound?._id,
    user : req.userAuthId
});

// push review into the productFound
productFound.reviews.push(review?._id);
//resave
await productFound.save();

res.status(201).json({
success : true , 
message : "Review created successfuly"
})
    });
