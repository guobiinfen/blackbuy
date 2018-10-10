import Vue from 'vue'
import App from './App.vue'

//导入index组建
import index from './components/index.vue'

//导入element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//路由相关
//1.导入路由模块
import VueRouter from 'vue-router';
//use一下
Vue.use(VueRouter);
//路由规则
const routes=[
  {
    path:'/',
   
    redirect:'/index'

  },
  {
    path:'/index',
    component:index

  }
]

//实例化路由对象
const router=new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
