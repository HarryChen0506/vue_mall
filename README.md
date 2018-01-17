## vue_mall
vue+node+express+mongoDB,粗浅地实现一个商城的登录，商品列表，购物车,下单结算，订单详情等模块，其中：
 1) 基于axios和promise进行了一次http服务的封装，便于管理请求api；
 2) 使用vuex对购物车数量进行了状态管理

## 项目演示
[live demo](http://106.15.198.124:8081)

## 前端build setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 后端build setup
``` bash
# cd
cd /vue_mall/my-mall/server/

# install dependencies
npm install

# serve at localhost:3000
node ./bin/www

```