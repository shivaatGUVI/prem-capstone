const express = require('express')
const { isAuthentication } = require('../middleware/authentication');
const { paymentProcess, sendStripe } = require('../controllers/paymentCntrl');
const routers = express.Router()


routers.route('/payment').post(paymentProcess)
routers.route('/stripe').get(sendStripe)

module.exports = routers;  