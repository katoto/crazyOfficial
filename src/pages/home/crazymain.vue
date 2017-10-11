<template>
    <div class="respon2-itm">
        <div class="full-scroll">
            <!-- 直播头部 components -->
            <matchHot-play :matchData="matchHotData"></matchHot-play>

            <!-- 滚动  components-->
            <banner-scroll v-if="crazymainScrollData" class="notice">
                <div class="text-scroller">
                    <ul class="scroller-in">
                        <li v-for="ban in crazymainScrollData" v-html="ban"></li>
                    </ul>
                </div>
            </banner-scroll>

            <!--活动-->
            <section class="act" v-if="homeActivitiesData && homeActivitiesData.length>=2">
                <!--<div class="act-wrap hide">-->
                    <!--<a href="javascript:;" class="act-center" v-tap="{ methods:matchNav ,params:'chargeNew'}">-->
                        <!--<img :src="homeActivitiesData[0].image" alt="最新活动">-->
                    <!--</a>-->
                    <!--<a href="javascript:;" class="act-new"  v-tap="{ methods:matchNav ,params:'activeBox'}">-->
                        <!--<img :src="homeActivitiesData[1].image" alt="最新活动">-->
                    <!--</a>-->
                    <!--<a href="javascript:;" class="act-down" v-if="homeActivitiesData[2]" v-tap="{ methods:matchNav ,params:'downLoad'}">-->
                        <!--<img :src="homeActivitiesData[2].image" alt="下载">-->
                    <!--</a>-->
                <!--</div>-->

                <swiper class="left" :options="swiperOption"  ref="mySwiper">
                        <swiper-slide  v-tap="{ methods:matchNav ,params:'chargeNew'}">
                            <a href="javascript:;" class=" act-center">
                                <img :src="homeActivitiesData[0].image" alt="下载">
                            </a>
                        </swiper-slide>
                        <swiper-slide v-tap="{ methods:matchNav ,params:'downLoad'}">
                            <a v-if="homeActivitiesData[2]" href="javascript:;" class=" act-center">
                                <img :src="homeActivitiesData[2].image" alt="领奖中心">
                            </a>
                        </swiper-slide>
                </swiper>
                <div class="right" v-tap="{ methods:matchNav ,params:'activeBox'}">
                    <a href="javascript:;" class="act-down">
                        <img :src="homeActivitiesData[1].image" alt="最新活动">
                    </a>
                </div>

            </section>

            <!-- 比赛列表 -->
            <!-- 比赛列表 -->
            <section class="index listWrap">
                <header class="listWrap_tit clear">
                    <span class="hot-match">热门赛事</span>
                    <a class="list_all" v-if="runListNumber==='0'" href="javascript:;" v-tap="{ methods:matchNav ,params:'goMatchList'}">全部赛事(<i style="color: #fff" v-if="runListNumber==='0'"> {{ betListNumber}} </i>)</a>
                    <a class="list_all" v-else href="javascript:;" v-tap="{ methods:matchNav ,params:'goMatchList'}">全部赛事(<i> {{ runListNumber}} </i>)</a>
                </header>
                <!--<router-view></router-view>-->

                <div class="listBox">
                    <template  v-if="matchlist_hot && parseInt(matchlist_hot.length)>1" v-for="item in matchlist_hot">
                        <matchListTemplate :matchStyle="'hot'" :matchData="item">
                        </matchListTemplate>
                    </template>
                    <template v-if="!matchlist_hot || (matchlist_hot && matchlist_hot.length<=1) ">
                        <div class="emptyBox respon2">
                            <div class="empty respon2-itm" >
                                <div class="emptyIn">
                                    <span class="icon icon_empty"></span>
                                    <p>暂无热门赛事</p>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>


                <a href="javascript:;" class="all-list" v-tap="{ methods:matchNav ,params:'goMatchList'}">
                    查看全部赛事
                </a>
            </section>

        </div>
    </div>
