var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//获取Goods模型
var Goods = require('../models/goods');
var utiltool = require('../utiltool/tool.js');

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
    let query = req.query;
    let originUrl = req.originUrl;
    //页数
    let page = parseInt(req.param('page'))||1;
    //数量
    let length =parseInt(req.param('length'))||8;
    //offset
    let offset= (page-1)*length;
    //排序
    let sort = parseInt(req.param('sort'))||1;
    let priceGt = parseFloat(query.priceGt);
    let priceLte = parseFloat(query.priceLte);

    let param = {};

    console.log(priceGt,utiltool.isEmpty(priceGt));
    
    if(!utiltool.isEmpty(priceGt) || !utiltool.isEmpty(priceLte)){
        param.salePrice = {};
        if(!utiltool.isEmpty(priceGt)){
            param.salePrice.$gt = priceGt;
        }
        if(!utiltool.isEmpty(priceLte)){
            param.salePrice.$lte = priceLte
        } 
    }   
    
    //limit 限制条数
    //skip 跳过？条

    Goods.find(param,function (err,doc){
        if(err){
            res.json({
                status:"500",
                msg:"错误"
            })
        }else{
            var total = doc.length;
            getData(total);
        }
    })     

    function getData(total){
        let GoodsModel = Goods.find(param).limit(length).skip(offset);
        GoodsModel.sort({salePrice:sort});
        GoodsModel.exec(function (err,doc){
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
                        count: doc.length,
                        offset:offset,
                        total:total
                    }                
                })
            }
        })

    }
    
//   res.send('goods');
});

module.exports = router;
