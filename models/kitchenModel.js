const mongoose = require('mongoose')

const kitchenSchema = new mongoose.Schema({
     name:{
            type:String, 
            required:true
        },
        price:{
            type:String, 
            default: "0.0" 
        },
        description:{
            type:String,
            required:true
        },
        ratings:{
            type:Number,
            default:0
    
        },
        image:{
                    type:String,
                    
               },
        categories:{  
            type:String,
            required:true
          
        },
        kitchenName:{
            type:String,
            required:true
        },
        numOfReviews:{
            type:Number,
            default:0
        },
        quantity:{
            type:Number, 
            default:1
        },
        stock:{
            type:Number,
            default:1
        },
        reviews:[
            {
                user:mongoose.Schema.Types.ObjectId,
                rating:{
                    type:Number,
                     default:0
                },
                comment:{   
                    type:String,
                    required:true
                    
                }
            }
        ],
        user:{
            type:mongoose.Schema.Types.ObjectId
        },
        createdAt:{ 
            type:Date,
            default:Date.now()
        }
})

let Schema = mongoose.model('kitchens',kitchenSchema)

module.exports = Schema

//mongodb+srv://premjai411:86HkmKGsm7n90OF2@cloud-cluster.nkcoz.mongodb.net/?retryWrites=true&w=majority&appName=Cloud-Cluster