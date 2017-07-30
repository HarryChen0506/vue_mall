//用户的模型

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    "userId" : String,
    "userName" : String,
    "userPwd" : String,
    "orderList": Array,
    "cartList": [{
        "productImage" : String,
        "salePrice" : String,
        "productName" : String,
        "productId" : String,
        "productNum" : Number,
        "checked" : String
    }],
    "addressList": Array
})

//导出模型，User
//User: 模型名 users:数据库集合名
module.exports = mongoose.model('User',userSchema,'users');