const express=require('express');// tell express to funnel all requests through mogan middleware
const morgan=require('morgan');
const bodyParser=require('body-parser');
const productRoutes=require('./api/routes/product');
const orderRoutes=require('./api/routes/orders');
const userRoutes=require('./api/routes/user');
const mongoose=require('mongoose');
const app=express();
app.use('/uploads',express.static('uploads'));
// "use" sets middleware incomming req has to through use and its params
// app.use((req,res,next)=>{
    //     res.status(200).json({
        //         message:'It works'
        //     })
        // });
mongoose.connect('mongodb://localhost/node-shop', {useNewUrlParser: true,useUnifiedTopology: true});    
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Database connection established!");
  
});    
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
// extracts json data and makes it readable
app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With,Content-Type,Accept,Authorization');
    if(req.method==='OPTIONS') {
        
        console.log("options request");
        
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({})
    }
    next();
})
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);
app.use('/user',userRoutes);
// if we make past these above middleware none of routes in two files were able to handling the requests so errors can be handled by catching paast these middelwares
app.use((req,res,next)=>{
    const error=new Error('Not Found');
    error.status=404;
    next(error);
});

app.use((error,req,res,next)=>{
  res.status(error.status || 500);
  res.json({
      error:{
          message:error.stack

          }
      }
  )
});
module.exports=app;