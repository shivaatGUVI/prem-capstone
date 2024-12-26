const express = require('express')
const { getRestarunt, getSingleRestarunt, createRestarunt } = require('../controllers/restaruntCntrl')
const multer = require('multer');
const path = require('path')
const upload = multer({storage:multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, path.join(__dirname,'..','upload/rest'))
    },
    filename:function(req,file,cb){ 
        cb(null,file.originalname)
    }
})

})

const router = express.Router()

router.route('/rest').get(getRestarunt)
router.route('/rest/:id').get(getSingleRestarunt)
router.route('/rest').post(upload.single('image'),createRestarunt)

module.exports = router