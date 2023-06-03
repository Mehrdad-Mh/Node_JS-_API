import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BrandSchema = new Schema(
    {
        name : {
            type : String,
            required : true,
        },
        user : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            ref : 'User',
        },
        // image : {
        //     type : String,
        //     default : 'https://justhydroponics.com.au/wp-content/uploads/2022/06/woocommerce-placeholder-300x300-1.png',
        //     required : true,
        // },
        products : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Product',
            },
        ],
    },
    {
        timestamps : true,
    },
);

const Brand = mongoose.model('Brand' , BrandSchema);

export default Brand;