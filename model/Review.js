import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const ReviewSchema = new Schema(
    {
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : [true , " review should belong to a user"]
        },
        product : {
            type : mongoose.Schema.Types.ObjectId,
            reft : "Product",
            required : [true , "review should belong to a product"]
        },
        message : {
            type : String,
            required : [true , "please add a message"]
        },
        rating :  {
            type : Number,
            required : [true , "please add rating between 1 and 5"],
            min : 1 ,
            max : 5,
        }
    },
    {
        timestamps : true,
    }
);

const Review = mongoose.model("Review", ReviewSchema)

export default Review;