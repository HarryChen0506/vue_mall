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

//公用函数
function handler4err(err, res){
     res.json({
        status: 500,
        msg: err.message
    })
}


module.exports = router;
