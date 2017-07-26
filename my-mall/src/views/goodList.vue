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
                        <dd><a href="javascript:void(0)">All</a></dd>
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
                        </dd>
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
            page: 1
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
        nextPage: function (){
            this.page++;
            var params = {page: this.page};
            this.getGoodsList(params);
        }
    }
}
</script>