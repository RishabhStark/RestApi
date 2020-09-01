const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Product=require('../models/product')
const multer=require('multer')
const checkAuth=require('../middleware/check-auth')
const ProductsController=require('../controllers/products')
const storage=multer.diskStorage({
    destination:function(req,file,cb){
    cb(null,'./uploads/');
    // error, path to store
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})
const fileFilter=(req,file,cb)=>{
    // reject a file
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png' ){
        cb(null,true);
    }
    else {
    cb(Error("failed"),false);
    }
}
const upload=multer({storage:storage,fileFilter:fileFilter,limits:{
    fileSize:1024*1024*5
}});
// multer will try to store incomming files in uploads folder

router.get('/',ProductsController.products_get_all);

router.post('/',checkAuth,upload.single('productImage'),ProductsController.products_create_product);

router.patch("/:productId", checkAuth, ProductsController.products_update_product);

router.get('/:productId',ProductsController.products_get_product);

router.delete('/:productId',ProductsController.products_delete);

module.exports=router;