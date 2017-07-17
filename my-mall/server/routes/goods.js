var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//获取Goods模型
var Goods = require('../models/goods');

//链接数据库
mongoose.connect('mongodb://127.0.0.1:27017/mall',{useMongoClient:true});
//监听是否链接成功
mongoose.connection.on('connected', function (){
    console.log('MongoDB connected success.')
})
mongoose.connection.on('error', function (){
    console.log('MongoDB connected fail.')
})
mongoose.connection.on('disconnected', function (){
    console.log('MongoDB connected disconnected.')
})



/* GET users listing. */
router.get('/', function(req, res, next) {
    Goods.find({},function (err,doc){
        if(err){
            res.json({
                status:"500",
                msg:"错误"
            })
        }else{
            res.json({
                status:"200",
                result:{
                    data: doc
                },
                pagination: {
                    count: doc.length
                }                
            })
        }
    })
//   res.send('goods');
});

module.exports = router;
