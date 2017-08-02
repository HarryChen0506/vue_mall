import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Goodlist from '@/views/goodList'
import Cartlist from '@/views/cartList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/goods',
      name: 'Goodlist',
      component: Goodlist
    },
    {
      path: '/cart',
      name: 'Cartlist',
      component: Cartlist
    }
  ]
})
