const Restarunt = require('../models/restaruntModel')

exports.createRestarunt = async (req,res,next) => {
    const{restarunt,bookingPrice,cuisine,address,city,state,country,} =req.body

    let image;
    if(req.file){
       image = `${process.env.BACEND_URL}/upload/rest/${req.file.originalname}`
    }
    const newRestarunt =await Restarunt.create({
        restarunt,
        bookingPrice,
        cuisine, 
        address,
        image,
        city,
        state,
        country
    })

    res.status(201).json({
        success:true,
        newRestarunt
    })
  
}

exports.getRestarunt = async (req,res,next) => {
    

    const restarunts =await Restarunt.find()

    res.status(201).json({
        success:true,
        restarunts
    })
}

exports.getSingleRestarunt = async (req,res,next) => {

   const restarunt =await Restarunt.findById(req.params.id)
    
    if(!restarunt){
    res.status(400).json({
        success:false,
        message:'not found'
    })
   }
   

    res.status(201).json({
        success:true,
        restarunt
    })
}

exports.deleteRestarunt = async (req,res,next) => {
    
  const restarunt =await Restarunt.findByIdAndDelete(req.params.id)

  if(!restarunt){
    res.status(400).json({
        success:true,
        message:'not found'
    })
  }

  res.status(200).json({
    success:ture,
    message:'deleted...,'
  })
}

exports.deleteRestarunt = async (req,res,next) => {
    
    let restarunt =await Restarunt.findById(req.params.id)
  
    if(!restarunt){
      res.status(400).json({
          success:true,
          message:'not found'
      })
    }
  
    restarunt =await Restarunt.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
       })


    res.status(200).json({
      success:ture,
      restarunt
    })
  }

  exports.createReview=async (req,res,next) => { 
    const{restaruntID, rating, comment} = req.body
  
     const review ={
      user: req.user.id,
      rating,
      comment
     }
  
     const restarunt = await Restarunt.findById(restaruntID) 
     
     const isReviewed = restarunt?.reviews?.find(review=>{
      return review.user.toString() == req.user.id.toString()
     })
  
     if(isReviewed){
        restarunt?.reviews.forEach(review=>{
          if(review.user.toString() == req.user.id.toString()){
            review.comment =comment,
            review.rating =rating
          }
        })
     }else{
        restarunt?.reviews?.push(review) 
       
        restarunt.numOfReviews = restarunt?.reviews?.length   
     }
  
        restarunt.ratings = restarunt?.reviews?.reduce((acc,review)=>{      
          return review?.rating + acc;
        },0)/product?.reviews.length  
  
        restarunt.ratings = isNaN(restarunt?.ratings)?0:restarunt?.ratings; 
  
        await restarunt.save({validateBeforeSave:false})  
  
        res.status(200).json({
          success:true,
          restarunt
          
        })
    
  }
  
  exports.getReview=async (req,res,next) => {
      
    const restarunt = await Restarunt.findById(req.query.id)
  
    res.status(200).json({
      success:true,
      reviews:restarunt.reviews
    })
    
  }
  
  exports.deleteReview=async (req,res,next) => {
  
    const restarunt = await Restarunt.findById(req.query._id);
    const reviews = restarunt.reviews.filter(review=>{
        return review._id.toString() !== req.query.id
    })
  
     const numOfReviews = reviews.length
     const ratings = reviews.reduce((acc,review)=>{
      return review.rating + acc;
    },0)/reviews.length
    ratings = isNaN(ratings)?0:ratings
   await restarunt.findByIdAndUpdate(req.query.restaruntID,{
    reviews,
    numOfReviews,
    ratings
   })
  
   res.status(200).json({
    success:true,
    message:'deleted...,'
   })
    
  }