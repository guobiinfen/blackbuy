<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="(item, index) in catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="(key, index) in item.subcates" :key="key.id">
                                                {{key.title}}&nbsp;
                                            </span>

                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="(key, index) in item.subcates" :key="key.id" href="/goods/43.html">{{key.title}}</a>

                                            </dd>
                                        </dl>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <!--幻灯片 轮播图-->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                                <el-carousel height="341px">
                                    <el-carousel-item v-for="item in sliderlist" :key="item.id">
                                        <a href="#">
                                            <img style="display: block;width: 100%;height: 100%;" :src="item.img_url" alt="">
                                        </a>
                                    </el-carousel-item>
                                </el-carousel>
                            </div>

                        </div>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item, index) in toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time|dealtime}}</span>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- 商品列表区域 -->
        <div class="section" v-for="(item, index) in detaillist" :key="item.catetitle">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a href="/goods/43.html" v-for="value in item.level2catelist">{{value.subcatetitle}}</a>
                   
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="(key, index) in item.datas" :key="key.artID">
                            <!-- <a href="#/site/goodsinfo/87" class=""> -->
                                <router-link :to="'/detail/'+key.artID">
                                <div class="img-box">
                                    <img v-lazy="key.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{key.artTitle}}}</h3>
                                    <p class="price">
                                        <b>{{key.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{key.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{key.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                            <!-- </a> -->
                        </li>
                       
                    </ul>
                </div>
            </div>
        </div>
          <!-- 返回顶部的 -->
          <BackTop :height="20" :bottom="80">
            <div class="top">❤</div>
        </BackTop>
    </div>
</template>

<script>
   
  
   
    export default {
        name: 'index',
        data: function () {
            return {
                catelist: [],
                sliderlist: [],
                toplist: [],
                detaillist: []
            }
        },
       
        created() {
            this.$axios.get('site/goods/gettopdata/goods').then(Response => {
                // console.log(Response);
                this.sliderlist = Response.data.message.sliderlist;
                this.toplist = Response.data.message.toplist;
                this.catelist = Response.data.message.catelist;
            }),
            this.$axios.get('site/goods/getgoodsgroup').then(Response => {
            
                
                this.detaillist=Response.data.message;
                
            })


        }
       



    }
</script>

<style>
      .top {
        padding: 10px;

        color: red;
        font-size: 50px;
        text-align: center;
        border-radius: 2px;
        transform: rotate(180deg);

        /* background: rgba(0, 153, 229, 1); */
        /* width: 100px;
        height: 100px; */
        /* background: url('../assets/statics/site/img/backtop.jpg') no-repeat center/100px; */
    }
</style>