var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//Users
var Users = require('../models/users');
var utiltool = require('../utiltool/tool.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 登录
router.post('/login', function (req, res, next){
    let user = {
      userName: req.body.userName,
      userPwd: req.body.userPwd
    }
    Users.findOne(user, function (err, userDoc){
        if(err){
            handler4err(err, res)
        }else{
            if(userDoc){
                res.cookie('userId',userDoc.userId,{
                    maxAge:1000*60*60,
                    httpOnly:true, 
                    path:'/', 
                    // secure:true //只有http才会从客户端传输到服务端
                });
                res.cookie('userName',userDoc.userName,{
                    maxAge:1000*60*60,
                    httpOnly:true, 
                    path:'/', 
                    // secure:true //只有http才会从客户端传输到服务端
                });
                res.json({
                    status: 200,
                    msg: '登录成功',
                    result: {
                        userName: userDoc.userName
                    }
                })
            }else{
                 res.json({
                    status: 510,
                    msg: '用户名或密码错误',
                    result: ''
                })
            }           
        }
    })
    
})
// 登出
router.post('/logout', function (req, res, next){
    
        res.cookie('userId','',{
            maxAge:-1,
            httpOnly:true, 
            path:'/', 
            // secure:true
        });        
        res.json({
            status: 200,
            msg: '登出成功',
            result: ''
        })       
})
//监测登录
router.get('/checkLogin', function (req, res, next){
    if(req.cookies.userId){
        res.json({
            status: 200,
            msg: '已经登录',
            result: {
                userId: req.cookies.userId,
                userName: req.cookies.userName
            }
        })
    }else{
         res.json({
            status: 1001,
            msg: '未登录',
            result: ''
        })
    }
})

//查询购物车
router.get('/cart', function (req, res, next){
     let query = req.query;
     let userId = req.cookies.userId;
     let user = {
         userId: userId
     }
     Users.findOne(user, function (err, userDoc){
         if(err){
              handler4err(err, res)
         }else{
             if(userDoc){
                  res.json({
                    status: 200,
                    msg: '查询购物车成功',
                    result: {
                        data: userDoc.cartList
                    }
                })
             }else{
                 res.json({
                    status: 510,
                    msg: '未查询到数据',
                    result: ''
                })
             }
         }
     })

})
//删除购物车
router.post('/cart/del', function (req, res, next){
    let query = req.query;
    let userId = req.cookies.userId;
    let productId = req.body.productId;
    let user = {
        userId: userId
    }
    Users.update(user,{$pull:{
        'cartList':{
            'productId':productId
        }
    }},function (err, userDoc){
        if(err){
            handler4err(err, res)
        }else{
            if(userDoc.nModified!==0){
                 res.json({
                    status: 200,
                    msg: '删除成功',
                    result:{
                        productId: productId
                    }
                })
            }else{
                res.json({
                    status: 210,
                    msg: '未找到数据,删除失败',
                    result:{
                        productId: productId
                    }
                })
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
