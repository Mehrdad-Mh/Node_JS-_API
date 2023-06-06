import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Generate random numbers and char for orderNumber
const randomTxt = Math.random().toString(36).substring(7).toLocaleUpperCase(); // it give us some random text
const randomNumbers = Math.floor(1000 + Math.random() * 9000); // it give us random numbers and we want to combine numbers and chars for creating random order numbers

const orderSchema = new Schema ({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },

    orderItems : [ //represent the individuals items that user want to place
        {
            type : Object,
            required : true,
        }
    ],

    shippingAddress : {
        type : Object,
        required : true,
    },

    orderNumber : {
        type : String, 
        default : randomTxt + randomNumbers ,
    },

    // for Stripe payment
    paymentStatus : {
        type : String,
        default : "Not Paid",//it depends on stripe because after paying the default will be change and for that we use webhook
    },

    paymentMethod : {
        type : String,
        default : "Not specified"
    },

    totalPrice : {
        type : Number,
        default : 0.0,
    },

    currency : {
        type : String,
        default : "Not specified"
    },

    //for admin 
    status : {  
        type : String,
        default : "pending",
        enum : ["pending" , "proccessing" , "shipped" , "delivered"], //admin manage the order by using these specifies enums
        //when admin recive the payment success he can change the status of order from pending to for example proccessing
    },

    deliveredAt : {
        type : Date,
    },



},
{
    timestamps : true ,
}

);

// compile to form model

const Order = mongoose.model("Order" , orderSchema);

export default Order;
