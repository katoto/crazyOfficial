<template>
    <div id="app">
        <!--  头部用户信息公用   listWrap-pb  -->
        <div class="index wrap respon2">
            <PublicHead  v-if="!isHideHomeHead" person-title="疯狂猜球-猜足球赢豪礼"></PublicHead>
            <HeaderTemplateHome v-if="!isHideHomeHead"></HeaderTemplateHome>
            <router-view></router-view>
        </div>
        <!-- 排行版 hide-->
        <div class="pop pop01 pop_phb" :class="{'hide':!showRankbox}">
            <div class="pop_layer"  v-tap="{ methods:closeRankList}"></div>
            <div class="popIn">
                <div class="popTit">
                    <h2 class="title">排行榜</h2>
                </div>
                <span class="close" v-tap="{ methods:closeRankList}">
                        <span></span>
                </span>
                <ul class="btn_tab" :class="{'tab2':isrankRule}" v-tap="{ methods:showRankRule,tab:!isrankRule}">
                    <li class="cur"><span>榜单</span></li>
                    <li><span >规则</span></li>
                </ul>
                <div class="box" :class="{'box2':isrankRule}" v-if="rankList">
                    <div class="phb_box" :class="{'phb_box2':this.showRankType==='lastWeek'}">
                        <ul class="list_menu clear">
                            <li v-tap="{ methods:changeRankTab,tapName:'thisWeek'}" :class="{'cur':this.showRankType==='thisWeek'}">本周盈利</li>
                            <li v-tap="{ methods:changeRankTab,tapName:'lastWeek'}":class="{'cur':this.showRankType==='lastWeek'}">上周奖励</li>
                        </ul>
                        <div class="phb_list phb_list_bz" v-if="rankList.prizerank">
                            <ul class="scroller" v-if="parseInt(rankList.prizerank.list.length)>0">
                                <li v-for="item in rankList.prizerank.list">
                                    <i class="num num_1" v-if="item.rank==='1'">{{ item.rank }}</i>
                                    <i class="num num_2" v-if="item.rank==='2'">{{ item.rank }}</i>
                                    <i class="num num_3" v-if="item.rank==='3'">{{ item.rank }}</i>
                                    <i class="num" v-if="item.rank!='3'&&item.rank!='2'&&item.rank!='1'">{{ item.rank }}</i>
                                    <span class="face">
                                <img :src="item.photo" @error="imgOnError">
                            </span>
                                    <span class="name" >{{ item.username }}</span>
                                    <span class="money">
                                <i class="icon icon_jinbi"></i>{{ item.golds |format }}
                            </span>
                                </li>
                                <li v-if="userinfo">&nbsp;</li>
                            </ul>
                            <div class="scroller" v-if="parseInt(rankList.prizerank.list.length)===0">
                                <img src="~static/images/empty_Mess.png" class="phbNoList_hc">
                                <p class="phbNoList_p_hc">暂无记录~</p>
                            </div>
                            <ul class="phb_list_me"  v-if="userinfo">
                                <li v-if="userinfo && rankList ">
                                    <i class="num num_100" style="visibility: visible !important;" v-if="+rankList.prizerank.rank <= 100">{{  rankList.prizerank.rank }}</i>
                                    <em class="num_me" v-else>100+</em>
                                    <i class="num" v-if="+rankList.prizerank.rank > 100"></i>
                                    <span class="face" v-if="userinfo">
                                        <img :src="userinfo.photo" @error="imgOnError">
                                    </span>
                                    <span class="name" v-if="userinfo">{{ userinfo.username }}</span>
                                    <span class="money">
                                        <i class="icon icon_jinbi"></i>{{ rankList.selfrank.golds |format  }}
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div class="phb_list phb_list_sz" v-if="rankList.lastweekprizerank">
                            <ul class="scroller" v-if="parseInt(rankList.lastweekprizerank.list.length)>0">
                                <li v-for="weekrank in rankList.lastweekprizerank.list">
                                    <i class="num num_1" v-if="weekrank.rank==='1'">{{ weekrank.rank }}</i>
                                    <i class="num num_2" v-if="weekrank.rank==='2'">{{ weekrank.rank }}</i>
                                    <i class="num num_3" v-if="weekrank.rank==='3'">{{ weekrank.rank }}</i>
                                    <i class="num" v-if="weekrank.rank!='3'&&weekrank.rank!='2'&&weekrank.rank!='1'">{{ weekrank.rank }}</i>
                                    <span class="face">
                                        <img :src="weekrank.photo" @error="imgOnError">
                                    </span>
                                    <span class="name" >{{ weekrank.username }}
                                        <em>{{ weekrank.golds |format }}</em>
                                    </span>
                                    <span class="money2">
                                        <i class="icon_jinbi2"></i>奖{{weekrank.amount |format }}
                                    </span>
                                </li>
                                <li v-if="userinfo">&nbsp;</li>
                            </ul>
                            <div class="scroller" v-if="parseInt(rankList.lastweekprizerank.list.length)===0">
                                <img src="~static/images/empty_Mess.png" class="phbNoList_hc">
                                <p class="phbNoList_p_hc">暂无记录~</p>
                            </div>
                            <ul class="phb_list_me" v-if="userinfo">
                                <li v-if="rankList.selflastweek">
                                    <em class="num_me" v-if="Object.keys(rankList.selflastweek).length<=0">榜外</em>
                                    <i class="num num_100" style="visibility: visible !important;" v-if="Object.keys(rankList.selflastweek).length>0">{{rankList.selflastweek.rank}}</i>
                                    <i class="num" v-if="Object.keys(rankList.selflastweek).length<=0"></i>
                                    <span class="face" v-if="userinfo">
                                        <img :src="userinfo.photo" @error="imgOnError">
                                    </span>
                                    <span class="name" v-if="userinfo">{{ userinfo.username }}
                                        <em v-if="Object.keys(rankList.selflastweek).length>0">{{rankList.selflastweek.golds |format}}</em>
                                        <em v-else>-</em>
                                    </span>
                                    <span class="money2">
                                        <i class="icon_jinbi2" v-if="Object.keys(rankList.selflastweek).length>0"></i><label
                                            v-if="Object.keys(rankList.selflastweek).length>0" >奖{{rankList.selflastweek.amount |format}}</label>
                                        <em class="empty"v-if="Object.keys(rankList.selflastweek).length<=0">-</em>
                                    </span>
                                </li>
                            </ul>
                        </div>

                    </div>
                    <div class="phb_rule">
                        <div class="rule">
                            <dl>
                                <dt>盈利榜：</dt>
                                <dd> 1. 计算每周一08:00至下周一08:00时间内结算的订单，以结算的具体时间为准； </dd>
                                <dd>2. 统计时间内，按照盈利猜球币数排名，前十名可获得奖励； </dd>
                                <dd>3. 每周一08:00之后自动结算派发上周排行榜奖励； </dd>
                                <dd>4. 排名信息每周更新一次； </dd>
                            </dl>
                            <dl>
                                <dt>
                                    兑奖榜： </dt>
                                <dd>1. 按照每月玩家最高价值兑奖奖品排名；</dd>
                                <dd> 2. 排名信息每月更新一次； </dd>
                            </dl>
                            <dl>
                                <dt>注意事项：</dt>
                                <dd> 1. 凡参与竞猜应用，即视为同意本应用规则及免责声明条款； </dd>
                                <dd>2. 使用任何作弊行为获利的用户，将取消上榜奖励，追回违规所得，且平台保留追究法律责任的权利； </dd>
                                <dd>3. 本活动规则解释权归《疯狂猜球》所有。</dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <img src="~static/images/loading.gif" alt="" style="margin: 0.9rem auto;display: block;width: 0.4rem;height: 0.4rem">
                </div>
            </div>
        </div>

        <!-- 每日签到  每次请求   -->
        <div class="pop pop01 pop_mrrw" :class="{'hide':!showSignbox}">
            <div class="pop_layer"  v-tap="{ methods:closeSignList}"></div>
            <div class="popIn sign_xunlei">
                <span class="close"  v-tap="{ methods:closeSignList}">
                    <span></span>
                </span>
                <div class="popTit">
                    <h2 class="title"></h2>
                </div>
                <div class="sign">
                    <ul class="sign_day" v-if="signList && signList.length>0">
                        <li class="item " :class="{'have_sign':item.sign==='1','cur':item.sign==='0'}" v-for="item in signList">
                            <span class="day_num">第{{ item.idx }}天</span>
                            <i class="icon icon_jinbi3" v-if="Number(item.idx)<=2"></i>
                            <i class="icon icon_jinbi2" v-if="Number(item.idx)<=4 && Number(item.idx)>2"></i>
                            <i class="icon icon_jinbi4" v-if="Number(item.idx)<=6 && Number(item.idx)>4"></i>
                            <i class="icon icon_jinbi5" v-if="item.idx==='7'"></i>
                            <div class="day_money" v-if="item.idx==='7'"><em>{{ item.item }}</em></div>
                            <div class="day_money" v-else><em>{{ item.item }}</em>猜球币</div>
                        </li>
                    </ul>
                    <ul v-else>
                        <p style="height:1.4rem;font-size: 0.14rem">暂无签到列表~</p>
                    </ul>
                    <span class="btn_sign" v-if="isSign==='0'" v-tap="{ methods:marketSignFn,idx:currentIdx }" key="1">领取</span>
                    <span class="btn_sign gray_hc" v-if="isSign==='1'" key="0">已领取</span>
                </div>
            </div>
        </div>

        <!-- 签到成功金币展现   -->
        <div class="pop pop_jinbi" :class="{'hide':!showJinbi.isShow}" >
            <div class="pop_layer"></div>
            <div class="popIn">
                <div class="light"></div>
                <div class="info">
                    <p style="padding: 10px 0">{{ showJinbi.coinTitle }}</p>
                    <i class="icon icon_jinbi3"></i>
                    <strong>+{{ showJinbi.coinNumber | format }} 猜球币</strong>
                    <p>猜球币可用于抽奖或竞猜！</p>
                </div>
            </div>
        </div>

        <!-- 消息弹窗  -->
        <MsgAlert v-if="showMessbox"></MsgAlert>

        <!-- 猜球记录 弹窗  -->
        <BetListAlert v-if="showBetListbox"></BetListAlert>

        <!-- 嘉奖 弹窗  -->
        <AwardAlert v-if="showAwardbox"></AwardAlert>

        <!-- 玩法说明弹窗 -->
        <HelpAlert v-if="showHelpbox"></HelpAlert>

        <!-- 吐槽弹窗 new -->
        <div class="pop pop-opinion" :class="{'hide':!showOption}">
            <div class="pop_layer" v-tap="{ methods:closeOption}"></div>
            <div class="pop-o">
            <span class="close" v-tap="{ methods:closeOption}">
                <span class="sprite"></span>
            </span>
                <h2>来吐槽吧</h2>
                <span>通过微信公众号反馈您的问题</span>
                <div>
                    <img src="~static/images/img-public.png" alt="疯狂猜球服务号">
                    <h3>微信搜索<i> 疯狂猜球服务号</i></h3>
                </div>
            </div>
        </div>

        <!-- 头像下拉框信息 -->
        <div class="pop pop-myself" :class="{'hide':!headParentBox_headbox}">
            <div class="pop_layer" key="event" v-tap="{ methods:closeHeadBox}"></div>
            <div class="pop-user" v-if="userinfo">
                <ul>
                    <li class="my-msg" v-tap="{methods:enterMy,params:'personCenter'}">
                        <img :src="userinfo.photo" @error="imgOnError" alt="用户头像">
                        <div>
                            <span class="user-name">{{userinfo.username}}</span>
                            <span class="user-id">
                                <i>ID:</i>
                                {{userinfo.uid}}
                            </span>
                        </div>
                        <a href="javascript:;" v-if="isSign==='0'" v-tap="{methods:showSignList}" class="check uncheck"></a>
                        <a href="javascript:;" v-tap="{methods:showSignList}" v-else class="check checked"></a>

                    </li>
                    <li class="my-news" v-tap="{methods:enterMy,params:'message'}">
                        <i></i>我的消息
                        <sup class="dot" v-if="(userinfo.notifies!='0') || ( userinfo.prize_records!='0')"></sup>
                    </li>
                    <li class="my-de" v-tap="{methods:enterMy,params:'goHelp'}">
                        <i></i>玩法说明
                    </li>
                    <li class="my-fb" v-tap="{methods:enterMy,params:'option'}">
                        <i></i>我要反馈
                        <sup class="dot" v-if="( userinfo.fb_badge && parseInt(userinfo.fb_badge)>0 )"></sup>
                    </li>
                    <li class="my-down" v-tap="{methods:enterMy,params:'crazyPage'}" v-if="!isHideDownLoad">
                        <i></i>下载APP
                        <sup class="dot"></sup>
                        <span class="jj5"></span>
                    </li>
                </ul>
            </div>
        </div>

        <!--新手引导弹窗  显示逻辑 -->
        <div class="pop pop-begin" v-if="showNewUserBox">
            <div class="pop_layer"></div>
            <div class="popbegin-in popbegin-in1" v-if="showNewUserImg1">
                <h3>不卖肾怎么换到iPhone x？</h3>
                <img src="~static/images/popbegin-img1.png">
                <div class="popbegin-p">
                    <p>海量猜球币每日领</p>
                </div>
                <a href="javascript:;" v-tap="{ 'methods':newUserGuide,params:'img2' }">有钱了，然后呢？</a>
            </div>
            <div class="popbegin-in popbegin-in2" v-if="showNewUserImg2">
                <h3>不卖肾怎么换到iPhone x？</h3>
                <img src="~static/images/popbegin-img2.png">
                <p></p>
                <div class="popbegin-p">
                    <p>找到一场稳胆投他个十万八万<br>或者博单比分，单车变摩托</p>
                </div>
                <a href="javascript:;"  v-tap="{ 'methods':newUserGuide,params:'img3' }">发财了，我要领奖</a>
            </div>
            <div class="popbegin-in popbegin-in3" v-if="showNewUserImg3">
                <h3>不卖肾怎么换到iPhone x？</h3>
                <img src="~static/images/popbegin-img3.png">
                <div class="popbegin-p">
                    <p>来吧，完成这个小目标<br>还有充值卡，金条任性兑</p>
                </div>
                <a href="javascript:;" v-tap="{ 'methods':newUserGuide,params:'close' }">iPhone X，我来了</a>
            </div>
        </div>

        <!--活动弹窗-->
        <div class="pop pop01 pop-act" :class="{'hide':!showActBox}">
            <div class="pop_layer" v-tap="{ methods:closeActBox}">
            </div>
            <div class="popIn">
            <span class="close"  v-tap="{ methods:closeActBox}">
                <span></span>
            </span>
                <div class="popTit">
                    <h2>活动中心</h2>
                </div>
                <div class="box">
                    <span class="popact-left"></span>
                    <span class="popact-right"></span>
                    <ul class="popact-t">
                        <li v-for="item in activityListData" :class="{
                        'popact-hot':item.show_hot==='1',
                        'popact-new':item.is_click==='0',
                        'pop-double':item.title.length >= 9,
                        'on':item.number === activeCurrOn,
                        }"
                            v-tap="{ methods:activityFn,params:item }"
                        >
                            <span>
                                {{ item.title }}
                            </span>
                        </li>
                    </ul>
                    <ul class="popact-c">
                        <li  v-tap="{ methods:activityJumpFn,params:activeCurrLink}"><a href="javascript:;"><img :src="activeCurrImg"></a></li>
                    </ul>
                </div>
            </div>
        </div>
        <!--  底部选项 -->

        <!-- 五大联赛 -->
        <!--<div >-->
            <!--<a href="javascript:;" class="enter-actEgert" v-tap="{ methods:jumpToRedCenter}">-->
                <!--&lt;!&ndash;<img src="http://img.choopaoo.com/esun/upload/0d/7e/0d7e829aca9911e7b71e.png">&ndash;&gt;-->
                <!--<img src="~static/images/enter-actEgert.png">-->
            <!--</a>-->
        <!--</div>-->
        <div class="enter-actEgert hide" v-tap="{ methods:jumpToRedCenter}">
            <img src="~static/images/enter-actEgert.png" alt="">
        </div>
        <send-order></send-order>
    </div>
