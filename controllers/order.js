const jwt = require('jsonwebtoken');
require('dotenv').config();
const http = require('http');
const db = require('../models/index');
const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const bcrypt = require("bcrypt");
const apiResponse = require("../Utils/apiResponse");

exports.createorder = [
    body("order_id", "Order is must not be empty.").isLength({ min: 1 }).trim().custom((value) => {
        return db.orders.findOne({ order_id: value }).then((found) => {
            if (found) {
                return Promise.reject("Order id already in use");
            }
        });
    }),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            } else {
                let temp_data = {
                    order_id: req.body.order_id,
                    item_name: req.body.item_name,
                    cost: req.body.cost,
                    order_date: req.body.order_date,
                    delivery_date: req.body.delivery_date
                }
                let order = await db.orders.create(temp_data);
                if (order) {
                    return apiResponse.successResponseWithData(res, "order added Successfully.", order);
                } else {
                    return apiResponse.ErrorResponse(res, "No order added");
                }
            }
        } catch (error) {
            return apiResponse.ErrorResponse(res, error);
        }
    }]



exports.updateorder = [async(req,res)=>{
    try {
        let update_order = await db.orders.findOneAndUpdate({ order_id: req.body.order_id }, { $set:{delivery_date:req.body.delivery_date }});
        if (update_order) {
            return apiResponse.successResponse(res, "Updated Order");
        }else{
            return apiResponse.notFoundResponse(res, "No Order Id exists");
        }
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
}]

exports.listorders = [async(req,res)=>{
    try {
        let orders = await db.orders.find({ order_date: req.body.order_date });
        if (orders.length>0) {
            return apiResponse.successResponseWithData(res, "Orders Found", orders);
        }else{
            return apiResponse.notFoundResponse(res, "No Orders exist");
        }
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
}]

exports.searchorders = [async(req,res)=>{
    try {
        console.log("req.body.order_id ",req.body.order_id );
        let orders = await db.orders.find({ order_id: req.body.order_id });
        if (orders.length>0) {
            return apiResponse.successResponseWithData(res, "Orders Found", orders);
        }else{
            return apiResponse.notFoundResponse(res, "No Orders exist");
        }
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
}]

exports.deleteorder = [async(req,res)=>{
    try {
        let order = await db.orders.findOneAndDelete({ order_id: req.body.order_id });
        if (order) {

            return apiResponse.successResponse(res, "Orders Deleted Succefully");
        }else{
            return apiResponse.notFoundResponse(res, "No Orders exist");
        }
    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
}]