import Vue from 'vue'
import App from './App.vue'

//导入index组建
import index from './components/index.vue'
//导入详情页组件
import detail from './components/detail.vue'

//导入element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//导入vue懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {

  // error: 'dist/error.png',加载失败的图片
  loading: require('./assets/statics/site/img/timg.gif'),
  // attempt: 1
})

//导入axios 成为全局变量
import axios from 'axios';
Vue.prototype.$axios = axios;

//设置axios的基础地址
axios.defaults.baseURL = 'http://111.230.232.110:8899/';

//导入moment。js
import moment from 'moment';

//导入iview ui
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

//导入Vuex
import Vuex from 'vuex'
Vue.use(Vuex)
//创建一个 store。
const store = new Vuex.Store({
  state: {
    //购物车数量，默认是一个空对象，对像的格式
    shopCartData:JSON.parse(window.localStorage.getItem("cartData"))||{}  
  },
  mutations: {
    //约定 opt的格式{id:'',buyCount:''};
    //第二个参数是一个对象
    addCart(state,opt){
      //说明有这个商品
      if(state.shopCartData[opt.id]){
        state.shopCartData[opt.id]+=opt.buyCount;
      }else{
        //设置新对象的时候Vue.set(obj, 'newProp', 123)
        // state.shopCartData[opt.id]=opt.buyCount;
        Vue.set(state.shopCartData, opt.id, opt.buyCount)
      }
    }   
  },
  getters:{
    cartTotalCount(state){
      let totalCount=0;
      for (const key in state.shopCartData) {
        totalCount+=state.shopCartData[key];      
      }
      return totalCount;

    }
  }
})

//导入放大镜组建
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)



//路由相关
//1.导入路由模块
import VueRouter from 'vue-router';
//use一下
Vue.use(VueRouter);
//路由规则
const routes = [
  {
    path: '/',

    redirect: '/index'

  },
  {
    path: '/index',
    component: index

  },
  {
    path: '/detail/:goodID',
    component: detail

  }
]

//实例化路由对象
const router = new VueRouter({
  routes
})

//创建全局的的过滤器

Vue.filter('dealtime', function (value) {
  return moment(value).format('YYYY年MM月DD日');
})
// filters: {//局部的定义方式
//   dealtime(value) {
//       return moment(value).format('YYYY年MM月DD日');
//   }
// },

new Vue({
  render: h => h(App),
  router,
  //数据仓库挂在到vue实例

  store
}).$mount('#app')

// console.log(store.state.count) 


window.onbeforeunload=function(){
  localStorage.setItem('cartData',JSON.stringify(store.state.shopCartData))
}



export default {
  name: 'app',
  data () {
    return {
     
    }
  }
}