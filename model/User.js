

import mongoose from "mongoose";

// schema is a blue print to creating document out of model
const Schema = mongoose.Schema

const UserSchema = new Schema({
    fullname : {
        type : "String",
        required : "true"

    },
    email : {
        type : "String",
        required : "true"

    },
    password : {
        type : "String",
        required : "true"

    },
    //save diffrent colection id 
   //|| we are going to embed entire orders inside this array
   // || we are going to save just object id insted of hole object
   orders : [
    {
       type : mongoose.Schema.Types.ObjectId,
       ref : "Order",
    },
   ], 

   whisList : [
    {
       type : mongoose.Schema.Types.ObjectId,
       ref : "WhisList",
    },
],

isAdmin : {
    type : "Boolean",
    default : false,
},

hasShippingAddress : {
    type : "Boolean",
    default : false,
},

shippingAddress : {
   
    firsyName : {
        type : String,
    },
    lastName : {
        type : String,
    },
    address : {
        type : String,
    },
    city : {
        type : String,
    },
    postalCode : {
        type : String,
    },
    province : {
        type : String,
    },
    country : {
        type : String,
    },
    phone : {
        type : String,
    },
},


},{ //pass some config for time stamp || it gives date and document will created or modified up to date

   timestamps : true,

});

// compile the schema to the model
const User = mongoose.model('User' , UserSchema) //the user property is avalable in mongodb dashboard 
// we export this modules to be able to create in controllers

export default User ;