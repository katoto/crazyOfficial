<template>
    <section>
        <div class="betBar" :class="{betBar_show:current,'hide':!current && isLowAndroidVersion}">
            <div class="betInfo">
                <div class="bet-info">
                    <span class="yue" v-if="hasLogin">余额 {{ allMoney | format }}</span>
                    <span class="yue" v-if="!hasLogin">未登录</span>
                    <span class="betMsg hide">请选择投注金额</span>
                    <span class="betMoney">
                                <i class="icon-jinbi"></i>
                                    <span v-html="tips"></span>
                                <i class="icon-clearup" v-if="selectedNum>0" v-tap="{methods:clean}"></i>
                            </span>
                    <span class="tips-money" :class="{'hide':!inFlash}">{{ flashMsg }}</span>
                </div>
                <span class="btn-bar-hide" v-tap="{methods:clickPanel}"></span>
            </div>
            <div class="moneyWrap clear">
                <ul class="money">
                    <li class="item01" v-tap="{methods:selectMoney,addMoney:100}"><span>&nbsp;</span></li>
                    <li class="item02" v-tap="{methods:selectMoney,addMoney:500}"><span>&nbsp;</span></li>
                    <li class="item03" v-tap="{methods:selectMoney,addMoney:5000}"><span>&nbsp;</span></li>
                    <li class="item04" v-tap="{methods:selectMoney,addMoney:-1}"><span>&nbsp;</span>
                        <em class="max" v-if="current"><i>{{watchCurrent | format }}</i></em>
                    </li>
                </ul>
                <div class="btnSubmit">
                    <div class="text" v-show="faqiState===0" v-tap="{methods:faqi}">确&nbsp;&nbsp;认</div>
                    <div class="loader" v-show="faqiState===1">Loading...</div>
                    <div class="submitOK" v-show="faqiState===2">
                    </div>
                </div>
            </div>
        </div>
        <!--  底部选项 -->
    </section>
