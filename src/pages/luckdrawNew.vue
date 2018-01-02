<template>
    <section class="wrap respon2">
        <Public_Head person-title="抽奖"></Public_Head>
        <div class="respon2-itm">
            <div class="full-scroll">
                <!-- 滚动的数据 -->
                <section class="luckdraw fl">
                    <banner-scroll v-show="bannerScrollData">
                        <div class="text-scroller">
                            <ul class="scroller-in">
                                <li v-for="ban in bannerScrollData" v-html="ban"></li>
                            </ul>
                        </div>
                    </banner-scroll>
                </section>
                <!-- 奖品介绍和抽奖说明结束 -->
                <template v-if="luckMessData">
                    <div class="drawBg">
                        <img :src="luckMessData.img_url" >
                        <h1>{{luckMessData.goodsname}} </h1>
                        <p>{{luckMessData.goodsdesc}}</p>
                        <div><span>{{luckMessData.consumgolds | golds }}猜球币</span></div>
                    </div>
                    <div class="draw_container" v-if="luckMessData">
                        <h2>奖品说明</h2>
                        <p>1. {{ luckMessData.goodsdesc }}</p>
                        <p>2. 抽奖100%可中实物商品或等额猜球币。</p>
                        <h2>抽奖说明</h2>
                        <div v-if="Number(luckMessData.goodsid)<=20000 && luckMessData.goodstype==='2'">
                            <p>1. 抽奖扣除等额猜球币。</p>
                            <p>2. 中奖后可在中奖页填写收件信息,奖品将由疯狂猜球官方在3-7个工作日内安排派奖。</p>
                        </div>
                        <div v-if="Number(luckMessData.goodsid)<=20000 && luckMessData.goodstype!=='2'">
                            <p>1. 抽奖扣除等额猜球币。</p>
                            <p>2. 中奖后奖品以卡号卡密形式发放。</p>
                        </div>
                    </div>
                </template>

                <!-- full-scroll 新增 -->
                <!--on  切换出 兑换劵 -->
                <div class="lottery-dhj":class="{ 'on': dhjMsg.lotteryDhj } ">
                    <div class="lotteryDhj-t">
                        获取兑换券
                    </div>
                    <div class="lotteryDhj-c">
                        <ul class="hign-btn">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <template v-if="dhjObj.positionName !== 'default'">
                                <div :class="dhjObj.positionName"></div>
                            </template>
                        </ul>
                        <ul class="lottery-bg">
                            <li>
                                <p>兑奖券<i class="yellow">x2</i></p>
                            </li>
                            <li>
                                <p>兑奖券<i class="yellow">x1</i></p>
                            </li>
                            <li>
                                <p>兑奖券<i class="yellow">x1</i></p>
                            </li>
                            <li>
                                <p>兑奖券<i class="yellow">x1</i></p>
                            </li>
                            <li>
                                <p>55,000</p>
                            </li>
                            <li>
                                <p>兑奖券<i class="yellow">x1</i></p>
                            </li>
                            <li>
                                <p>兑奖券<i class="yellow">x1</i></p>
                            </li>
                            <li>
                                <p>兑奖券<i class="yellow">x2</i></p>
                            </li>
                        </ul>
                        <!--on  开始动画的时候加on  -->
                        <a href="javascript:;" :class="{'on':!dhjObj.dhjBtn }"  v-tap="{methods: startLuckgo }" class="btn-beginLottery">
                            开始抽奖
                        </a>
                    </div>
                    <a href="javascript:;" class="toDhc" v-tap="{methods: backToDraw }">返回兑换场</a>
                </div>

                <!-- 礼包弹窗  -->
                <div class="pop pop_prizes" :class="{'hide':!alertGoodsBox}">
                    <div class="pop_layer"></div>
                    <div class="popIn" v-if="alertGoodsData">
                        <div class="popTit">
                            <h2 class="titlle">奖品信息</h2>
                            <span class="close" v-tap="{methods: closeAlert}"></span>
                        </div>
                        <div class="pop_cont">
                            <p>{{alertGoodsData.goodName}}</p>
                            <img :src="alertGoodsData.goodImgUrl">
                            <p><i class="icon-jinbi"></i>{{alertGoodsData.goodGolds | golds }}</p>
                            <div class="info">
                                <span>奖品说明：</span>
                                <p v-if="alertGoodsData.goodsdesc">{{alertGoodsData.goodsdesc}}</p>
                                <p style="color: #e7e7e7;">抽奖100%可中实物商品或等额猜球币。</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!--奖品兑换-->
                <div class="pop pop-gift" :class="{ 'hide' : !dhjMsg.showMsg,'lack': userinfoMess.exchangetkt_total>dhjMsg.needtickets}">
                    <div class="pop_layer"></div>
                    <div class="pop-m">
                        <span class="close" v-tap="{methods: closedhjMsg }"></span>
                        <div class="pop-t">奖品兑换</div>
                        <img class="prize-img" :src="dhjMsg.imgurl" alt="">
                        <p class="prize-name">
                            {{ dhjMsg.name }}
                        </p>
                        <p class="prize-des">
                            {{ dhjMsg.goodsdesc }}
                        </p>
                        <div class="prize-tips">
                            <p class="prize-tips01">需要：</p>
                            <!--当可以兑换的时候加这个行内样式否则删除，-->
                            <p class="prize-tips02">{{ dhjMsg.needtickets }}张</p>
                            <p class="prize-tips03" v-if="userinfoMess">（您有{{ userinfoMess.exchangetkt_total }}张）</p>
                        </div>
                        <div class="prize-lack" v-if="parseInt( userinfoMess.exchangetkt_total) < parseInt( dhjMsg.needtickets ) ">哎呀，兑换券不够，先点击获取吧！</div>

                        <div class="prize-btn">
                            <div v-if="parseInt( userinfoMess.exchangetkt_total) < parseInt( dhjMsg.needtickets ) ">
                                <a href="javascript:;" class="btn-cancel" v-tap="{methods: closedhjMsg }">取消</a>
                                <a href="javascript:;" class="btn-get" v-tap="{methods: jumpTodhj }">获取</a>
                            </div>
                            <!-- 当可以兑换的时候用下面   是否需要带类型数据？？？  -->
                            <a v-else href="javascript:;" class="btn-exchange"

                               v-tap="{methods: goLuckGiftCopy, item:'' }"
                            >立即兑换</a>
                        </div>
                    </div>
                </div>

                <!--兑换成功 弹窗-->
                <div class="pop pop-giftSu" :class="{'hide': !showPopGiftSu}">
                    <div class="pop_layer"></div>
                    <div class="pop-m" v-if="dhjObj && dhjObj.goodBingoNew">
                        <span class="close" v-tap="{methods: closePopGiftSu }"></span>
                        <div class="pop-t">兑换结果</div>
                        <div class="chang-su">
                            兑换成功！
                        </div>
                        <a href="javascript:;" v-if="dhjObj.goodBingoNew.goodstype !== '2' "
                           v-tap="{methods: showResultFn }"
                        >查看卡号卡密</a>
                        <a href="javascript:;" v-else
                           v-tap="{methods: showResultFn }"
                        >填写收货地址</a>
                    </div>
                </div>

                <!--获取兑换券弹窗成功-->
                <div class="pop pop-dhj" :class="{'hide': !bingoPrize.isShow  }"
                     v-tap="{methods: closeGiftBox }"
                >
                    <!--bingoPrize.type !=='golds' -->
                    <div class="pop_layer"></div>
                    <div class="pop-o">
                        <img class="bg-dhj" src="~static/images/bingo_bg.png">
                        <div v-if="bingoPrize.type === 'exchange'">
                            <img class="dhj" src="~static/images/dhj.png" alt="">
                            <p>兑换券 x{{ bingoPrize.number }}</p>
                            <span>兑换券可用于兑换实物奖品</span>
                        </div>
                        <div v-else>
                            <img class="dhj" src="~static/images/jb.png" alt="">
                            <p>猜球币 x 55000</p>
                            <span>猜球币可用于抽取兑换券</span>
                        </div>
                    </div>
                </div>

                <!--金币不足-->
                <div class="pop pop-jbbz " :class="{'hide': !dhjMsg.showCoinLess }">
                    <div class="pop_layer"></div>
                    <div class="pop-m">
                        <span class="close" v-tap="{methods: closeCoinLess }"></span>
                        <div class="pop-t">金币不足</div>
                        <p>猜球币不足55000</p>
                        <span>您可通过玩游戏或充值，获取猜球币</span>
                        <a href="javascript:;" v-tap="{methods: closeCoinLess }">确认</a>
                    </div>
                </div>

            </div>
        </div>
        <div class="gold-btn">
            <!--我的猜球币-->
            <div class="my-gold" v-if="userinfoMess">
                我的猜球币：<i>{{ userinfoMess.gold_total | golds }}</i>
            </div>
            <!--按钮-->
            <a href="javascript:;" class="btn-lottery" v-tap="{ methods:startLuckDraw }">立即抽取</a>
        </div>

        <div class="pop pop-consume" :class="{'hide':!alertGoodsBox}">
            <div class="pop_layer" v-tap="{methods: closeGoodsMess}"></div>
            <div class="pop-consume-c">
                <div class="close" v-tap="{methods: closeGoodsMess}">
                    <span></span>
                </div>
                <div class="pop-consume-sure" v-if="luckMessData">
                    抽奖将花费{{ luckMessData.consumgolds | golds }}猜球币
                </div>
                <div class="pop-consume-tips">
                    {{ luckMessData.goodsname }}
                </div>
                <a href="jascript:;" class="pop-consume-no" v-tap="{methods: closeGoodsMess}">取消</a>
                <a href="jascript:;" class="pop-consume-yes" v-tap="{methods: showLuckEndFn}" >确认</a>
            </div>
        </div>

        <div class="pop pop-winning" :class="{'hide':!showLuckEnd}">
            <div class="pop_layer" v-tap="{methods: closeLuckEnd}"></div>
            <div class="pop-winning-c" v-if="luckMessData">
                <div class="close" v-tap="{methods: closeLuckEnd}">
                    <span></span>
                </div>
                <h2>恭喜中奖</h2>
                <img :src="luckMessData.img_url" >
                <h3>{{ luckMessData.goodsname }}</h3>
                <a href="javascript:;" class="btn-myWinning" v-tap="{methods: jumpToWin }">查看奖品</a>
            </div>
        </div>

    </section>
