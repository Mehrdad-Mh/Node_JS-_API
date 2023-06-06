import Order from "../model/Order.js";
import asyncHandler from "express-async-handler";
import User from "../model/User.js";
import Product from '../model/Product.js';


//@desc  Create New Order
//@route  POST api/v1/orders
//@access Private 

export const createOrderCtrl = asyncHandler(async(req , res) => {
// 1 -  get the payload(customer , orderItems , shipingAddress , totalPrice) : these are what we need to send for the request || means the things we need for creation order
const {orderItems , shippingAddress , totalPrice} = req.body;


// 2 -  find the user
const user = await User.findById(req.userAuthId);
// check if user has shipping address
if(!user.hasShippingAddress){
    throw new Error("please provide a shipping address")
}
// 3 - check if order is not empty

if(orderItems.length <= 0){
    throw new Error ('order items empty')
}
// 4 - place / Create order and save it to database

const order = await Order.create({
    user : user?._id,
    orderItems,
    shippingAddress,
    totalPrice,
});
console.log(order)

// push order into user 
user.orders.push(order._id)
await user.save()
// 5 - update product qty(decrease)/qty sold(increase)

const products = await Product.find({_id : {$in : orderItems}}) // finding all products by id and the value pass into ($in) || ($in ) => is a mongodb operator

orderItems.map(async (order) => {
    const product = products.find((product) => {
        return product._id.toString() === order._id.toString();
    });
    if(product){
        product.totalSold += order.qty;
    }
    await product.save()
})
// 6 - make payment (Stripe)
// 7 - impeament payment webhook
// 8 - update user order
res.json({
    success : true , 
    message : "order created",
    order,
    user,
})
})