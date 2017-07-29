<template>
  <div> 
        <nav-header></nav-header>
        <div class="nav-breadcrumb-wrap">
            <div class="container">
                <nav class="nav-breadcrumb">
                <a href="/">Home</a>
                <span>Goods</span>
                </nav>
            </div>
        </div>
        <div class="accessory-result-page accessory-page">
            <div class="container">
                <div class="filter-nav">
                    <span class="sortby">排序:</span>
                    <a href="javascript:void(0)" class="default cur">默认</a>
                    <a href="javascript:void(0)" class="price" @click="sortByPrice()">价格 <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
                    <a href="javascript:void(0)" class="filterby stopPop">过滤</a>
                </div>
                <div class="accessory-result">
                    <!-- filter -->
                    <div class="filter stopPop" id="filter">
                        <dl class="filter-price">
                        <dt>Price:</dt>
                            <dd  v-for="item in priceLevel" @click="filterByPrice(item,priceLevel)">
                                <a :class="{'checked': item.checked}" href="javascript:void(0)">
                                    <span v-if="item.level=='all'">所有</span>
                                    <span v-else>{{item.gt}}-{{item.lte}}</span>
                                </a>
                            </dd>
                            <!--<dd><a href="javascript:void(0)">All</a></dd>
                            <dd>
                                <a href="javascript:void(0)">0 - 100</a>
                            </dd>
                            <dd>
                                <a href="javascript:void(0)">100 - 500</a>
                            </dd>
                            <dd>
                                <a href="javascript:void(0)">500 - 1000</a>
                            </dd>
                            <dd>
                                <a href="javascript:void(0)">1000 - 2000</a>
                            </dd>-->
                        </dl>
                    </div>

                    <!-- search result accessories list -->
                    <div class="accessory-list-wrap">
                        <div class="accessory-list col-4">
                            <ul>
                                <li v-for = "good in goodLists"> 
                                    <div class="pic">
                                        <a href="javascript:;"><img :src="'/static/'+good.productImage" alt=""></a>
                                    </div>
                                    <div class="main">
                                        <div class="name">{{good.productName}}</div>
                                        <div class="price">{{good.salePrice}}</div>
                                        <div class="btn-area">
                                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                                        </div>
                                    </div>
                                </li>                                              
                            </ul>
                        </div>
                        <div>   
                            <button @click="nextPage()">下一页</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <nav-footer></nav-footer>
  </div>
</template>

<script>
import axios from 'axios';
import NavHeader from '../components/Header';
import NavFooter from '../components/Footer';
export default {
    name: 'goodList',
    data () {
        return {
            // msg: 'Welcome to Your Vue.js App',
            goodLists: [],
            sort: true,
            page: 1,
            priceLevel:[
                {level:'all',checked:true},
                {level:1,gt:0,lte:100,checked:false},
                {level:2,gt:100,lte:500,checked:false},
                {level:3,gt:500,lte:1000,checked:false},
                {level:4,gt:1000,lte:2000,checked:false}
            ],
            priceGt:'',
            priceLte:''
        }
    },
    components:{
        NavHeader:NavHeader,
        NavFooter
    },
    mounted: function (){
        this.getGoodsList();
    },
    methods: {
        getGoodsList: function (params){
            // console.log('goodsList');
            axios.get('/api/goods',{
               params:params
            }).then(
               res => {
                   console.log(res)
                   this.goodLists = this.goodLists.concat(res.data.result.data) ;
                }
            )
        },
        sortByPrice: function (){
            console.log('排序');
            this.sort = !this.sort;
            var sort = this.sort?1:-1;
            var params = { "sort": sort,"page":1 };
            this.goodLists = [];
            this.page = 1;
            this.getGoodsList(params);
        },
        filterByPrice: function (price,list){
            list.forEach(function (item,index){
                item.checked = false
            })
            price.checked = true;

                    
            if(price.level!=='all'){
               this.priceGt = price.gt;
               this.priceLte = price.lte;                           
            }else{
               this.priceGt = '';
               this.priceLte = '';
            }
            this.page = 1;
            var params = {
                page: this.page,
                priceGt:this.priceGt, 
                priceLte:this.priceLte
            }; 
            this.goodLists = [];
            this.getGoodsList(params);

        },
        nextPage: function (){
            this.page++;
            var params = {
                    page: this.page,
                    priceGt:this.priceGt, 
                    priceLte:this.priceLte
            };          
           
            this.getGoodsList(params);
        }
    }
}
</script>