const CldKitchen = require('../models/kitchenModel')

exports.createKitchen= async (req,res,next) => {

    const{name,price,description,kitchenName,categories} =req.body
    let image;
    if(req.file){
       image = `${process.env.BACEND_URL}/upload/kitchen/${req.file.originalname}`
    }
   const newKitchen  =await CldKitchen.create({
    name,
    price,
    description,
    kitchenName,     
    image,   
    categories

   })

   res.status(200).json({
    success:true,
    newKitchen
   })

}

exports.getKitchens =async(req,res,next)=>{ 
    const kitchens = await CldKitchen.find()
    
     res.status(200).json({   
      success:true, 
      kitchens
     })
  }
  
 
  
  
  exports.singleKitchen=async (req,res,next) => {
    const kitchen = await CldKitchen.findById(req.params.id);
    if(!kitchen){
      return res.status(401).json({
        success:false,
        message:"product not found"
      });
  
    }
    res.status(201).json({
      success:true,
      kitchen
    })
  }
  
  exports.updateKitchen=async (req,res,next) => {
    let kitchen =await CldKitchen.findById(req.params.id);
  
    if(!kitchen){
      return res.status(404).json({
        success:false,
        message:"product not found"  
      })
    }
     kitchen = await CldKitchen.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators:true
     })
     res.status(200).json({
      success:true,
      kitchen
     })
  }
  
  exports.deleteKitchen=async (req,res,next) => {
    const restarunt = await CldKitchen.findByIdAndDelete(req.params.id)
  
    if(!restarunt){
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
  
     const kitchen = await CldKitchen.findById(productId) 
     
     const isReviewed = kitchen?.reviews?.find(review=>{
      return review.user.toString() == req.user.id.toString()
     })
  
     if(isReviewed){
        kitchen?.reviews.forEach(review=>{
          if(review.user.toString() == req.user.id.toString()){
            review.comment =comment,
            review.rating =rating
          }
        })
     }else{
        kitchen?.reviews?.push(review) 
       
        kitchen.numOfReviews = kitchen?.reviews?.length   
     }
  
        kitchen.ratings = kitchen?.reviews?.reduce((acc,review)=>{      
          return review?.rating + acc;
        },0)/kitchen?.reviews.length  
  
        kitchen.ratings = isNaN(kitchen?.ratings)?0:kitchen?.ratings; 
  
        await kitchen.save({validateBeforeSave:false})  
  
        res.status(200).json({
          success:true,
          kitchen
          
        })
    
  }
  
  exports.getReview=async (req,res,next) => {
      
    const kitchen = await CldKitchen.findById(req.query.id)
  
    res.status(200).json({
      success:true,
      reviews:kitchen.reviews
    })
    
  }
  
  exports.deleteReview=async (req,res,next) => {
  
    const kitchen = await CldKitchen.findById(req.query._id);
    const reviews = kitchen.reviews.filter(review=>{
        return review._id.toString() !== req.query.id
    })
  
     const numOfReviews = reviews.length
     const ratings = reviews.reduce((acc,review)=>{
      return review.rating + acc;
    },0)/reviews.length
    ratings = isNaN(ratings)?0:ratings
   await kitchen.findByIdAndUpdate(req.query.kitchenId,{
    reviews,
    numOfReviews,
    ratings
   })
  
   res.status(200).json({
    success:true,
    message:'deleted...,'
   })
    
  }