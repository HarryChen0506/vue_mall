var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//定义商品的图表模型
var productSchema = new Schema({
    "productId" : String,
    "productName" : String,
    "salePrice" : Number,
    "productImage" : String,
    "productUrl" : String
})

//导出模型，关联到Good里
//Good: 模型名 goods:数据库集合名
module.exports = mongoose.model('Good',productSchema,'goods');