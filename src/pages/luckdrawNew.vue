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
                        <img   :src="luckMessData.img_url" >
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
                showLuckEnd: false
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
