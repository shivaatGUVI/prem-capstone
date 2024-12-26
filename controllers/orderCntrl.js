const { json } = require('express')
const Order = require('../models/orderModel')
const Product =require('../models/productModel')

exports.createOrder=async(req,res,next)=>{
    const{ orderItem,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo

    } = req.body
  const order = await  Order.create({
    orderItem,
    shippingInfo,
    itemsPrice,
    taxPrice,   
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt:Date.now(),
    user:req.user.id
  })

  res.status(200).json({
    success:true,
    order
  })
}

exports.getOrder=async(req,res,next)=>{
    const orders = await Order.find()

    let totalAmount=0;

    orders.forEach(order=>{
       totalAmount += order.taxPrice
    })

    res.status(201).json({
        success:true,
        totalAmount,
        orders
    })
}

exports.getSingleOrder=async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate('user','name email')
    if(!order){
        res.status(400).json({
            success:false,
            message:`${req.params.id}:Order ID not found`
        })
    }
 
    res.status(200).json({
        success:true,
        order
    })
}

exports.updateOrder=async(req,res,next)=>{
    const order = await Order.findById(req.params.id)
    if(order.orderStatus == 'Delivered'){
        res.status(200).json({
            success:true,
            message:'Order Already delivered'
    })
}
     order.orderItem.forEach(async orderItem=>{
     await stock(orderItem.product,orderItem.quantity)
     })
     async function stock(productID, quantity) {
        const product = await Product.findById(productID);
        product.quantity
        product.save({validateBeforeSave:false})
     }

     order.orderStatus = req.body.orderStatus
     order.deliveredAt = Date.now() 
     
    res.status(200).json({
        success:true,
        order
    })
}

exports.deleteOrder=async(req,res,next)=>{
    const order = await Order.findByIdAndDelete(req.params.id)
    if(!order){
        res.status(400).json({
            success:true,
            message:'Order not found'
        })
    }
    res.status(200).json({
        success:true,
        message:'Delete Success' 
    })
}

exports.myOrder=async (req,res,next) => {
    const orders = await Order.find({user:req.user.id})

    res.status(200).json({
        success:true,
        orders
    })
}