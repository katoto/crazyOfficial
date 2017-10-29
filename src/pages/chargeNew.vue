<template>
    <div class="chargeNew">
        <div class="wrap respon2 mine">
            <PublicHead person-title="商城"></PublicHead>
            <div class="mall-nav">
                <ul>
                    <li :class="{'on':isShowChargeTab}" v-tap="{methods: changeCharge, params:true }">充值</li>
                    <li :class="{'on':!isShowChargeTab}" v-tap="{methods: changeCharge, params:false}">领奖</li>
                </ul>
                <a href="javascript:;" class="my-msg" v-tap="{methods: showMyMess}"
                    :class="{'transform':isShowMyMess}"
                >
                    <i></i>
                </a>
            </div>
            <div class="main-top">
                <div class="fl" v-show="isShowChargeTab">
                    <span class="cz-icon">
                        虚拟道具只用于展示，购买道具赠送猜球币
                    </span>
                </div>

                <!-- 滚动的数据 -->
                <section class="fl"  v-if="!isShowChargeTab">
                    <banner-scroll v-show="bannerScrollData">
                        <div class="text-scroller">
                            <ul class="scroller-in">
                                <li v-for="ban in bannerScrollData" v-html="ban"></li>
                            </ul>
                        </div>
                    </banner-scroll>
                </section>

                <div class="btn-myprop">
                    <span class="my-tool" v-show="isShowChargeTab"  v-tap="{methods: showMyTool, params: true}">我的道具</span>
                    <span class="my-exchange" :class="{'on':isSureConfirmAdd }" v-show="!isShowChargeTab" v-tap="{methods: showPrizeList, params: true}">兑换记录</span>
                </div>

            </div>
            <div class="main respon2-itm">
                <div class="scroller clear">
                    <div class="main-list main-list01 clear" v-show="isShowChargeTab">
                        <div class="item" v-for="item in chargeList">
                            <img :src="item.imgurl">
                            <img v-if="item.gifturl !==''" :src="item.gifturl" alt="" class="itemAdd">
                            <!--<p class="item-txt">送<i class="icon-jinbi"></i><strong>{{ (parseInt( item.goldnum ) + parseInt( item.attchgolds )) |golds }}</strong></p>-->
                            <!-- 补个角标 !! -->
                            <p class="item-txt">送<i class="icon-jinbi"></i><strong>{{ item.goldnum|golds }}<i v-if="parseInt( item.attchgolds )>0" class="addCoin">+{{ item.attchgolds  |golds }}  </i></strong></p>
                            <span class="item-btn" data-type="支付宝充值" :data-tab="item.money" v-tap="{methods: buy, item: item}">￥{{ item.rmb }}</span>
                        </div>
                    </div>
                    <div class="main-list main-list02 clear" v-show="!isShowChargeTab">
                        <div class="item" v-for="good in goodslist">
                            <img :src="good.imgurl"
                                 v-tap="{methods: gotoLuck, item:good }"
                            >
                            <!---->
                            <p class="item-txt">{{ good.name }}</p>
                            <span class="item-btn" v-if="parseInt(good.restnum)>=1"
                                  data-type="点击抽奖" :data-tab="good.name"
                                  v-tap="{methods: alertGoodsMess,  params:good}"
                            >

                            <i class="icon-jinbi"></i>{{ good.consumgolds | golds }}猜球币</span>
                            <span class="item-btn item-info-no" v-else>活动商品补货中</span>
                        </div>
                        <div class="item" v-if="goodslist && parseInt(goodslist.length)%2!==0"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="layer hide"></div>

        <!--我的道具-->
        <div class="pop pop02 pop-mytool" :class="{'hide':!isShowMyTool}">
            <div class="pop_layer" v-tap="{methods: choseMyTool}"></div>
            <div class="popIn">
                <div class="close" v-tap="{methods: choseMyTool}">
                    <span></span>
                </div>
                <div class="popTit">
                    <h2>我的道具</h2>
                </div>
                <p>虚拟道具只用于展示，购买道具赠送猜球币</p>
                <div class="popIn-c">
                    <ul v-if="footballPropsList">
                        <li v-for="propsList in footballPropsList" :class="{'item-no':propsList.num === '0'}">
                            <img :src="propsList.img_url">
                            <span  v-if="propsList.num === '0'">未点亮</span>
                            <span v-else>x{{ propsList.num }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!--我的道具-->
        <!--兑换记录-->
        <div class="pop pop02 pop-myexchange" :class="{'hide':!isShowPrizeList}">
            <div class="pop_layer" v-tap="{methods: chosePrizeList}"></div>
            <div class="popIn">
                <div class="close" v-tap="{methods: chosePrizeList}">
                    <span></span>
                </div>
                <div class="popTit">
                    <h2>兑奖记录</h2>
                </div>
                <p v-if="winGoodslist && winGoodslist.allnum!=='0'">兑奖记录奖保留三个月</p>
                <div class="emptyIn" v-else>
                    <span class="icon icon_empty"></span>
                    <p>暂无兑换记录</p>
                </div>
                <div class="pop-myexchange-wrap" v-if="winGoodslist && winGoodslist.allnum!=='0'">
                    <ul v-if="winGoodslist">
                        <template v-for="item in winGoodslist.list">
                            <li class="myexchange-list" v-if="item.goodstype==='1'|| item.goodstype==='3'">
                                <div class="fl">
                                    <img :src="item.imgurl">
                                </div>
                                <div class="fr">
                                    <h3 class="myexchange-t">
                                        <span v-if="item.goodstype==='3'">{{ item.company | companyName }}{{ item.goodsname }}</span>
                                        <span v-else>{{ item.goodsname }}</span>
                                    </h3>
                                    <div>
                                        <span>卡号:{{ item.cardno }}</span>
                                        <button href="javascript:;" class="btn myexchange-copy"
                                           v-clipboard:copy="item.cardno"
                                           v-clipboard:success="succCopy"
                                           v-clipboard:error="onError"
                                        >复制</button>
                                    </div>
                                    <div>
                                        <span>密码：{{ item.password }}</span>
                                        <button href="javascript:;" class="btn myexchange-copy"
                                           v-clipboard:copy="item.password"
                                           v-clipboard:success="succCopy"
                                           v-clipboard:error="onError"
                                        >复制</button>
                                    </div>
                                    <div class="myexchange-time">
                                        <span>{{ item.crtime }}</span>
                                    </div>
                                </div>
                            </li>
                            <li class="myexchange-list" v-if="item.goodstype==='2'&&item.aid!=='-1'">
                                <div class="fl">
                                    <img :src="item.imgurl">
                                </div>
                                <div class="fr">
                                    <section v-tap="{methods: showTapLi, item:'showWuliu',param:item}">
                                        <h3 class="myexchange-t">
                                            <span>{{ item.goodsname }}</span>
                                        </h3>
                                        <div>
                                            <span>物流状态：{{ item.orderstatus | WuliuStatus(item.logistics_company)}}</span>
                                        </div>
                                    </section>
                                    <div v-if="item.sid!==''">
                                        <span >快递单号：{{item.sid}}</span>
                                        <button href="javascript:;" class="btn myexchange-copy"
                                           v-clipboard:copy="item.sid"
                                           v-clipboard:success="succCopy"
                                           v-clipboard:error="onError"
                                        >复制</button>
                                    </div>
                                    <div class="myexchange-time">
                                        <span>{{ item.crtime }}</span>
                                    </div>
                                </div>
                            </li>
                            <li class="myexchange-list" v-if="item.goodstype==='2'&&item.aid==='-1'">
                                <div class="fl">
                                    <img :src="item.imgurl">
                                </div>
                                <div class="fr">
                                    <h3 class="myexchange-t">
                                        <span>{{ item.goodsname }}</span>
                                    </h3>
                                    <div>
                                        <span>物流状态:</span>
                                        <a
                                           v-tap="{methods: showTapLi, item:'goAddressPage',param:item}"
                                           href="javascript:;" class="btn myexchange-address">请确认地址</a>

                                    </div>
                                    <div class="myexchange-time">
                                        <span>{{ item.crtime }}</span>
                                    </div>
                                </div>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
        </div>

        <!--兑换记录 123 -->

        <div class="pop pop-consume" :class="{'hide':!alertGoodsBox}">
            <div class="pop_layer" v-tap="{methods: closeGoodsMess}"></div>
            <div class="pop-consume-c" v-if="alertGoodsData">
                <div class="pop-consume-sure">
                    抽奖将花费{{ alertGoodsData.consumgolds | golds }}猜球币
                </div>
                <div class="pop-consume-tips">
                    {{ alertGoodsData.name }}
                </div>
                <a href="jascript:;" class="pop-consume-no" v-tap="{methods: closeGoodsMess}">取消</a>
                <a href="jascript:;" class="pop-consume-yes" v-tap="{methods: showLuckEndFn}" >确认</a>
            </div>
        </div>

        <div class="pop pop01 pop-winning" :class="{'hide':!showLuckEnd}">
            <div class="pop_layer" v-tap="{methods: closeLuckEnd}"></div>
            <div class="popIn" v-if="alertGoodsData">
                <div class="close" v-tap="{methods: closeLuckEnd}">
                    <span></span>
                </div>
                <div class="popTit">
                    <h2>恭喜中奖</h2>
                </div>
                <img :src="alertGoodsData.imgurl" >
                <h3>{{ alertGoodsData.name }}</h3>
                <a href="javascript:;" class="btn-myWinning" v-tap="{methods: showPrizeList, params: true}">查看奖品</a>
            </div>
        </div>

        <!-- 中奖弹窗 -->

        <!-- 物流弹窗开始   -->
        <div class="pop pop_logistics" :class="{'hide':!showLogisticTap}">
            <div class="pop_layer" v-tap="{methods: closeWuliuBox}"></div>
            <div class="popIn">
                <div class="popTit">
                    <h2 class="logistics_bg_title">物流状态</h2>
                    <span class="close" v-tap="{methods: closeWuliuBox}">
                        <span></span>
                    </span>
                </div>
                <!-- 有物流开始 -->
                <section class="logistics_item_wrapper main-list" v-if="logisticMess">
                    <div class="full-scroll">
                        <div class="logistics_item" :class="{'logistics_item_cur': !index}" v-for="(item,index) in logisticMess.context">
                            <div class="logistics_item_date">
                                <span class="logistics_item_date01">{{item.timeDate}}</span>
                                <span class="logistics_item_date02">{{ item.timeFullYear }}</span>
                            </div>
                            <div class="logistics_item_line_container">
                                <span class="logistics_item_line_circle"
                                      :class="{'logistics_item_line_circle_current': !index}"></span>
                                <span class="logistics_item_line"></span>
                            </div>
                            <div class="logistics_item_text" :class="{'logistics_item_text_current': !index}">
                                {{ item.desc }}
                            </div>
                        </div>
                    </div>
                </section>
                <!-- 有物流结束 -->
                <!-- 无物流开始 样式问题 -->
                <div class="logistics_item_wrapper" v-if="!(logisticMess)">
                    <div class="logistics_none_text01">物流信息查阅服务暂不可用<br>您可以复制以下快递单号，自行前往查看</div>
                    <div v-if="currentLogistic">
                        <div class="logistics_none_text02">
                            <span class="draw_record_list_text">快递公司：{{currentLogistic.logistics_company}}</span>
                        </div>
                        <div class="logistics_none_text02">
                        <span class="draw_record_list_text">快递单号：<input class="copyinput" readonly
                                                                        :value="currentLogistic.sid"/></span>
                            <a class="draw_record_list_copy_btn" v-clipboard:copy="currentLogistic.sid"
                               v-clipboard:success="succCopy" v-clipboard:error="onError">复制</a>
                            <!--@click="showCopyBox(currentLogistic.sid)"-->
                        </div>
                    </div>
                </div>
                <!-- 无物流结束 -->
            </div>
        </div>

        <!--相关信息-->
        <div class="pop pop-my-msg" :class="{'hide':!isShowMyMess}">
            <div class="pop_layer" v-tap="{methods: choseMyMess}"></div>
            <div class="pop-msg-c">
                <span>
                    我的余额
                </span>
                <ul v-if="userInfo">
                    <li class="pop-myover">
                        {{ userInfo.gold_total | golds }}
                    </li>
                    <li class="pop-myaddress"  v-tap="{methods: jumpToPage,params:'shopAdd'}" >
                        收货地址
                    </li>
                    <li class="pop-explain" v-tap="{methods: jumpToPage,params:'lotteryNotes'}">
                        抽奖说明
                    </li>
                </ul>
            </div>
        </div>

        <!-- 复制框   -->
        <div class="pop pop_logistics_copy" :class="{'hide':!isShowCopyBox}">
            <div class="pop_layer" v-tap="{methods: closeCopyBox}"></div>
            <div class="popIn">
                <div class="popTit">
                    <h2 class="logistics_bg_title">长按下方复制</h2>
                    <span class="close" v-tap="{methods: closeCopyBox}">
                        <span></span>
                    </span>
                </div>
                <div class="logistics_item_wrapper_copy">
                    <input class="copyBoxinput" type="text" :value="copyValue" onfocus="this.select();">
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    import Vue from 'vue'
    import BannerScroll from '~components/banner-scroll.vue'
    import {starHtml, stopHtml} from '~common/util'
    import PublicHead from '~components/publicHead'
    import {isWeiX} from '../common/util';

    import vueClipboard2 from 'vue-clipboard2'
    Vue.use(vueClipboard2);

export default {
        data () {
            return {
                isShowCopyBox: false,
                copyValue: '',
                currentLogistic: null,
                showLogisticTap: false,  // 物流弹窗

                current: null,
                wechatCode: null,

                isShowChargeTab: true,
                isShowMyTool: false, // 我的道具

                isShowPrizeList: false, // 我的兑换

                isShowMyMess: false,  // 我的mess

                alertGoodsData: null,  // 奖品信息 数据
                alertGoodsBox: false,
                showLuckEnd: false, // 现在中奖结果

                clickImgGood: false
            }
        },
        watch: {
            luckMessData (data) {
                if (this.clickImgGood) {
                    this.$router.push('/luckdraw')
                }
            },
            winInformation (data) {
                if (data) {
                    this.showLuckEnd = true
                    this.alertGoodsBox = false
                }
            }
        },
        components: {
            BannerScroll,
            PublicHead
        },
        methods: {
            closeCopyBox () {
                this.isShowCopyBox = false
            },
            startLuckDraw () {
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
                    this.$router.push('/chargeNew/draw')
                }
            },
            closeWuliuBox () {
                this.showLogisticTap = false
            },

            alertGoodsMess ({params}) {
                this.alertGoodsBox = true
                this.alertGoodsData = params
        /* 请求商品信息 */
                this.$store.dispatch('getGotoLuckMess', params)
            },
            closeGoodsMess () {
                /* 关闭抽奖提示花费窗口 */
                this.alertGoodsBox = false
                this.alertGoodsData = null
            },
            showLuckEndFn () {
                /* 中奖框 */
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
            },
            closeLuckEnd () {
                /* 关闭中奖窗口 */
                this.showLuckEnd = false
            },

            jumpToPage ({params}) {
                params = params || ''
                switch (params) {
                case 'lotteryNotes':
                    _hmt.push(['_trackEvent', 'off_商城页抽奖说明点击', 'click', 'off_商城页抽奖说明'])
                    this.$router.push('/lotteryNotes')
                    ;break
                case 'shopAdd':
                    _hmt.push(['_trackEvent', 'off_商城页收奖地址点击', 'click', 'off_商城页收奖地址'])
                    this.$router.push('/shopAdd')
                    ;break
                case 'myHome':
                    ;break
                }
            },

            showTapLi ({item, param}) {
                switch (item) {
                case 'goAddressPage':
//                        /* 商品id  两个接口是否合成一个接口 ？？ */
                    if (param && param.oid) {
                        this.$router.push(`/shopAdd/${param.oid}`)
                    }
                    break
                case 'showWuliu':
                    let orderNum = param.sid
                    this.currentLogistic = param
                    if (!orderNum) {
                        orderNum = 0
                        this.$store.commit('setLogisticMess', 0)
                        this.showLogisticTap = true
                        return false
                    }
                    //                请求物流接口
                    this.$store.dispatch('getLogisticMess', orderNum)
                    setTimeout(() => {
                        this.showLogisticTap = true
                    }, 10)
                    break
                }
            },
            succCopy (param) {
                this.$store.dispatch('showToast', '复制成功')
            },
            onError (e) {
                this.isShowCopyBox = true
                if (e.text) {
                    this.value = e.text
                }
                this.$store.dispatch('showToast', '复制失败~请手动复制')
            },
            showMyMess () {
                if (this.isShowMyMess) {
                    this.isShowMyMess = false
                } else {
                    this.isShowMyMess = true
                }
            },
            choseMyMess () {
                this.isShowMyMess = false
            },
            /* 我的兑换 */
            showPrizeList ({params}) {
                if (this.userInfo) {
                    stopHtml()
                    this.showLuckEnd = false
                    this.isShowPrizeList = params
                /* 可优化 */
                    this.$store.dispatch('getWinGoodList')
                    _hmt.push(['_trackEvent', 'off_商城页兑换记录点击', 'click', 'off_商城页兑换记录'])
                } else {
                    this.$store.dispatch('doAuth')
                }
            },
            chosePrizeList () {
                starHtml()
                this.isShowPrizeList = false
            },
            /* 我的道具 */
            showMyTool ({params}) {
                if (this.userInfo) {
                    stopHtml()
                /* 可在充值回调后 请求 */
                    this.$store.dispatch('getFootballPropsList')
                    this.isShowMyTool = params
                    _hmt.push(['_trackEvent', 'off_商城页我的道具点击', 'click', 'off_商城页我的道具'])
                } else {
                    this.$store.dispatch('doAuth')
                }
            },
            choseMyTool () {
                starHtml()
                this.isShowMyTool = false
            },
            /* tap 切换 */
            changeCharge ({params}) {
                if (!params) {
                    this.$router.push('/chargeNew/draw')
                    this.$store.dispatch('getGoodsList')
                    if (this.userInfo) {
                        this.$store.dispatch('getWinGoodList')
                    }
                    _hmt.push(['_trackEvent', 'off_商城页兑换点击', 'click', 'off_商城页兑换'])
                } else {
                    this.$router.push('/chargeNew')
                    _hmt.push(['_trackEvent', 'off_商城页充值点击', 'click', 'off_商城页充值'])
                }
                this.isShowChargeTab = params
            },

            /* 去抽奖展示 先按跳转的来处理吧  */
            gotoLuck ({item}) {
                //  抽奖入口判断
                if (item) {
                    this.clickImgGood = true
                    this.$store.dispatch('getGotoLuckMess', item)
                } else {
                    this.clickImgGood = false
                    this.$store.dispatch('showToast', '抽奖失败，请再试一试！')
                }
            },

            buy ({item}) {
                this.current = item
                if (!this.current) {
                    this.$store.dispatch('showToast', '至少选择一项')
                    return
                }
                if (!this.ck) {
                    this.$store.dispatch('doAuth')
                    return false
                }
                let params = {}
                params.ck = this.$store.state.ck
                params.goldid = this.current.goldid
                params.money = this.current.rmb
                params.goldnum = this.current.goldnum
                if (!isWeiX) {
                    params.payid = 3009
                    this.$store.dispatch('doCharge', params)

                } else {
                    /* 微信支付 */
                    console.log( params  )
                    params.code = sessionStorage.getItem('wx_code');
                    params.payid = 3002;
                    this.$store.dispatch('doWechatPay', params)

                }

                _hmt.push(['_trackEvent', 'off_充值额度' + this.current.rmb + '点击', 'click', 'off_充值额度' + this.current.rmb])
            }

        },
        computed: {
            logisticMess () {
                return this.$store.state.chargeNewData.logisticMess
            },
            winInformation () {
                return this.$store.state.chargeNewData.winInformation
            },
            luckMessData () {
                return this.$store.state.luckdrawData.luckMessData
            },
            userInfo () {
                return this.$store.state.userInfo
            },
            ck () {
                return this.$store.state.ck
            },
            /* 中奖几率 */
            winGoodslist () {
                return this.$store.state.chargeNewData.winGoodslist
            },
            isSureConfirmAdd () {
                let isSure = false
                if (this.winGoodslist && this.winGoodslist.list.length > 0) {
                    for (let i = 0, len = this.winGoodslist.list.length; i < len; i++) {
                        if (this.winGoodslist.list[i].goodstype === '2' && this.winGoodslist.list[i].aid === '-1') {
                            isSure = true
                            break
                        }
                    }
                }
                return isSure
            },
            /* 滚动数据 */
            bannerScrollData () {
                return this.$store.state.chargeNewData.bannerScrollData
            },

            /* 新的奖品 */
            goodslist () {
                return this.$store.state.chargeNewData.goodslist
            },

            chargeList () {
                return this.$store.state.chargeNewData.chargeList
            },
            footballPropsList () {
                return this.$store.state.chargeNewData.footballPropsList
            }
        },
        mounted () {
            this.$store.dispatch('getChargeList')
        /* homeinfo 数据 */
            if (!(this.bannerScrollData)) {
                this.$store.dispatch('getHomeInfo')
            }
            if (this.$route.params.others && this.$route.params.others === 'draw') {
                this.isShowChargeTab = false
                this.$store.dispatch('getGoodsList')
                if (this.userInfo) {
                    /* 小红点 */
                    this.$store.dispatch('getWinGoodList')
                }
            }
            if (this.$route.params.others && this.$route.params.others === 'showList') {
                stopHtml()
                this.isShowChargeTab = false
                this.$store.dispatch('getGoodsList')
                this.showLuckEnd = false
                this.isShowPrizeList = true
                if (this.userInfo) {
                    /* 可优化 */
                    this.$store.dispatch('getWinGoodList')
                }
            }
            if (!isWeiX) {

                if (this.$route.params.others && this.$route.params.others.indexOf('_@_ck_@_') > -1) {
                    let arr = this.$route.params.others.split('_@_')
                    if (arr[0] === '2') {
                        this.$store.dispatch('showToast', '充值成功')
                        history.replaceState({}, '', `${location.href.split(location.pathname)[0]}${location.pathname}#/chargeNew`)
                    } else if (arr[0] === '1') {
                        this.$store.dispatch('showToast', '支付未完成，请重试')
                        history.replaceState({}, '', `${location.href.split(location.pathname)[0]}${location.pathname}#/chargeNew`)
                    }
                }

            } else {
                if (this.$route.params.others && ~this.$route.params.others.indexOf('_@')) {
                    let code = this.$route.params.others.split('_@')[1];
                    sessionStorage.setItem('wx_code', code);
//                    console.log(999)

                    console.log(this.$route.path.replace(this.$route.params.others, ''))
                    this.$router.replace(this.$route.path.replace(this.$route.params.others, ''));
                } else {
                    if (!sessionStorage.getItem('wx_code')) {
//                        console.log('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx86d590e6cf755764&redirect_uri=' + location.href.split('?')[0].split('#')[0] + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect')
                        window.location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx86d590e6cf755764&redirect_uri=' + location.href.split('?')[0].split('#')[0] + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect');
                    }
                }
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
            },
            companyName (name) {
                if (name) {
                    switch (name) {
                    case 'lt': return '联通'
                    case 'dx': return '电信'
                    case 'yd': return '移动'
                    default : return '其他'
                    }
                }
            },
            WuliuStatus (status, wuliu) {
//                物流状态
                let str = ''
                switch (status) {
                case '1':
                    str = '未发货'
                    break
                case '2':
                    str = '已发货(' + wuliu + ')'
                    break
                case '3':
                    str = '已签收(' + wuliu + ')'
                    break
                }
                return str
            }
        }
    }
</script>
