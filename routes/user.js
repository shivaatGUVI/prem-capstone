const express = require('express');
const multer = require('multer');
const path = require('path')
const upload = multer({storage:multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, path.join(__dirname,'..','upload/user'))
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

})

const { updateUser, deleteUser, getUser, registerUser, userLogin, 
    getAllUser, getAdmUser, updateAdmUser, logoutUser, 
    forgotPassword,
    resetPassword
      } = require('../controllers/userCntrl');
const { isAuthentication } = require('../middleware/authentication');

const routers = express.Router()

routers.route('/register/').post(upload.single('avatar'),registerUser) 
routers.route('/updateuser/').put(isAuthentication,updateUser)  
routers.route('/user/:id').delete(deleteUser)
routers.route('/myDp/').get(isAuthentication, getUser)   
routers.route('/login/').post(userLogin)
routers.route('/logout/').post(logoutUser) 
routers.route('/alluser/').get(getAllUser) 
routers.route('/admin/user/:id').get(getAdmUser)
routers.route('/update/:id').put(updateAdmUser)  
routers.route('/forgot').post(forgotPassword)
routers.route('/reset/:token').post(resetPassword)
 
module.exports = routers 