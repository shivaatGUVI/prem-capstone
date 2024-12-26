const express = require('express')
const { createOrder, getOrder, updateOrder, deleteOrder, getSingleOrder, myOrder } = require('../controllers/orderCntrl')
const { isAuthentication } = require('../middleware/authentication')
const routers = express.Router()

routers.route('/order/').get(getOrder)
routers.route('/order/').post(isAuthentication, createOrder)
routers.route('/admin/order/:id').put(updateOrder)
routers.route('/admin/order/:id').delete(deleteOrder) 
routers.route('/order/:id').get(isAuthentication,getSingleOrder)
routers.route('/myOrder/').get(isAuthentication,myOrder); 

module.exports = routers;  