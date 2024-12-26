const Product = require('../models/productModel')
const APIFeature = require('../middleware/apiFeature')


exports.getProducts =async(req,res,next)=>{ 
  const products = await Product.find()
  
   res.status(200).json({   
    success:true, 
    products
   })
}

exports.seaGetProducts =async(req,res,next)=>{    
     

  const apiFeature = new APIFeature(Product.find(),  req.query).search().filter()

  const products = await apiFeature.query
  
   res.status(200).json({ 
    success:true,
    products
   })
}

exports.catGetProducts =async(req,res,next)=>{    
     

  const apiFeature = new APIFeature(Product.find(),  req.query).catSearch().filter()

  const products = await apiFeature.query
  
   res.status(200).json({ 
    success:true,
    products
   })
}

exports.resGetProducts =async(req,res,next)=>{    
     

  const apiFeature = new APIFeature(Product.find(),  req.query).resSearch().filter()

  const products = await apiFeature.query
  
   res.status(200).json({ 
    success:true,
    products
   })
}
exports .newProduct =async(req,res,next)=>{
  const{name,price,description,seller,categories,} =req.body
  let image;
  if(req.file){
     image = `${process.env.BACEND_URL}/upload/product/${req.file.originalname}`
  }
    const product = await Product.create({
      name,
      price,
      description,
      seller,
      categories,
      image
      
    });
    res.status(201).json({
      success:true,
      product
    })
}

exports.singleProduct=async (req,res,next) => {
  const product = await Product.findById(req.params.id);
  if(!product){
    return res.status(401).json({
      success:false,
      message:"product not found"
    });

  }
  res.status(201).json({
    success:true,
    product
  })
}

exports.updateProduct=async (req,res,next) => {
  let product =await Product.findById(req.params.id);

  if(!product){
    return res.status(404).json({
      success:false,
      message:"product not found"  
    })
  }
   product = await Product.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true
   })
   res.status(200).json({
    success:true,
    product
   })
}

exports.deleteProduct=async (req,res,next) => {
  const product = await Product.findByIdAndDelete(req.params.id)

  if(!product){
    res.status(401).json({
      success:false,
      message:"product not found"
    })
  }
  res.status(200).json({
    success:true,
    message:'product deleted'
  })
}


exports.createReview=async (req,res,next) => { 
  const{productId, rating, comment} = req.body

   const review ={
    user: req.user.id,
    rating,
    comment
   }

   const product = await Product.findById(productId) 
   
   const isReviewed = product?.reviews?.find(review=>{
    return review.user.toString() == req.user.id.toString()
   })

   if(isReviewed){
      product?.reviews.forEach(review=>{
        if(review.user.toString() == req.user.id.toString()){
          review.comment =comment,
          review.rating =rating
        }
      })
   }else{
      product?.reviews?.push(review) 
     
      //product.numOfReviews = product?.reviews?.length   
   }

      product.ratings = product?.reviews?.reduce((acc,review)=>{      
        return review?.rating + acc;
      },0)/product?.reviews.length  

      product.ratings = isNaN(product?.ratings)?0:product?.ratings; 

      await product.save({validateBeforeSave:false})  

      res.status(200).json({
        success:true,
        product
        
      })
  
}

exports.getReview=async (req,res,next) => {
    
  const product = await Product.findById(req.query.id)

  res.status(200).json({
    success:true,
    reviews:product.reviews
  })
  
}

exports.deleteReview=async (req,res,next) => {

  const product = await Product.findById(req.query._id);
  const reviews = product.reviews.filter(review=>{
      return review._id.toString() !== req.query.id
  })

   const numOfReviews = reviews.length
   const ratings = reviews.reduce((acc,review)=>{
    return review.rating + acc;
  },0)/reviews.length
  ratings = isNaN(ratings)?0:ratings
 await Product.findByIdAndUpdate(req.query.productId,{
  reviews,
  numOfReviews,
  ratings
 })

 res.status(200).json({
  success:true
 })
  
}