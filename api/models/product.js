const mongoose=require('mongoose');
const productSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    productImage:{
        type:String,
        required:true
    }
});
// create model
module.exports=mongoose.model('Product',productSchema)
//The first argument is the singular name of the collection your model is for