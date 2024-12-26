const { json } = require("express");

class apiFeature{
    constructor(query,querystr){
        this.query=query,
        this.querystr=querystr
    }

    search( ){
        let keyword= this.querystr.keyword?{
            
            name:{
                $regex:this.querystr.keyword,
                $options:'i'
            },
           
            
        }:{}
        


        this.query.find({...keyword})
        

        return this
    }

    catSearch( ){
        let keys= this.querystr.keys?{ 
            
            categories:{
                $regex:this.querystr.keys,
                $options:'i'
            },
           
            
        }:{}
        


        this.query.find({...keys})
        

        return this
    }
   
   

    filter(){
        const queryCopy = {...this.querystr}

        const removeField =['keyword','limit','keys']

        removeField.forEach(i=> delete queryCopy[i])

       /* let queryt = JSON.stringify(queryCopy)

        queryt = queryt.replace(/\b(gt|gte|lt|lte)/g, match=>`$${match}`)
        this.query.find(JSON.parse(queryt))*/
        this.query.find(queryCopy) 
        console.log(queryCopy)

        return this
    }

    resSearch( ){
        let keys= this.querystr.keys?{ 
            
            seller:{
                $regex:this.querystr.keys,
                $options:'i'
            },
           
            
        }:{}
        


        this.query.find({...keys})
        

        return this
    }
   
   

    filter(){
        const queryCopy = {...this.querystr}

        const removeField =['keyword','limit','keys']

        removeField.forEach(i=> delete queryCopy[i])

       /* let queryt = JSON.stringify(queryCopy)

        queryt = queryt.replace(/\b(gt|gte|lt|lte)/g, match=>`$${match}`)
        this.query.find(JSON.parse(queryt))*/
        this.query.find(queryCopy) 
        console.log(queryCopy)

        return this
    }
   

   
    
}


module.exports = apiFeature;