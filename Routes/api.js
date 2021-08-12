const express = require('express');
const router = express.Router();

const{
    createorder,updateorder,listorders,searchorders,deleteorder
}= require('../controllers/order');

// create order
router.post('/orders/create', createorder)

// update delivery date
router.post('/orders/update', updateorder)

// list orders 
router.get('/orders/list', listorders)

// search orders using order_id
router.get('/orders/search', searchorders)

// /orders/delete
router.delete('/orders/delete', deleteorder)


module.exports = router;