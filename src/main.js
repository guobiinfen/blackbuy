import Vue from 'vue'
import App from './App.vue'

//导入index组建
import index from './components/index.vue'
//导入详情页组件te
import detail from './components/detail.vue'
//导入购物车组建
import shopcart from './components/shopcart.vue'
//导入下订单组建
import checkOrder from './components/checkOrder.vue'
//登录
import login from './components/login.vue'

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
axios.defaults.withCredentials=true;//让ajax携带cookie
Vue.prototype.$axios = axios;

//设置axios的基础地址
axios.defaults.baseURL = 'http://111.230.232.110:8899/';

//引入jquery
import $ from 'jquery';
Vue.prototype.$=$;


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
    shopCartData:JSON.parse(window.localStorage.getItem("cartData"))||{},
     //标记是否登录
     islogined:false
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
    },
    //更新修改购物车的方法
    //更新呢数据的格式{id：商品的id，newcount:购买的数量（覆盖原来的数量）}
    updataCart(state,opt){
      state.shopCartData[opt.id]=opt.newcount;

    },
    //删除仓库中对应id的而数据
    delvuex(state,id){
      // delete state.shopCartData[id];
      Vue.delete(state.shopCartData,id);
    },
    //修改登录状态额函数
    changeLoginState(state,newState){
      //直接赋值
      state.islogined=newState;
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
    //首页
    path: '/',

    redirect: '/index',
    meta:{
      zhName:"首页"
    }

  },
  {
    //首页
    path: '/index',
    component: index,
    meta:{
      zhName:"首页"
    }

  },
  {
    //详情页
    path: '/detail/:goodID',
    component: detail,
    meta:{
      zhName:"详情页"
    }

  },
  //购物车
  {
    path:'/shopcart',
    component:shopcart,
    meta:{
      zhName:"购物车"
    }
  },
  //订单页
  {
    path:'/checkOrder',
    component:checkOrder,
    meta:{
      zhName:"订单页"
    }
  },
  //登录
  {
    path:'/login',
    component:login,
    meta:{
      zhName:"登录"
    }
  }

]

//实例化路由对象
const router = new VueRouter({
  routes
})

//注册导航守卫就是钩子函数（回调函数）
router.beforeEach((to,from,next)=>{
  // console.log('跳转啦');
  // console.log(to);
  // console.log(from);
  document.title=to.meta.zhName;
  if(to.path=='/checkOrder'){
    axios.get("site/account/islogin").then(res=>{
      console.log(res);
      if(res.data.code=='nologin'){
        Vue.prototype.$Message.info('还没登陆，请先登录哦！');
        router.push('/login');
      }else{
       
        // router.push('/checkOrder');
        next();
      }
    })
  }else{
    next();
  }

  
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
  store,
  //页面一加载先去判断用户是否登录
  created(){
    axios.get('site/account/islogin').then(res=>{
      console.log(res);
      // console.log("heheh");
      if(res.data.code=='logined'){
        store.commit('changeLoginState',true);
      }else{
        store.commit('changeLoginState',false);
      }
    })
  }
}).$mount('#app')

// console.log(store.state.count) 


window.onbeforeunload=function(){
  localStorage.setItem('cartData',JSON.stringify(store.state.shopCartData))
}