</template>
<script>
    import {stopHtml} from '~common/util'
    import {actionTypes, mutationTypes} from '~store/home'
    export default {
        props: ['orderMessage', 'orderObj'],
        data () {
            return {
                title: '',
                flashMsg: '', // 右下角闪动提示
                inFlash: false, // 右下角闪动提示
                currentRuleType: '100'
            }
        },
        watch: {
            '$store.state.home.faqiState': function (state) {
                if (state === 2) {
//                  刷新投注之后的状态
                    setTimeout(() => {
                        this.$store.commit(mutationTypes.setSelectedNum, 0)
                        this.$store.commit(mutationTypes.currentBetSelect, null)
                        this.$store.commit(mutationTypes.changeState, 0)
                        //  加一个已投的状态
                    }, 1000)
                }
            }
        },
        methods: {
            imgOnError (that) {
                that.target.setAttribute('src', 'http://img.choopaoo.com/esun/upload/be/83/be837ad8049611e797ef.png')
            },
            clean () {
                //  清楚选中的金币
                if (this.faqiState !== 0) return
                this.flashMsg = ''
                this.$store.commit(mutationTypes.setSelectedNum, 0)
            },
            format2 (num) {
//                金币格式处理
                num = Number(num)
                if (num < 10000) {
                    return Math.round(num)
                } else if (num < 100000000) {
                    return Math.round(num / 10000 * 100) / 100 + '万'
                } else {
                    return Math.round(num / 100000000 * 100) / 100 + '亿'
                }
            },
            clickPanel (args) {
                if (!args.event.isItem) {
                    this.$store.commit(mutationTypes.currentBetSelect, null)
                }
                this.flashMsg = ''
                this.$store.commit(mutationTypes.setSelectedNum, 0)
            },
            selectMoney ({addMoney}) {
                if (this.faqiState !== 0) {
                    return
                }
                if (addMoney !== -1) {
                    if (+this.current.MaxStakeLimit === +this.watchCurrent) {
                        if (addMoney + this.selectedNum >= (this.watchCurrent - 0)) {
                            parseInt(this.watchCurrent) === 0
                            ? this.$store.commit(mutationTypes.setSelectedNum, 0)
                            : this.$store.commit(mutationTypes.setSelectedNum, this.watchCurrent - 0)
                            this.flashMsg = '已达最大投注额'
                            this.flashTips()
                        } else {
                            this.$store.commit(mutationTypes.setSelectedNum, this.selectedNum + addMoney)
                        }
                    } else if (+this.current.MaxStakeLimit !== +this.watchCurrent) {
                        if (addMoney + this.selectedNum > (this.watchCurrent - 0)) {
                            parseInt(this.watchCurrent) === 0
                            ? this.$store.commit(mutationTypes.setSelectedNum, 0)
                            : this.$store.commit(mutationTypes.setSelectedNum, this.watchCurrent - 0)
                            this.flashMsg = '您的可用余额不足'
                            this.flashTips()
                            setTimeout(() => {
                                this.$store.dispatch('showToast', {
                                    message: '您的可用余额不足'
                                })
                            }, 300)
                            stopHtml()
                            setTimeout(() => {
                                this.$store.commit('showChargebox', true)
                            }, 10)
                            _hmt.push(['_trackEvent', '500qqsd_充值点击', 'click', '500qqsd_充值'])
                        } else {
                            this.$store.commit(mutationTypes.setSelectedNum, this.selectedNum + addMoney)
                        }
                    }
                } else {
                    parseInt(this.watchCurrent) === 0
                    ? this.$store.commit(mutationTypes.setSelectedNum, 0)
                    : this.$store.commit(mutationTypes.setSelectedNum, this.watchCurrent - 0)
                    if (this.selectedNum === 0) {
                        this.flashMsg = '您的可用余额不足'
                        this.flashTips()
                        this.$store.dispatch('showToast', {
                            message: '您的可用余额不足',
                            cb: () => {
                                _hmt.push(['_trackEvent', '500qqsd_充值点击', 'click', '500qqsd_充值'])
                                this.$router.push(`/my/charge`)
                            }
                        })
                    }
                }
            },
            faqi () {
                if (!this.hasLogin) {
                    if (window.qqsdApp) {
                        qqsdApp.invoke('login')
                        return false
                    }
                }
                if (!this.selectedNum) {
                    this.$store.dispatch('showToast', '投注金币数不能为空！')
                    return false
                }

                if (parseInt(this.selectedNum) > parseInt(this.allMoney)) {
                    this.flashMsg = '余额不足'
                    this.flashTips()
                    this.$store.dispatch('showToast', {
                        message: '余额不足',
                        cb: () => {
//                            this.$router.push(`/my/charge`)
                        }
                    })

                    return
                }

                let params = {}
                params.matchid = this.currentAll.matchid
                params.matchid_me = this.currentAll.matchid
                params.golds = parseInt(this.selectedNum)
                params.verify = this.currentAll.VerifyResult
                params.ruletype = this.currentRuleType

                params.period = this.current.Issue
                params.selection = this.current.Selection
                params.odds = this.current.BackOdds
                params.v1 = this.current.V1
                params.v2 = this.current.V2
                params.v3 = this.current.V3
                console.log(params)
                this.$store.dispatch(actionTypes.faqiOrder_matchList, params)
            },
            flashTips () {
                this.inFlash = true
                setTimeout(() => {
                    this.inFlash = false
                }, 2000)
            }
        },
        computed: {
            isLowAndroidVersion () {
                return this.$store.state.isLowAndroidVersion
            },
            selectedNum () {
                return this.$store.state.home.selectedNum
            },
            current () {
                /* 有一部分数据是带过来的 */
                return this.$store.state.home.currentBetSelect && this.$store.state.home.currentBetSelect.item
            },
            currentAll () {
                /* 取matchid 用 */
                return this.$store.state.home.currentBetSelect
            },
            hasLogin () {
                return !!this.$store.state.ck
            },
            allEnd () {
                let result = true   //  判比赛是否结束
                if (this.$store.state.home.fmdetail) {
                    for (let key in this.$store.state.home.fmdetail.odds) {
                        if (Array.isArray(this.$store.state.home.fmdetail.odds[key]) || Object.prototype.toString.call(this.$store.state.home.fmdetail.odds[key]) === '[object Array]') {
                            this.$store.state.home.fmdetail.odds[key].forEach(odd => {
                                if (odd.State === '1') {
                                    result = false
                                    return true
                                }
                            })
                        } else {
                            if (this.$store.state.home.fmdetail.odds[key].State === '1') {
                                result = false
                                break
                            }
                        }
                    }
                }
                return result
            },
            allMoney () {
//                用户所有金币
                return this.userinfo && this.userinfo.gold_total
            },
            fmdetail () {
                return this.$store.state.home.fmdetail
            },
            stat () {
//                赔率的状态变化  更新赔率用的
                return this.$store.state.home.stateChange
            },
            faqiState () {
//                订单状态
                return this.$store.state.home.faqiState
            },

            userinfo () {
                return this.$store.state.userInfo
            },
            tips () {
                if (!this.current) return
                let money = this.selectedNum
                if (money > (+this.watchCurrent)) {
                    money = this.watchCurrent
                }
                let backOddMoney = this.format2(this.current.BackOdds * money)
                if (money === 0) {
                    return '请选择投注金额'
                } else {
                    return `<em class="emColor">${this.format2(money)}</em>&nbsp;&nbsp;可中${backOddMoney}&nbsp;&nbsp;`
                }
            },
            watchCurrent () {
                if (this.hasLogin && this.current) {
                    return (this.current.MaxStakeLimit - 0) < (this.allMoney - 0) ? this.current.MaxStakeLimit : this.allMoney
                }
                return this.current && this.current.MaxStakeLimit
            }

        },

        filters: {
            format: (num) => {
//                金币格式处理
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
