// 封装http服务

import axios from 'axios'

const mergerUrlParams = function(url,params){
    let queryString = '';
    if(!!params){
        for(var prop in params){
            if(!!params[prop] || params[prop]===0 || params[prop]===false){
                if(Array.isArray(params[prop])){
                    for(var i=0;i<params[prop].length;i++){
                        queryString += ("&"+prop+"="+params[prop][i]);
                    }
                }else{
                    queryString += ("&"+prop+"="+params[prop]);
                }
            }
        }
    }
    if(url.indexOf('?')>-1){
        url += queryString
    }else{
        if(queryString){
            url = url +'?'+ queryString.slice(1);
        }        
    }
    return url;
}

const httpGet = function (url){
    let promise = new Promise(function(resolve,reject){
        axios.get(url).then(function(res){
            resolve(res)
        },function(err){
            reject(err)
        })
    });    
    return promise;
}
const httpPost = function (url,data){
    let promise = new Promise(function(resolve,reject){
        axios.post(url,data).then(function(res){
            resolve(res)
        },function(err){
            reject(err)
        })
    });    
    return promise;
}
// 封装的url
let getGoodsListUrl = function (params){
    let url =  '/api/goods';
    return mergerUrlParams(url,params)
}
let postAddCartUrl = function (data){
    let url =  '/api/goods/addCart';
    return url;
}



// 封装的请求
let getGoodsList = function (params){
    return httpGet(getGoodsListUrl(params))
}
let postAddCart = function (data){
    return httpPost(postAddCartUrl(),data)
}

// 导出
export default {
    getGoodsList: getGoodsList,    //获取商品列表
    postAddCart: postAddCart              //添加购物车
}