</template>
<script>
    import {actionTypes, mutationTypes} from '~store/home'
    import BannerScroll from '~components/banner-scroll.vue'
    import MatchHotPlay from '~components/matchHot-play.vue'

    import MatchListTemplate from '~components/matchlist-template.vue'
    import  { swiper, swiperSlide } from 'vue-awesome-swiper'
    import {platform} from '~common/util'

    export default {
        data () {
            return {
                current: null,
                inFlash: false, // 右下角闪动提示
                flashMsg: '', // 右下角闪动提示
                allPage: 0,  // 按钮状态
                currentTap: 'hot',  //  tap 选中样式
                swiperOption: {
                    // swiper options 所有的配置同swiper官方api配置
                    autoplay: 3000,
                    direction: 'vertical',
                    autoHeight: true,
                    onTransitionStart (swiper) {
//                        console.log(swiper)
                    }
                }
            }
        },
        components: {
            BannerScroll,
            MatchHotPlay,
            MatchListTemplate
        },
        watch: {
            socketData (data) {
                Object.assign(data, {'matchStyle': 'newhot'})
                this.$store.dispatch(actionTypes.sockDataFn, data)
            },
            matchIDStr (matchIDStr, oldMatchIdStr) {
                oldMatchIdStr && this.$store.dispatch('unsubscribe', {
                    ptype: 'list',
                    body: oldMatchIdStr
                })
                this.$store.dispatch('subscribe', {
                    ptype: 'list',
                    body: matchIDStr
                })
            },
            ck (ck) {
                if (!this.signList && this.userInfo) {
                    this.$store.dispatch(actionTypes.getSignList)
                }
                //  未登录不弹
                if (this.isSign && this.userInfo) {
                    if (!this.signList) {
                        this.$store.dispatch(actionTypes.getSignList)
                        this.$store.commit(mutationTypes.showSignbox, true)
                    } else {
                        this.$store.commit(mutationTypes.showSignbox, true)
                    }
                }
            }
        },
        methods: {
            matchNav ({params}) {
                // 热门赛事  直播中 全部赛事
                this.$store.commit(mutationTypes.currentBetSelect, null) ; // 切换隐藏投注框
                switch (params) {
                case 'hot':
                    _hmt.push(['_trackEvent', '500fkcqH5_首页热门赛事点击', 'click', '500fkcqH5_首页热门赛事']);
                    this.currentTap = params;
                    this.$router.replace(`/h5/home/${params}/`);
                    break;
                case 'goMatchList':
                    _hmt.push(['_trackEvent', '500fkcqH5_首页全部赛事点击', 'click', '500fkcqH5_首页全部赛事']);
                    this.$router.push(`/h5/matchList/noEnd`);
                    break;
                case 'tips':
                    this.$store.dispatch('showToast', '暂无直播赛事~');
                    break;
                case 'chargeNew':
                    this.$router.push(`/chargeNew/draw`);
                    _hmt.push(['_trackEvent', '500fkcqH5_领奖中心点击', 'click', '500fkcqH5_领奖中心']);
                    break;
                case 'activeBox':
                    if(this.activityListData){
                        this.$store.commit('setActiveBox', true)
                        _hmt.push(['_trackEvent', '500fkcqH5_最新活动点击', 'click', '500fkcqH5_最新活动']);
                    }else{
                        this.$store.dispatch(actionTypes.getActivityList)
                    }
                    break;
                case 'downLoad':
                    if (platform === 'android') {
                        window.location.href = 'http://download.choopaoo.com/download/cbet_for_Android_500cpH5.apk'
                    } else {
                        window.location.href = 'https://at.umeng.com/uKrSPn?cid=481'
                    }
                    _hmt.push(['_trackEvent', '500fkcqH5_下载app点击', 'click', '500fkcqH5_下载app']);
                    break;

                }
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            },
            activityListData () {
                return this.$store.state.home.activityListData
            },
            matchlist_hot () {
                return this.$store.state.home.matchList_hot
            },
            homeActivitiesData () {
                return this.$store.state.home.homeActivitiesData
            },
            socketData () {
                return this.$store.state.socket.data
            },
            runListNumber () {
                return this.$store.state.home.runListNumber
            },
            betListNumber () {
                return this.$store.state.home.betListNumber
            },
            userInfo () {
                return this.$store.state.userInfo
            },
            ck () {
                return this.$store.state.ck
            },
            crazymainScrollData () {
                return this.$store.state.home.crazymainScrollData
            },
            matchHotData () {
                return this.$store.state.home.matchHotData
            },
            rankList () {
                return this.$store.state.home.rankList
            },
            signList () {
                return this.$store.state.home.signList
            },
            isSign () {
                let isSign = false ; // false 是否有未签到的
                this.signList && this.signList.forEach((item) => {
                    if (item.sign === '0') {
                        isSign = true
                    }
                });
                return isSign
            },
            matchlist_hot () {
                return this.$store.state.home.matchList_hot
            },
            matchIDStr () {
                let matchIDStr = '';
                if (this.matchlist_hot) {
                    for (let i = 0, len = this.matchlist_hot.length; i < len; i++) {
                        matchIDStr += this.matchlist_hot[i].MatchID + '|'
                    }
                }
                return matchIDStr
            }
        },
        async mounted () {
            if (this.matchIDStr) {
                this.$store.dispatch('subscribe', {
                    ptype: 'list',
                    body: this.matchIDStr
                })
            }
            this.$store.dispatch(actionTypes.getFootballMatchList, 'newhot');

        //  未登录不弹
            await this.$store.dispatch(actionTypes.getSignList);
            if (this.isSign && this.userInfo) {
                this.$store.commit(mutationTypes.showSignbox, true)
            }
            //  滚动数据  滚动参数
            if (!this.crazymainScrollData) {
                this.$store.dispatch(actionTypes.getcrazyMainInfo)
            }
            this.$store.dispatch(actionTypes.setIntervalFn, {type: 'newhot', time: 30000});
            this.$store.dispatch(actionTypes.getActivityList)
        },
        beforeRouteLeave (to, from, next) {
            this.$store.dispatch(actionTypes.clearIntervalFn);
//            取消订阅
            this.$store.dispatch('unsubscribe', {
                ptype: 'list',
                body: this.matchIDStr
            });
            next()
        }
    }
</script>
<style>
</style>
