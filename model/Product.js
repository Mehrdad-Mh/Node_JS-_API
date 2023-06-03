// Product schema
import mongoose from "mongoose";

const Schema = mongoose.Schema

const ProductSchema = new Schema (
    {
        name : {
            type : String,
            required : true,
        },
        description : {
            type: String,
            required : true ,
        },
        brand : {
            type : String,
            required : true ,
        },
        category : {
            type : String,
            ref : 'Category',
            required : true,
        },
        sizes : {
            type: [String],
            enum : ['S' , 'M' , 'L', 'XL','xxl'],
            required : true,
        },
        colors : {
            type : [String],
            required : true ,
        },

       user : {         //specifing the creater of the product / here is gonno be the admin and we refrence it to the modal
      
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref : "User",
   
  },
      images : [{
    type : String,
    default : 'https://via.placeholder.com/150',
}],

reviews : [ // providing the reviews about the products || and we gonno create the modal 'Reviews' 
//this is what we call refrrences using id to keep reviews in the reviews array
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Reviews',
    },  
],

price : {
    type : Number,
    required : true,
},

totalQty : {
    type : Number,
    required : true,
},

totalSold : {
    type : Number,
    required : true,
    default : 0,
},

    
    },
    {
        timestamps : true, // give auto generated date to the product that when they made
        toJSON : {virtuals : true },
    },
);




const Product = mongoose.model('Product' , ProductSchema);//compiled to form the model

export default Product;