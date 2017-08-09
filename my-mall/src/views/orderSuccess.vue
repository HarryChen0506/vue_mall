<template>
  <div> 
    <nav-header></nav-header>
    <div class="nav-breadcrumb-wrap">
        <div class="container">
            <nav class="nav-breadcrumb">
            <a href="/">首页</a>
            <router-link to="/goods">商品</router-link >
            <span>订单详情</span>
            </nav>
        </div>
    </div>

    <div class="container">
        <div class="page-title-normal">
            <!--<h2 class="page-title-h2"><span>结算</span></h2>-->
        </div>
        <!-- 进度条 -->
        <div class="check-step">
            <ul>
                <li class="cur"><span>填写收货地址</span></li>
                <li class="cur"><span>下单</span></li>
                <li class="cur"><span>支付</span></li>
                <li class="cur"><span>订单详情</span></li>
            </ul>
        </div>

        <div class="order-create">
            <div class="order-create-pic"><img src="/static/ok-2.png" alt=""></div>
            <div class="order-create-main">
                <h3>恭喜您！ <br>您的订单正在处理中...</h3>
                <p>
                    <span>订单号：{{order.orderId}}</span>
                    <span>订单金额：{{order.orderTotal | currency('￥ ')}}</span>
                </p>
                <div class="order-create-btn-wrap">
                    <div class="btn-l-wrap">
                        <router-link class="btn btn--m" to="/cart">购物车</router-link>
                    </div>
                    <div class="btn-r-wrap">
                        <router-link class="btn btn--m" to="/goods">商品列表</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  
    <nav-footer></nav-footer>   
    <Modal-confirm ref="dialog"></Modal-confirm>
  </div>
</template>

<style>
 
</style>

<script>
import axios from 'axios';
import NavHeader from '../components/Header';
import NavFooter from '../components/Footer';
import ModalConfirm from '../components/modalConfirm';
export default {
    name: 'addressList',
    data () {
        return {
            // msg: 'Welcome to Your Vue.js App', 
            order:{
                orderId: '',
                orderTotal: 0
            }
        }
    },
    components:{
        NavHeader:NavHeader,
        NavFooter,
        ModalConfirm
    },
    mounted: function (){        
        this.init();
    },
    computed:{
        params: function(){
            return {                
            }            
        }
    },
    methods: {
        init:function (){
           this.getOrderInfo()
        },
        getOrderInfo: function (){
            //获取订单信息
            let orderId = this.$route.query.orderId;
            let params = {
                orderId: orderId
            }
            axios.get('/api/users/order/info',{
                params: params
            }).then((res) => {
                //    console.log(res)
                if(res.data.status == 200){
                    console.log(res)
                    this.order = res.data.result
                }else if(res.data.status == 1001){
                    alert('当前未登录');
                }
            })
        }
    }
}
</script>