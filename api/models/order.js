const mongoose=require('mongoose');
const orderSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
        
    },
    quantity:{type:Number,default:1}
});
// create model
module.exports=mongoose.model('Order',orderSchema)
//Product is name of model