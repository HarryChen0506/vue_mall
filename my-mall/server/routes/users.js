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
                        data: userDoc.addressList
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



//公用函数
function handler4err(err, res){
     res.json({
        status: 500,
        msg: err.message
    })
}


module.exports = router;
