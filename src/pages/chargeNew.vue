<template>
    <div class="chargeNew">
        <div class="wrap respon2 mine">
            <PublicHead person-title="商城"></PublicHead>
            <div class="mall-nav">
                <ul>
                    <li :class="{'on':isShowChargeTab}" v-tap="{methods: changeCharge, params:true }">充值</li>
                    <li :class="{'on':!isShowChargeTab}" v-tap="{methods: changeCharge, params:false}">领奖</li>
                </ul>
                <a v-if="userInfo" href="javascript:;" class="my-msg" v-tap="{methods: showMyMess}"
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

                <!-- 用户的兑换劵数量 -->
                <div class="my-dhj" v-if="userInfo && !isShowChargeTab" v-tap="{methods: jumpTodhj }">
                    {{ userInfo.exchangetkt_total }}
                </div>
            </div>
            <div class="main respon2-itm">
                <div class="scroller clear" >
                    <template v-if="!selectBoxHide">
                        <div class="main-list main-list01 clear" v-show="isShowChargeTab">
                            <div class="item" v-for="item in chargeList">
                                <img :src="item.imgurl">
                                <img v-if="item.gifturl !==''" :src="item.gifturl" alt="" class="itemAdd">
                                <p class="item-txt">送<i class="icon-jinbi"></i><strong>{{ item.goldnum|golds }}<i v-if="parseInt( item.attchgolds )>0" class="addCoin">+{{ item.attchgolds  |golds }}  </i></strong></p>
                                <span class="item-btn" data-type="支付宝充值" :data-tab="item.money" v-tap="{methods: buy, item: item}">￥{{ item.rmb }}</span>
                            </div>
                        </div>
                        <!--// ================-->
                        <!--<div class="main-list main-list02 clear" v-show="!isShowChargeTab">-->
                        <!--<div class="item" v-for="good in goodslist">-->
                        <!--<img :src="good.imgurl"-->
                        <!--v-tap="{methods: gotoLuck, item:good }"-->
                        <!--&gt;-->
                        <!--&lt;!&ndash;&ndash;&gt;-->
                        <!--<p class="item-txt">{{ good.name }}</p>-->
                        <!--<span class="item-btn" v-if="parseInt(good.restnum)>=1"-->
                        <!--data-type="点击抽奖" :data-tab="good.name"-->
                        <!--v-tap="{methods: alertGoodsMess,  params:good}"-->
                        <!--&gt;-->

                        <!--<i class="icon-jinbi"></i>{{ good.consumgolds | golds }}猜球币</span>-->
                        <!--<span class="item-btn item-info-no" v-else>活动商品补货中</span>-->
                        <!--</div>-->
                        <!--<div class="item" v-if="goodslist && parseInt(goodslist.length)%2!==0"></div>-->
                        <!--</div>-->
                        <!--  11111111111    -->
                        <!-- :class="{'hide': dhjMsg.lotteryDhj }" -->
                        <div class="main-list clear" v-show="!isShowChargeTab">
                            <div class="item" v-for="good in goodslist">
                                <img :src="good.imgurl"
                                     v-tap="{methods: alertGoodsMess, params: {goodImgUrl: good.imgurl, goodName: good.name, goodGolds: good.consumgolds, goodsdesc:good.goodsdesc}}"
                                >
                                <p class="item-txt">{{ good.name }}</p>
                                <span class="item-btn" v-if="parseInt(good.restnum)>=1" v-tap="{methods: alertdhjMess, params: good  }" >
                            <i class="icon-dhj"></i>
                            {{ good.needtickets }}
                        </span>
                                <span class="item-btn item-lack" v-else style="background-color:#696f82">活动商品补货中</span>
                            </div>
                            <div class="item" v-if="parseInt(goodslist.length)%2!==0"></div>
                        </div>
                    </template>
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
                </div>
            </div>
        </div>
        <div class="layer hide"></div>

        <!-- full-scroll 新增 -->
        <!-- 礼包弹窗  -->
        <div class="pop pop_prizes" :class="{'hide':!alertGoodsBox}">
            <div class="pop_layer"></div>
            <div class="popIn" v-if="alertGoodsData">
                <div class="popTit">
                    <h2 class="titlle">奖品信息</h2>
                    <span class="close" v-tap="{methods: closeAlert}">
                        <span></span>
                    </span>
                </div>
                <div class="pop_cont">
                    <p>{{alertGoodsData.goodName}}</p>
                    <img :src="alertGoodsData.goodImgUrl">
                    <p style="visibility: hidden"><i class="icon-jinbi"></i>{{alertGoodsData.goodGolds | golds }}</p>
                    <div class="info">
                        <span>奖品说明：</span>
                        <p v-if="alertGoodsData.goodsdesc">{{alertGoodsData.goodsdesc}}</p>
                        <p style="color: #e7e7e7;">抽奖100%可中实物商品或等额猜球币。</p>
                    </div>
                </div>
            </div>
        </div>

        <!--奖品兑换-->
        <template v-if="userInfo">
            <div class="pop pop-gift" :class="{ 'hide' : !dhjMsg.showMsg,'lack': userInfo.exchangetkt_total<dhjMsg.needtickets}">
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
                    <div class="prize-tips" v-if="userInfo">
                        <p class="prize-tips01">需要：</p>
                        <!--当可以兑换的时候加这个行内样式否则删除，-->
                        <p class="prize-tips02">{{ dhjMsg.needtickets }}张</p>
                        <p class="prize-tips03" v-if="userInfo">（您有{{ userInfo.exchangetkt_total }}张）</p>
                    </div>
                    <div class="prize-lack" v-if="parseInt( userInfo.exchangetkt_total) < parseInt( dhjMsg.needtickets ) ">哎呀，兑换券不够，先点击获取吧！</div>

                    <div class="prize-btn">
                        <div v-if="parseInt( userInfo.exchangetkt_total) < parseInt( dhjMsg.needtickets ) ">
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
        </template>


        <!--兑换成功 弹窗-->
        <!--<div class="pop pop-giftSu" :class="{'hide': !showPopGiftSu}">-->
            <!--<div class="pop_layer"></div>-->
            <!--<div class="pop-m" v-if="dhjObj && dhjObj.goodBingoNew">-->
                <!--<span class="close" v-tap="{methods: closePopGiftSu }"></span>-->
                <!--<div class="pop-t">兑换结果</div>-->
                <!--<div class="chang-su">-->
                    <!--兑换成功！-->
                <!--</div>-->
                <!--<a href="javascript:;" v-if="dhjObj.goodBingoNew.goodstype !== '2' "-->
                   <!--v-tap="{methods: showResultFn }"-->
                <!--&gt;查看卡号卡密</a>-->
                <!--<a href="javascript:;" v-else-->
                   <!--v-tap="{methods: showResultFn }"-->
                <!--&gt;填写收货地址</a>-->
            <!--</div>-->
        <!--</div>-->

        <!--获取兑换券弹窗成功-->
        <div class="pop pop-dhj" :class="{'hide': !bingoPrize.isShow  }"
             v-tap="{methods: closeGiftBox }"
        >
            <div class="pop_layer"></div>
            <div class="pop-o">
                <img class="bg-dhj" src="~static/images/bingo_bg.png">
                <div v-if="bingoPrize.type === 'exchange'">
                    <img class="dhj" src="~static/images/dhj.png" alt="">
                    <p>兑换券 x{{ bingoPrize.number }}</p>
                    <span>兑换券可在兑换场兑换心仪奖品</span>
                </div>
                <div v-else>
                    <img class="dhj" src="~static/images/jb.png" alt="">
                    <p>猜球币 x {{ bingoPrize.number }}</p>
                    <span style="visibility: hidden">猜球币可用于抽取兑换券</span>
                </div>
            </div>
        </div>

        <!--金币不足-->
        <div class="pop pop-jbbz " :class="{'hide': !dhjMsg.showCoinLess }">
            <div class="pop_layer"></div>
            <div class="pop-m">
                <span class="close" v-tap="{methods: closeCoinLess }"></span>
                <div class="pop-t">金币不足</div>
                <p>猜球币不足60000</p>
                <span>您可通过玩游戏或充值，获取猜球币</span>
                <a href="javascript:;" v-tap="{methods: closeCoinLess }">确认</a>
            </div>
        </div>


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
                        <template v-for="goodList in winGoodslist.list">
                            <li class="myexchange-list" v-if="goodList.goodstype==='1'|| goodList.goodstype==='3'">
                                <div class="fl">
                                    <img :src="goodList.imgurl">
                                </div>
                                <div class="fr">
                                    <h3 class="myexchange-t">
                                        <span v-if="goodList.goodstype==='3'">{{ goodList.company | companyName }}{{ goodList.goodsname }}</span>
                                        <span v-else>{{ goodList.goodsname }}</span>
                                    </h3>
                                    <div>
                                        <span>卡号:{{ goodList.cardno }}</span>
                                        <button href="javascript:;" class="btn myexchange-copy"
                                           v-clipboard:copy="goodList.cardno"
                                           v-clipboard:success="succCopy"
                                           v-clipboard:error="onError"
                                        >复制</button>
                                    </div>
                                    <div>
                                        <span>密码：{{ goodList.password }}</span>
                                        <button href="javascript:;" class="btn myexchange-copy"
                                           v-clipboard:copy="goodList.password"
                                           v-clipboard:success="succCopy"
                                           v-clipboard:error="onError"
                                        >复制</button>
                                    </div>
                                    <div class="myexchange-time">
                                        <span>{{ goodList.crtime }}</span>
                                    </div>
                                </div>
                            </li>
                            <li class="myexchange-list" v-if="goodList.goodstype==='2'&&goodList.aid!=='-1'">
                                <div class="fl">
                                    <img :src="goodList.imgurl">
                                </div>
                                <div class="fr">
                                    <section v-tap="{methods: showTapLi, item:'showWuliu',param:goodList}">
                                        <h3 class="myexchange-t">
                                            <span>{{ goodList.goodsname }}</span>
                                        </h3>
                                        <div>
                                            <span>物流状态：{{ goodList.orderstatus | WuliuStatus(goodList.logistics_company)}}</span>
                                        </div>
                                    </section>
                                    <div v-if="goodList.sid!==''">
                                        <span >快递单号：{{goodList.sid}}</span>
                                        <button href="javascript:;" class="btn myexchange-copy"
                                                v-clipboard:copy="goodList.sid"
                                                v-clipboard:success="succCopy"
                                                v-clipboard:error="onError"
                                        >复制</button>
                                    </div>
                                    <div class="myexchange-time">
                                        <span>{{ goodList.crtime }}</span>
                                    </div>
                                </div>
                            </li>
                            <li class="myexchange-list" v-if="goodList.goodstype==='2'&&goodList.aid==='-1'">
                                <div class="fl">
                                    <img :src="goodList.imgurl">
                                </div>
                                <div class="fr">
                                    <h3 class="myexchange-t">
                                        <span>{{ goodList.goodsname }}</span>
                                    </h3>
                                    <div>
                                        <span>物流状态:</span>
                                        <a
                                           v-tap="{methods: showTapLi, item:'goAddressPage',param:goodList }"
                                           href="javascript:;" class="btn myexchange-address">请确认地址</a>

                                    </div>
                                    <div class="myexchange-time">
                                        <span>{{ goodList.crtime }}</span>
                                    </div>
                                </div>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
        </div>

        <!--兑换记录 123   :class="{'hide':!showLuckEnd}"-->

        <div class="pop pop01 pop-winning" :class="{'hide': !showPopGiftSu}" >
            <div class="pop_layer" v-tap="{methods: closeLuckEnd}"></div>
            <div class="popIn" v-if="dhjMsg">
                <div class="close" v-tap="{methods: closeLuckEnd}">
                    <span></span>
                </div>
                <div class="popTit">
                    <h2>恭喜中奖</h2>
                </div>
                <img :src="dhjMsg.imgurl" >
                <h3>{{ dhjMsg.name }}</h3>
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
                <!--<span>-->
                    <!--我的余额-->
                <!--</span>-->
                <ul v-if="userInfo">
                    <li class="pop-mydhj" v-tap="{methods: jumpTodhj }">
                        获取兑换券
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

                clickImgGood: false,

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
                selectBoxHide:false,
            }
        },
        watch: {
            luckMessData (data) {
                if (this.clickImgGood) {
                    this.$router.push('/luckdraw')
                }
            },
        },
        components: {
            BannerScroll,
            PublicHead
        },
        methods: {
            closeAlert () {
                this.alertGoodsBox = false
            },
            initState(){
                this.$store.state.showDrawTap = false;
            },
            closeshowResult(){
                this.showResult = false;
                this.$store.state.showGotoMainList = true ;
            },
            showResultFn(){
                this.$store.commit( 'showPopGiftSu' , false );

                // 初始化 实物收货按钮
                this.$store.state.confirmAddrBtn = false;

                //  新增列表请求
                this.$store.dispatch('getWinGoodList');

                this.showResult = true;
            },
            goLuckGiftCopy ({item}) {
                setTimeout(() => {
                    this.$store.dispatch('getGoodsList');
                    // 关闭信息页
                    this.closedhjMsg();
                }, 200);
                if (this.userInfo && this.userInfo.uid !== '0') {
                    this.$store.dispatch('getGoodBingoNew', this.goodsTypeNew );
                } else {
                    this.$store.dispatch('showToast','请刷新再试一下');
                }
            },
            closeGiftBox(){
                this.$store.commit('setbingoPrize' , {
                    isShow: false,
                    number: 0 ,
                    type: 'golds'
                } );
                this.$store.dispatch('getUserInfo');
            },
            alertdhjMess({params}){
                //11
                // console.log( params ) ;

                if (this.userInfo) {
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
                }else{
                    this.$store.dispatch('doAuth')
                }

            },
            closePopGiftSu(){
                this.$store.commit( 'showPopGiftSu' , false )
            },
            closedhjMsg(){
                this.dhjMsg.showMsg = false;
            },
            closeCoinLess(){
                this.dhjMsg.showCoinLess = false ;
            },
            jumpTodhj(){
                //  跳转获取页
                this.dhjMsg.showMsg = false;
                this.dhjMsg.lotteryDhj = true ;

                //  处理tab 切换
                this.isShowMyMess = false ;

                // 隐藏 领奖页

                this.selectBoxHide = true;
            },
            backToDraw(){
                this.dhjMsg.lotteryDhj = false ;
                this.selectBoxHide = false;

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
                if( parseInt( this.userInfo.gold_total ) < 60000 ){
                    this.dhjMsg.showCoinLess = true ;
                    return false;
                }
                this.$store.dispatch( 'luckDrawGo' , params )
            },

            //////////
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
                // old
                this.alertGoodsBox = true
                this.alertGoodsData = params
        /* 请求商品信息 */
//                this.$store.dispatch('getGotoLuckMess', params)
            },
            closeGoodsMess () {
                /* 关闭抽奖提示花费窗口 */
                this.alertGoodsBox = false
                this.alertGoodsData = null
            },
