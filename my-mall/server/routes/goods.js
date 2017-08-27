var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//获取Goods模型
var Goods = require('../models/goods');
var Users = require('../models/users');
var utiltool = require('../utiltool/tool.js');

//链接数据库
mongoose.connect('mongodb://user:!QAZ2wsx@127.0.0.1:27017/mall',{useMongoClient:true});
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



/* GET goods listing. */
router.get('/', function(req, res, next) {
    let query = req.query;
    let originUrl = req.originUrl;
    //页数
    let page = parseInt(query.page)||1;
    //数量
    let length =parseInt(query.length)||8;
    //offset
    let offset= (page-1)*length;
    //排序
    let sort = parseInt(query.sort)||1;
    let priceGt = parseFloat(query.priceGt);
    let priceLte = parseFloat(query.priceLte);

    let param = {};
    
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
// 加入购物车
router.post('/addCart',function(req, res, next){
    let userId = req.cookies.userId;
    let productId = req.body.productId;

    Users.findOne({userId:userId},function (err,userDoc){
        if(err){
            handler4err(err, res)           
        }else{
            if(userDoc){
                // goodItem 保存购物车信息： 如果没有就新增一条，有的话就在原来数量上加1
                let goodItem = '';
                userDoc.cartList.forEach(function (item, index){
                    if( item.productId == productId ){
                        goodItem = item;
                        item.productNum ++;
                    }
                })
                if(goodItem){
                    //直接修改数据
                    userDoc.save(function (err,doc){
                            if(err){
                                handler4err(err, res)                 
                            }else{
                                res.json({
                                    status: 200,
                                    msg: 'success' 
                                }) 
                            }    
                        })
                }else{
                    //新增数据
                     Goods.findOne({productId: productId}, function (err, goodDoc){
                        if(err){
                            handler4err(err, res)               
                        }else {
                            goodDoc.productNum = 1;
                            goodDoc.checked = "1";
                            userDoc.cartList.push(goodDoc);
                            userDoc.save(function (err,doc){
                                if(err){
                                    handler4err(err, res)                 
                                }else{
                                    res.json({
                                        status: 200,
                                        msg: 'success' 
                                    }) 
                                }    
                            })
                        }                   
                    })
                }
               
            }
          
        }
    })
   
})

//公用函数
function handler4err(err, res){
     res.json({
        status: 500,
        msg: err.message
    })
}


module.exports = router;
