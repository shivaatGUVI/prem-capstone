const mongoose = require('mongoose')

const restaruntSchema = new mongoose.Schema({
    restarunt:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true 
    },
    bookingPrice:{
        type:String,
        default:'0.0'
    },
    address:{
        type:String, 
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    cuisine:{
        type:String,
        default:'indian' 
    },
    
    numOfReviews:{
                type:Number,
                default:0
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

let Schema = mongoose.model('restarunts',restaruntSchema)

module.exports = Schema