//            showLuckEndFn () {
//                /* 中奖框 */
//                if (this.luckMessData) {
//                    if (this.luckMessData.company) {
//                        this.$store.dispatch('getLuckGoodBingo', {
//                            currGoodsid: this.luckMessData.goodsid,
//                            currConsumgolds: this.luckMessData.consumgolds,
//                            goodstype: this.luckMessData.goodstype,
//                            company: this.luckMessData.company
//                        })
//                    } else {
//                        this.$store.dispatch('getLuckGoodBingo', {
//                            currGoodsid: this.luckMessData.goodsid,
//                            currConsumgolds: this.luckMessData.consumgolds,
//                            goodstype: this.luckMessData.goodstype
//                        })
//                    }
//                } else {
//                    this.$store.dispatch('showToast', '抽取失败,请重新再试')
//                    this.alertGoodsBox = false
//                }
//            },
            closeLuckEnd () {
                /* 关闭中奖窗口 */
                this.$store.commit( 'showPopGiftSu' , false );
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
                console.log( param )
                switch (item) {
                case 'goAddressPage':
                    console.log('+++++++++')
                    console.log(param)
//                        /* 商品id  两个接口是否合成一个接口 ？？ */
                    if (param && param.oid) {
                        this.$router.push(`/shopAdd/${param.oid}`)
                    }
                    break
                case 'showWuliu':
                    let orderNum = param.sid
                    this.currentLogistic = param
                    if (!orderNum) {
                        orderNum = 0;
                        console.log('无订单号')
                        this.$store.commit('setLogisticMess', 0);
//                        this.showLogisticTap = true
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
                this.isShowCopyBox = true;
                console.log( e.text );
                if (e.text) {
                    this.copyValue = e.text
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
                    this.$store.commit( 'showPopGiftSu' , false );
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
                    this.$router.push('/chargeNew/draw');
                    this.$store.dispatch('getGoodsList');
                    if (this.userInfo) {
                        this.$store.dispatch('getWinGoodList')
                    }
                    _hmt.push(['_trackEvent', 'off_商城页兑换点击', 'click', 'off_商城页兑换'])
                } else {
                    this.$router.push('/chargeNew');
                    _hmt.push(['_trackEvent', 'off_商城页充值点击', 'click', 'off_商城页充值'])
                }
                this.dhjMsg.lotteryDhj = false ;

                this.isShowChargeTab = params;
                this.selectBoxHide = false;
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
            this.$store.dispatch('getChargeList');
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
            }else{
                this.dhjMsg.lotteryDhj = false ;
            }
            // 跳转 drawList
            setTimeout(()=>{
                if (~location.hash.indexOf('@@_@')) {
                    this.showPrizeList({ params:true });
                    history.replaceState({}, '', `${location.href.split(location.pathname)[0]}${location.pathname}#/chargeNew/draw`)
                }
            },0) ;

            if (this.$route.params.others && this.$route.params.others === 'showList') {
                stopHtml();
                this.isShowChargeTab = false;
                this.$store.dispatch('getGoodsList');
                this.$store.commit( 'showPopGiftSu' , false );
                this.isShowPrizeList = true;
                if (this.userInfo) {
                    /* 可优化 */
                    this.$store.dispatch('getWinGoodList')
                }
            }
            if (!isWeiX) {
                if (this.$route.params.others && this.$route.params.others.indexOf('_@_ck_@_') > -1) {
                    let arr = this.$route.params.others.split('_@_');
                    if (arr[0] === '2') {
                        this.$store.dispatch('showToast', '充值成功');
                        history.replaceState({}, '', `${location.href.split(location.pathname)[0]}${location.pathname}#/chargeNew`)
                    } else if (arr[0] === '1') {
                        this.$store.dispatch('showToast', '支付未完成，请重试');
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