</template>

<script>
    import SendOrder from '~components/send-order.vue'
    import { actionTypes, mutationTypes } from '~store/home'
    import { starHtml, stopHtml, platform , src } from '~common/util'
    import HeaderTemplateHome from '~components/header_template_home.vue'
    import MsgAlert from '~components/msg-alert.vue'
    import PublicHead from '~components/publicHead'
    import HelpAlert from '~components/help-alert'

    import BetListAlert from '~components/betList-alert.vue'
    import AwardAlert from '~components/award-alert.vue'

    export default {
        data () {
            return {
                isHideDownLoad:false,
                showRankType: 'thisWeek',
                isrankRule: false,  // 显示榜单规则
                showOption: false,  // 反馈
                activeCurrOn: '',   // 活动中心curr
                activeCurrImg: '',  // 活动中心img
                activeCurrLink: '',  // 活动中心img link
                showNewUserImg1: true,
                showNewUserImg2: false,
                showNewUserImg3: false,
                showNewUserBox: false
            }
        },
        methods: {
            jumpToRedCenter () {
                var ck = ''
                if (this.ck) {
                    ck = this.ck.replace(/=/g, '$')
                } else {
                    this.$store.dispatch('doAuth');
                    return false
                }
                /* 带上参数 ！！ */
//                window.location.href = 'http://crazybet.choopaoo.com/2017/thanksgive?from='+src()+'&h5ck='+ck;
                if( this.userinfo && this.userinfo.uid ){
                    window.location.href = 'http://crazybet.choopaoo.com/2017/actEgert/index.html?src='+src()+'&ck='+ck +'&uid='+this.userinfo.uid ;
                }else{
                    window.location.href = 'http://crazybet.choopaoo.com/2017/actEgert/index.html?src='+src()+'&ck='+ck;
                }

            },
            activityJumpFn ({ params }) {
                if( !this.ck ){
                    this.$store.dispatch('doAuth');
                    return false
                }
                location.href = params
            },
            newUserGuide ({ params }) {
                /* 新手引导 */
                switch (params) {
                case 'img2':
                    this.showNewUserImg1 = false
                    this.showNewUserImg2 = true
                    this.showNewUserImg3 = false
                            ;break
                case 'img3':
                    this.showNewUserImg1 = false
                    this.showNewUserImg2 = false
                    this.showNewUserImg3 = true
                    break
                default:
                    this.showNewUserBox = false
                    /* 弹出 + 888 */
                    this.$store.dispatch(actionTypes.showJinbiBox, {isShow: true, golds: 888, coinTitle: '首次登录奖励'})
                    this.$store.dispatch('getUserInfo')
                }
            },
            activityFn ({ params }) {
                this.activeCurrOn = params.number
                this.activeCurrImg = params.photo_url
                this.activeCurrLink = params.link
            /* 请求清楚小红点 */
                if (params.is_click === '0') {
                    this.$store.dispatch(actionTypes.clearActivityHot, params.number)
                    if (this.activityListData && this.activityListData.length > 0) {
                        for (let i = 0, len = this.activityListData.length; i < len; i++) {
                            if (this.activityListData[i].number === params.number) {
                                this.$store.state.home.activityListData[i].is_click = 1
                                break
                            }
                        }
                    }
                }
            },
            closeOption () {
                starHtml()
                this.showOption = false
            },
            closeActBox () {
                starHtml()
                this.$store.commit('setActiveBox', false)
            },
            closeHeadBox () {
                starHtml()
                this.$store.commit('showHeadBox', false)
            },
            closeSignList () {
                starHtml()
                this.$store.commit(mutationTypes.showSignbox, false)
            },
            showSignList () {
                stopHtml()
                this.$store.commit(mutationTypes.showSignbox, true)
            },
            closeRankList () {
                starHtml()
                this.isrankRule = false
                this.$store.commit(mutationTypes.showRankbox, false)
                this.showRankType = 'thisWeek'
            },
            changeRankTab ({tapName}) {
                this.showRankType = tapName
            },
            marketSignFn ({idx}) {
                if (idx === '-1') {
                    return false
                }
                this.$store.dispatch(actionTypes.marketSign, idx)
            },
            imgOnError (that) {
                that.target.setAttribute('src', 'http://img.choopaoo.com/esun/upload/be/83/be837ad8049611e797ef.png')
            },
            showRankRule ({tab}) {
                this.isrankRule = tab
            },
            enterMy ({params}) {
                switch (params) {
                case 'message':
                    this.$store.dispatch('getMessageList')
                    stopHtml()
                    this.$store.state.msgAllData.messPageNum = 1
                    this.$store.commit('showMessbox', true)
                    setTimeout(() => {
                        document.querySelector('.message').scrollTop = 0
                    }, 11)
                    _hmt.push(['_trackEvent', 'off_我的消息点击', 'click', 'off_我的消息'])
                    break
                case 'option':
                    this.$router.push('/fb_upload')
                    _hmt.push(['_trackEvent', 'off_我要反馈点击', 'click', 'off_我要反馈'])
                    break
                case 'crazyPage':
                    if (platform === 'android') {
                        window.location.href = 'http://download.choopaoo.com/download/cbet_for_Android_500cpH5.apk'
                    } else {
                        window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.crazy500.cbet&ckey=CK1379012021813'
                    }
                    _hmt.push(['_trackEvent', 'off_下载app(头像内)点击', 'click', 'off_下载app'])
                    break
                case 'goHelp':
                    _hmt.push(['_trackEvent', 'off_玩法说明点击', 'click', 'off_玩法说明'])
                    this.$store.commit('showHelpbox', true)
                    break
                case 'personCenter':
                    _hmt.push(['_trackEvent', 'off_玩法说明点击', 'click', 'off_玩法说明'])
                    this.$router.push('/personCenter')
                    break
                }
            }
        },
        watch: {
            '$store.state.home.rankList.isprize': function (isprize) {
                // 处理上周排行榜奖励
                if (isprize === '1' && this.rankList && this.rankList.selflastweek && this.rankList.selflastweek.amount) {
                    this.showRankType = 'lastWeek'
                    this.$store.commit(mutationTypes.showJinbi, {isShow: true, coinNumber: this.rankList.selflastweek.amount, coinTitle: '上周奖励'})
                    setTimeout(() => {
                        this.$store.commit(mutationTypes.showJinbi, {isShow: false, coinNumber: 0, coinTitle: ''})
                    }, 2000)
                }
            }

        },
        computed: {
            activityListData () {
                if (this.$store.state.home.activityListData && this.$store.state.home.activityListData.length > 0) {
                    this.activeCurrOn = this.$store.state.home.activityListData[0].number
                    this.activeCurrImg = this.$store.state.home.activityListData[0].photo_url
                    this.activeCurrLink = this.$store.state.home.activityListData[0].link
                }
                return this.$store.state.home.activityListData
            },
            isHideHomeHead () {
                return this.$store.state.isHideHomeHead
            },
            showHelpbox () {
                return this.$store.state.showHelpbox
            },
            userinfo () {
                if (this.$store.state.userInfo && this.$store.state.userInfo.first_login === '1') {
                    /* 引导弹窗  + 888 金币弹窗  */
                    this.showNewUserBox = true
                }
                return this.$store.state.userInfo
            },
            signList () {
                return this.$store.state.home.signList
            },
            rankList () {
                return this.$store.state.home.rankList
            },
            showRankbox () {
                return this.$store.state.home.showRankbox
            },
            showActBox () {
                return this.$store.state.activeBox.showActBox
            },
            showAwardbox () {
                return this.$store.state.awardAllData.showAwardbox
            },
            showMessbox () {
                return this.$store.state.msgAllData.showMessbox
            },
            showBetListbox () {
                return this.$store.state.guessAllData.showBetListbox
            },
            headParentBox_headbox () {
                return this.$store.state.headParentBox.showHeadBox
            },
            showSignbox () {
                return this.$store.state.home.showSignbox
            },
            currentIdx () {
                if (this.signList) {
                    let idx = '-1'
                    this.signList.forEach((item) => {
                        if (item.sign === '0') {
                            idx = item.idx
                            return false
                        }
                    })
                    return idx
                }
            },
            isSign () {
                if (this.signList) {
                    let isSign = '1'  //  1 代表已签到  0，代表未签到
                    this.signList.forEach((item) => {
                        if (item.sign === '0') {
                            isSign = '0'
                            return false
                        }
                    })
                    return isSign
                }
            },
            showJinbi () {
                return this.$store.state.home.showJinbi
            },
            ck () {
                return this.$store.state.ck
            }
        },
        components: {
            SendOrder,
            HeaderTemplateHome,
            MsgAlert,
            BetListAlert,
            AwardAlert,
            PublicHead,
            HelpAlert
        },
        filters: {
            format: (num) => {
                num = Number(num)
                if (isNaN(num)) {
                    return 0
                }
                if (num < 10000) {
                    return num
                } else if (num < 100000000) {
                    return Math.round(num / 10000 * 10) / 10 + '万'
                } else {
                    return Math.round(num / 100000000 * 10) / 10 + '亿'
                }
            }
        },
        mounted () {
            if( src() === 'off-mipan' ){
                this.isHideDownLoad = true;
            }
        }
    }
</script>
<style>
    .enter{
        width: 1.1rem  !important;
        height: 0.92rem !important;
    }
    .enter img{ display: block;width: 100%;height: 100%; }
</style>