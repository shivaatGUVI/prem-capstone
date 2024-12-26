const express = require('express');
const { getProducts, newProduct, singleProduct, updateProduct, deleteProduct,
     createReview, getReview, deleteReview, seaGetProducts, catGetProducts,
     resGetProducts
     } = require('../controllers/productcntrl');
const routers = express.Router();
const {isAuthentication, authorizedRoles} = require('../middleware/authentication');
const multer = require('multer');
const path = require('path')
const upload = multer({storage:multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, path.join(__dirname,'..','upload/product'))
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

})



routers.route('/products').get(getProducts);
routers.route('/product/new').post(upload.single('image'),newProduct);  
routers.route('/product/:id').get(singleProduct);
routers.route('/update/:id').put(updateProduct);
routers.route('/product/:id').delete(deleteProduct) 
routers.route('/review/').put(createReview) 
routers.route('/review/').get(getReview)
routers.route('/review/').delete(deleteReview)  
routers.route('/search').get(seaGetProducts)
routers.route('/category').get(catGetProducts)
routers.route('/seller').get(resGetProducts)

module.exports = routers   

