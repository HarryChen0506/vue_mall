var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//Users
var Users = require('../models/users');
var utiltool = require('../utiltool/tool.js');
var _ = require('lodash');
require('../utiltool/dateFormat');

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
//编辑购物车
router.post('/cart/edit', function (req, res, next){
    let query = req.query;
    let userId = req.cookies.userId;
    let productId = req.body.productId;
    let productNum = req.body.productNum;
    let checked = req.body.checked;
    Users.update({'userId': userId, 'cartList.productId':productId},{
        'cartList.$.checked': checked,
        'cartList.$.productNum': productNum
    }, function (err, userDoc){
        if(err){
            handler4err(err, res)
        }else{
        if(userDoc.nModified!==0){
                res.json({
                status: 200,
                msg: '修改成功',
                result:{
                    productId: productId
                }
            })
        }else{
            res.json({
                status: 210,
                msg: '未找到数据,修改失败',
                result:{
                    productId: productId
                }
            })
        }

        }
    })
})
//选择所有购物车
router.post('/cart/checkAll', function(req, res, next){
    let query = req.query;
    let userId = req.cookies.userId;
    let checkAll = req.body.checkAll;
    let user = {
         userId: userId
     }

    Users.findOne(user, function(err, userDoc){
        if(err){
            handler4err(err);
        }else{
            if(userDoc){
                userDoc.cartList.forEach(function (item){
                    item.checked = checkAll?'1':'0';
                })
                userDoc.save(function (err2, userDoc2){
                    if(err2){
                        handler4err(err2);
                    }else{
                        if(userDoc2){
                            res.json({
                                status: 200,
                                msg: '选择成功',
                                result:''
                            })
                        }else{
                            res.json({
                                status: 500,
                                msg: '选择失败',
                                result:''
                            })
                        }
                    }
                })
            }
        }
    })
})

//查询地址列表
router.get('/address', function(req, res, next){
    let query = req.query;
    let userId = req.cookies.userId;
    let user = {
        userId: userId
    }
    let UsersModel = Users.findOne(user);
    UsersModel.exec(function (err, userDoc){
        if(err){
            handler4err(err);
        }else{
            if(userDoc){
                res.json({
                    status: 200,
                    msg: '地址列表查询成功',
                    result:{
                        data: _.orderBy(userDoc.addressList, ['isDefault'],['desc'])
                    }
                })
            }else{
                res.json({
                    status: 500,
                    msg: '地址列表查询失败',
                    result:''
                })
            }
        }
    })

    // Users.findOne(user, function(err, userDoc){
    //     if(err){
    //         handler4err(err);
    //     }else{
    //         if(userDoc){
    //             res.json({
    //                 status: 200,
    //                 msg: '地址列表查询成功',
    //                 result:{
    //                     data: userDoc.addressList
    //                 }
    //             })
    //         }else{
    //             res.json({
    //                 status: 500,
    //                 msg: '地址列表查询失败',
    //                 result:''
    //             })
    //         }
    //     }
    // })
})
//设置默认地址
router.post('/address/setDefault', function (req, res, next){
    let query = req.query;
    let userId = req.cookies.userId;
    let addressId = req.body.addressId;
    let user = {
        userId: userId
    }
    if(!addressId){
        res.json({
            status: 500,
            msg: '请求参数错误',
            result:''
        })
        return ;
    }
    Users.findOne(user, function(err, userDoc){
        if(err){
            handler4err(err);
        }else{
            if(userDoc){
                userDoc.addressList.forEach(function(item){
                    if(item.addressId == addressId){
                        item.isDefault = true;
                    }else{
                        item.isDefault = false;
                    }
                })
                userDoc.save(function(err2, userDoc2){
                    if(err2){
                        handler4err(err2);
                    }else{
                        if(userDoc2){
                            res.json({
                                status: 200,
                                msg: '设置默认地址成功',
                                result:''
                            })
                        }else{
                            res.json({
                                status: 500,
                                msg: '设置默认地址失败',
                                result:''
                            })
                        }
                        
                    }
                })
            }
        }
    })

})
//删除地址
router.post('/address/del', function (req, res, next){
    let query = req.query;
    let userId = req.cookies.userId;
    let addressId = req.body.addressId;
    let user = {
        userId: userId
    }
    if(!addressId){
        res.json({
            status: 500,
            msg: '请求参数错误',
            result:''
        })
        return ;
    }
    Users.update(user,{
        $pull:{
            'addressList':{
                'addressId':addressId
            }
        }
    },function (err, userDoc){
        if(err){
            handler4err(err, res)
        }else{
            if(userDoc.nModified!==0){
                 res.json({
                    status: 200,
                    msg: '删除成功',
                    result:{
                        addressId: addressId
                    }
                })
            }else{
                res.json({
                    status: 210,
                    msg: '未找到数据,删除失败',
                    result:{
                        addressId: addressId
                    }
                })
            }           
        }
    })

})
//创建订单
router.post('/order/add',function(req, res, next){
    let query = req.query;
    let userId = req.cookies.userId;
    let addressId = req.body.addressId;
    let orderTotal = req.body.orderTotal;

    Users.findOne({userId:userId},function (err, userDoc){
        if(err){
            handler4err(err, res);
            return;           
        }
        if(userDoc){
            
            let address = {};
            userDoc.addressList.forEach(function(item){
                if(addressId == item.addressId){
                    address = item
                }
            })
            let goodsList = userDoc.cartList.filter(function(item){
                return item.checked == '1'
            })
            let platform = '622';
            let r1 = Math.floor(Math.random()*10);
            let r2 = Math.floor(Math.random()*10);
            let sysDate = new Date().Format('yyyyMMddhhmmss');
            let createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');           

            let order = {
                address: address,
                orderTotal: orderTotal,
                goodsList: goodsList,
                orderStatus: '1',
                orderId: platform + r1 + sysDate + r2 ,
                createDate : createDate
            };

            userDoc.orderList.push(order);
            userDoc.save(function (err2, userDoc2){
                if(err){
                    handler4err(err, res);
                    return;                 
                }
                if(userDoc2){
                     res.json({
                        status: 200,
                        msg: '添加订单成功',
                        result:{
                            address: order.address,
                            orderTotal:  order.orderTotal,
                            orderId: order.orderId
                        }
                    })
                }else{
                    res.json({
                        status: 210,
                        msg: '添加订单失败',
                        result:''
                    })
                }
               
            })

        }


    })

    
})
//查询订单
router.get('/order/info', function (req, res, next){
    let query = req.query;
    let userId = req.cookies.userId;
    let orderId = query.orderId;

    Users.findOne({userId:userId},function (err, userDoc){
        if(err){
            handler4err(err, res);
            return;           
        }
        if(userDoc){
            let order = '';
            userDoc.orderList.forEach(function (item){
                if(item.orderId == orderId){
                    order = item
                }
            })
            if( userDoc.orderList && userDoc.orderList.length == 0){
                 res.json({
                    status: 520,
                    msg: '该用户尚未创建订单',
                    result: order
                })
            }

            if(order){
                res.json({
                    status: 200,
                    msg: '查询订单成功',
                    result: order
                })
            }else{
                res.json({
                    status: 510,
                    msg: '查询无该订单',
                    result: ''
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
