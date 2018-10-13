<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box" v-if="images.normal_size.length!=0">
                                <ProductZoomer :base-images="images" :base-zoomer-options="zoomerOptions" />
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model="buyCount" @change="numChange" :min="1" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="" class="buy">立即购买</button>
                                                <button @click="addCart" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>


                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a @click='isSlected=0' href="javascript:;" :class="{selected: isSlected==0}">商品介绍</a>
                                        </li>
                                        <li>
                                            <a @click='isSlected=1' href="javascript:;" :class="{selected: isSlected==1}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <div class="tab-content entry" v-show="isSlected==0" v-html="goodsinfo.content">
                                内容
                            </div>
                            <div class="tab-content" v-show="isSlected==1">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea v-model.trim="commentContant" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input @click="addComments" id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                                <!-- <Button @click="info">Display warning prompt</Button> -->
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>

                                    <ul id="commentList" class="list-box">
                                        <p v-show="comments.length==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-show="comments.length!=0" v-for="(item, index) in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_nmae}}</span>
                                                    <span>{{item.add_time|dealtime}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>

                                    </ul>
                                    <div v-show="comments.length!=0" class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <!-- 使用iView的分页插件 -->
                                        <Page :current='pageIndex' :total="totalcount" placement='top' :page-size=6 :page-size-opts='[6, 16, 26, 36]' show-elevator
                                            show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange" />

                                        <!-- <Page @on-change="pageChange" :total="totalcount" placement='top' :page-size-opts='[6,16,26,36]' :page-size=6 show-elevator show-sizer />  v-show="comments.length!=0"-->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item, index) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to='"/detail/"+item.id'>
                                                <img :src="item.img_url">
                                            </router-link>
                                            <!-- </a> -->
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to='"/detail/"+item.id'>{{item.title}}</router-link>
                                            <!-- <a href="#/site/goodsinfo/90" class=""></a> -->
                                            <span>{{item.add_time|dealtime}}</span>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
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
        name: 'detail',
        data: function () {
            return {
                goodID: '',
                goodsinfo: {},
                hotgoodslist: [],
                imglist: [],
                //购买数量
                buyCount: 1,
                isSlected: 0,
                // 页码
                pageIndex: 1,
                // 页容量
                pageSize: 6,
                // 总条数
                totalcount: 0,
                // 评论内容
                comments: [],
                //用户评论的内容
                commentContant: '',
                'images': {

                    'normal_size': [
                        {
                            'id': 1,
                            'url': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539362660308&di=71c44b7cc3c83ebcad70ad0ec35bc617&imgtype=0&src=http%3A%2F%2Fimg004.file.rongbiz.cn%2Fuploadfile%2F201702%2F19%2F10%2F10-20-19-31-508485.jpg'
                        },
                        {
                            'id': 2,
                            'url': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539362660306&di=09ed5d866c9e54088d3d09c47bead59f&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01277a5569daed00000043833214a2.jpg'
                        }
                    ],

                },
                'zoomerOptions': {
                    'zoomFactor': 4,
                    'pane': 'container-round',
                    'hoverDelay': 300,
                    'namespace': 'inline-zoomer',
                    'move_by_click': true,
                    'scroll_items': 5,
                    'choosed_thumb_border_color': "#bbdefb"
                }

            };
        },

        methods: {
            numChange() {

            },
            //发送请求商品列表的方法,获取商品消息的函数
            getData() {
                this.images.normal_size = [];
                this.$axios.get('site/goods/getgoodsinfo/' + this.goodID).then(res => {
                  
                   
                   
                    // console.log(res);
                    this.goodsinfo = res.data.message.goodsinfo;
                    this.hotgoodslist = res.data.message.hotgoodslist;
                    this.imglist = res.data.message.imglist;
                    
                     
                    // let tem_normal_size = [];
                    this.imglist.forEach(v => {
                        this.images.normal_size.push({
                            'id':v.id,
                            'url':v.thumb_path
                        })
                    });
                    // this.images.normal_size=tem_normal_size;
                })
            },
            //获取评论的方法
            getComments() {
                this.$axios.get(`site/comment/getbypage/goods/${this.goodID}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`).then(res => {
                    // console.log(res);
                    this.pageIndex = res.data.pageIndex;
                    this.pageSize = res.data.pageSize;
                    this.totalcount = res.data.totalcount;
                    this.comments = res.data.message;

                })
            },
            //分页页码改变的方法，参数是获取到的改变的页码数是什么
            pageChange(pageNum) {
                // console.log('改变了');
                // console.log(pageNum);
                this.pageIndex = pageNum;
                this.getComments();

            },



            //添加评论的方法
            addComments() {
                if (this.commentContant == '') {
                    this.$Message.info('请输入评论内容');
                } else {

                    this.$axios.post(`site/validate/comment/post/goods/${this.goodID}`, {
                        "commenttxt": this.commentContant
                    }).then(response => {
                        console.log(response);
                        this.pageIndex = 1;
                        this.getComments();
                        this.commentContant = '';
                    }).catch(error => {
                        console.log(error);
                    });
                }
            },
            //每页数量改变的方法
            pageSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.pageIndex = 1;
                this.getComments();

            },
            //加入购物车提交载荷的方法
            addCart() {
                this.$store.commit('addCart', {
                    id: this.goodID,
                    buyCount: this.buyCount

                })
            }


        },

        created() {
            this.goodID = this.$route.params.goodID;
            this.getData();
            //页面加载调用获取评论数据的函数
            this.getComments();
        },
        watch: {
            '$route'(to, from) {
                // 对路由变化作出响应...
                console.log(to);
                this.goodID = to.params.goodID;
                this.getData();
                this.buyCount = 1;

            }
        }
    }


</script>


<style>
    img {
        display: block;
    }

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

    .pic-box {
        width: 395px;
        height: 320px;
    }

    .inline-zoomer-hahaha-zoomer-box {
        width: 300px;

        height: 300px;
    }

    .preview-box img {
        height: 250px;
    }

    .control-box {
        height: 50px;
    }

    .control {
        margin: 0 auto;
    }

    .control-box>div {
        float: left;
        height: 50px;
    }

    .control-box .thumb-list img {
        width: 50px;
        height: 50px;
        float: left;
    }
</style>