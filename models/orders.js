const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    order_id:String,
    item_name:String,
    cost:Number,
    order_date:String,
    delivery_date:String
}, {
    timestamps: true
  });
  
  module.exports = mongoose.model('orders', orderSchema);