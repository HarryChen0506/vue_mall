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
                <span class="sortby">Sort by:</span>
                <a href="javascript:void(0)" class="default cur">Default</a>
                <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
                <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
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
                        <li>
                        <div class="pic">
                            <a href="#"><img src="static/1.jpg" alt=""></a>
                        </div>
                        <div class="main">
                            <div class="name">XX</div>
                            <div class="price">999</div>
                            <div class="btn-area">
                            <a href="javascript:;" class="btn btn--m">加入购物车</a>
                            </div>
                        </div>
                        </li>
                        <li>
                        <div class="pic">
                            <a href="#"><img src="static/2.jpg" alt=""></a>
                        </div>
                        <div class="main">
                            <div class="name">XX</div>
                            <div class="price">1000</div>
                            <div class="btn-area">
                            <a href="javascript:;" class="btn btn--m">加入购物车</a>
                            </div>
                        </div>
                        </li>
                        <li>
                        <div class="pic">
                            <a href="#"><img src="static/3.jpg" alt=""></a>
                        </div>
                        <div class="main">
                            <div class="name">XX</div>
                            <div class="price">500</div>
                            <div class="btn-area">
                            <a href="javascript:;" class="btn btn--m">加入购物车</a>
                            </div>
                        </div>
                        </li>
                        <li>
                        <div class="pic">
                            <a href="#"><img src="static/4.jpg" alt=""></a>
                        </div>
                        <div class="main">
                            <div class="name">XX</div>
                            <div class="price">2499</div>
                            <div class="btn-area">
                            <a href="javascript:;" class="btn btn--m">加入购物车</a>
                            </div>
                        </div>
                        </li>
                    </ul>
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
        msg: 'Welcome to Your Vue.js App'
        }
    },
    components:{
        NavHeader:NavHeader,
        NavFooter
    },
    mounted: function (){
        this.goodsList();
    },
    methods: {
        goodsList: function (){
            console.log('goodsList');
            axios.get('/mock/goods',{

            }).then(function (res){
                console.log(res)
            })
        }
    }
}
</script>