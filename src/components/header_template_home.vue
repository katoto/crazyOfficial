<template>
        <div class="header_hc clear" v-if="userInfo">
            <div class="user" :class="{'on':showHeadBox }" v-tap="{methods:enterMy,params:'headParentBox'}">
                <span class="face">
                    <sup class="dot" v-if="(userInfo.notifies!='0') || ( userInfo.prize_records!='0')"></sup>
                </span>
                <span class="face-arrow"></span>
            </div>
            <div class="link" v-tap="{methods:enterMy,params:'betlist'}">
                <span class="link-icon">
                    <sup class="dot" v-if="userInfo && userInfo.newprize && userInfo.newprize !='0'"></sup>
                </span>
            </div>
            <div class="rank" v-tap="{methods:enterMy,params:'rank'}">
                <span class="rank-icon"></span>
            </div>
            <div class="my_moeny">
                <span>{{userInfo.gold_total | format }}</span>
                <a href="javascript:;" class="btn_add" v-tap="{methods:enterMy,params:'charge'}">
                    <span class="my_moeny-icon"></span>
                </a>
            </div>
        </div>

</template>
<script>
    import {stopHtml} from '~common/util'
    import {actionTypes, mutationTypes} from '~store/home'

    export default {
        data () {
            return {
                currentNav: 'noEnd'
            }
        },
        methods: {
            enterMy ({params}) {
                switch (params) {
                case 'betlist':
                    stopHtml()
                    console.log('show betlist')
                    this.$store.dispatch('getGoldList', 0)
                    setTimeout(() => {
                        this.$store.commit('showBetListbox', true)
                        this.$store.dispatch('getUserInfo')
                    }, 10)
                    _hmt.push(['_trackEvent', '500fkcqH5_首页猜球记录点击', 'click', '500fkcqH5_猜球记录']);

                    break
                case 'charge':
                    _hmt.push(['_trackEvent', '500fkcqH5_首页充值点击', 'click', '500fkcqH5_首页充值']);
                    this.$router.push(`/chargeNew`);
                    break
                case 'rank':
                    if (!this.rankList) {
                        this.$store.dispatch(actionTypes.getrankList);
                        setTimeout(() => {
                            this.$store.commit(mutationTypes.showRankbox, true)
                        }, 10)
                    } else {
                        this.$store.commit(mutationTypes.showRankbox, true)
                    }
                    stopHtml()
                    _hmt.push(['_trackEvent', '500fkcqH5_首页猜球记录点击', 'click', '500fkcqH5_首页猜球记录']);
                    break
                case 'headParentBox':
                    if (this.showHeadBox) {
                        this.$store.commit('showHeadBox', false)
                    } else {
                        this.$store.commit('showHeadBox', true)
                    }
                    ;break
                case 'backHistory':
                    window.history.back();
                    break
                case 'backApp':
                    if (window.qqsdApp) {
                            //  关闭view
                        qqsdApp.invoke('close')
                    } else {
                        window.history.back()
                    }
                    ;
                    break
                }
            },
            imgOnError (that) {
                that.target.setAttribute('src', 'http://img.choopaoo.com/esun/upload/be/83/be837ad8049611e797ef.png')
            },
            nav ({params}) {
                this.currentNav = params;
                this.$store.commit(mutationTypes.currentBetSelect, null);  // 切换隐藏投注框
                switch (params) {
                case 'noEnd':
                case 'end':
                    if (params === 'noEnd') {
                        _hmt.push(['_trackEvent', '500fkcqH5_全部赛事页未结束点击', 'click', '500fkcqH5_未结束点击'])
                    } else {
                        _hmt.push(['_trackEvent', '500fkcqH5_全部赛事页已结束点击', 'click', '500fkcqH5_全部赛事页已结束'])
                    }
                    this.$router.replace(`/h5/matchList/${params}/`);
                    break
                }
            },
            openBetListbox () {
                if (this.hasLogin) {
                    stopHtml()
                    this.$store.dispatch('getGoldList', 0)
                    setTimeout(() => {
                        this.$store.commit('showBetListbox', true)
                    }, 10)
                }
                _hmt.push(['_trackEvent', '500fkcqH5_首页猜球记录点击', 'click', '500fkcqH5_首页猜球记录'])
            }
        },
        computed: {
            showHeadBox () {
                return this.$store.state.headParentBox.showHeadBox
            },
            userInfo () {
                return this.$store.state.userInfo
            },
            scrollNumber () {
                return this.$store.state.home.scrollNumber
            },
            hasLogin () {
                return !!this.$store.state.ck
            }
        },
        mounted(){
            setTimeout(()=>{
                if (~location.hash.indexOf('@@_@')) {
                    this.enterMy({params:'rank'})
                    history.replaceState({}, '', `${location.href.split(location.pathname)[0]}${location.pathname}#/h5/home/hot/`)
                }
            },100)
        },
        filters: {
            format: (num) => {
                num = Number(num);
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