</template>
<script>
    import BannerScroll from '~components/banner-scroll.vue'
    import Public_Head from '~components/publicHead'
    export default {
            data () {
                return {
                    alertGoodsBox: false,
                    showLuckEnd: false ,

                    dhjMsg:{
                        // 弹窗信息
                        showMsg:false , // 兑换信息
                        lotteryDhj:false , // 抽奖界面
                        imgurl:'http://img.choopaoo.com/esun/goods/a3/87/a3877f8ea19711e695e9.png' , // 奖品图片
                        name:'',
                        goodsdesc:'',
                        needtickets:'',
                        showCoinLess:false, // 显示金币不足
                    },
                    // 兑换劵抽奖需要的相关数据
    //                aid:null, 相关数据再my.js
                    goodsTypeNew:{
                        goodsid:null,
                        channel:'h5' ,
                        amount:1,
                        company:null, // 虚拟充值卡商家
                        goodstype:null, //  2 实物商品， 1 京东卡 ， 3 话费卡
                    },
                    showResult: false ,  // 显示最终结果页

                }
            },
            watch: {
                winInformation (data) {
                    if (data) {
                        this.showLuckEnd = true
                        this.alertGoodsBox = false
                    }
                }
            },
            methods: {
                //            +++++++++++++
                initState(){
                    this.$store.state.my.showDrawTap = false;
                },
                closeshowResult(){
                    this.showResult = false;
                    this.$store.state.my.showGotoMainList = true ;
                },
                showResultFn(){
                    this.$store.commit( mTypes.showPopGiftSu , false );
                    this.$store.state.my.showGotoMainList = false ;

                    // 初始化 实物收货按钮
                    this.$store.state.my.confirmAddrBtn = false;

                    //  新增列表请求
                    this.$store.dispatch(aTypes.getWinGoodList);


                    this.showResult = true;
                },
                goLuckGiftCopy ({item}) {
                    setTimeout(() => {
                        this.$store.dispatch(aTypes.getGoodsList);
                        // 关闭信息页
                        this.closedhjMsg();
                    }, 200);
                    if (this.userinfoMess && this.userinfoMess.uid !== '0') {
                        this.$store.dispatch(aTypes.getGoodBingoNew, this.goodsTypeNew );
                    } else {
                        this.$store.dispatch('showToast','请刷新再试一下');
                    }
                },
                closeGiftBox(){
                    this.$store.commit(mTypes.setbingoPrize , {
                        isShow: false,
                        number: 0 ,
                        type: 'golds'
                    } );
                },
                alertdhjMess({params}){
                    console.log( params ) ;
                    this.dhjMsg.showMsg = true;
                    this.dhjMsg.imgurl = params.imgurl;
                    this.dhjMsg.name = params.name;
                    this.dhjMsg.goodsdesc = params.goodsdesc;
                    this.dhjMsg.needtickets = params.needtickets;

                    // 抽奖相关数据
                    this.goodsTypeNew.goodsid = params.goodsid ;
                    this.goodsTypeNew.goodstype = params.goodstype ;
                    if( params.company ){
                        this.goodsTypeNew.company = params.company[0] ;
                    }

                },
                closePopGiftSu(){
                    this.$store.commit( mTypes.showPopGiftSu , false )
                },
                closedhjMsg(){
                    this.dhjMsg.showMsg = false;
                },
                closeCoinLess(){
                    this.dhjMsg.showCoinLess = false ;
                },
                jumpTodhj(){
                    //  跳转获取页
                    this.$store.state.my.showDrawTap = false;
                    this.dhjMsg.showMsg = false;
                    this.dhjMsg.lotteryDhj = true ;
                },
                backToDraw(){
                    this.dhjMsg.lotteryDhj = false ;
                },
                startLuckgo(){
                    // 开始抽奖
                    let params = null;
                    if( this.dhjObj.positionName === 'default' ){
                        params = {
                            giftLen : 8 ,
                            currLocal : -1 ,
                        };
                    }else{
                        params = {
                            giftLen : 8 ,
                            currLocal : this.dhjObj.positionName.slice(9) ,
                        };
                    }
                    if( !this.dhjObj.dhjBtn ){
                        // 重复点击
                        return false ;
                    }
                    if( parseInt( this.userinfoMess.gold_total ) < 55000 ){
                        this.dhjMsg.showCoinLess = true ;
                        return false;
                    }
                    this.$store.dispatch(aTypes.luckDrawGo , params )
                },


                jumpToWin () {
                    this.$router.push('/chargeNew/showList')
                },
                closeLuckEnd () {
                    /* 关闭中奖窗口 */
                    this.showLuckEnd = false
                },
                closeGoodsMess () {
                    this.alertGoodsBox = false
                },
                showLuckEndFn () {
                    /* 中奖框 */
                    if (this.ck) {
                        if (this.luckMessData) {
                            if (this.luckMessData.company) {
                                this.$store.dispatch('getLuckGoodBingo', {
                                    currGoodsid: this.luckMessData.goodsid,
                                    currConsumgolds: this.luckMessData.consumgolds,
                                    goodstype: this.luckMessData.goodstype,
                                    company: this.luckMessData.company
                                })
                            } else {
                                this.$store.dispatch('getLuckGoodBingo', {
                                    currGoodsid: this.luckMessData.goodsid,
                                    currConsumgolds: this.luckMessData.consumgolds,
                                    goodstype: this.luckMessData.goodstype
                                })
                            }
                        } else {
                            this.$store.dispatch('showToast', '抽取失败,请重新再试')
                            this.alertGoodsBox = false
                        }
                    } else {
                        this.$store.dispatch('doAuth')
                    }
                },
                startLuckDraw () {
                    this.alertGoodsBox = true
                }
            },
            components: {
                BannerScroll,
                Public_Head
            },
            computed: {
                dhjEvent(){
                    return this.$store.state.dhjEvent
                },
                currOid(){
                    return this.$store.state.currOid
                },
                showPopGiftSu(){
                    return this.$store.state.showPopGiftSu
                },
                dhjObj(){
                    return this.$store.state.dhj
                },
                bingoPrize(){
                    return this.$store.state.bingoPrize
                },
    ///
                winInformation () {
                    return this.$store.state.chargeNewData.winInformation
                },
                luckMessData () {
                    return this.$store.state.luckdrawData.luckMessData
                },
                userinfoMess () {
                    return this.$store.state.userInfo
                },
                ck () {
                    return this.$store.state.ck
                },
                /* 滚动数据 */
                bannerScrollData () {
                    return this.$store.state.chargeNewData.bannerScrollData
                }
            },
            mounted () {
                if (!this.bannerScrollData) {
                    this.$store.dispatch('getHomeInfo')
                }
                if (!this.luckMessData) {
                    setTimeout(() => {
                        this.$router.push('/chargeNew/draw')
                    }, 100)
                }
            },
            filters: {
                golds: (num) => {
                    num = Number(num)
                    if (num < 10000) {
                        return num
                    } else if (num < 100000000) {
                        return Math.round(num / 10000 * 10) / 10 + '万'
                    } else {
                        return Math.round(num / 100000000 * 10) / 10 + '亿'
                    }
                }
            }
        }
</script>
