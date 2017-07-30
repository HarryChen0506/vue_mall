// 工具类方法
var tool = {
    isEmpty: function (value){
        if(typeof value ==="string"){
            return value.trim() === ""|| value =='null' || value =='undefined';
        }
            return  value === null || value !== value||typeof(value)=='undefined';
    }
}

module.exports = tool;