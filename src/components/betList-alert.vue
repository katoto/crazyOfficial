<template>
    <div class="pop pop_record">
        <div class="pop_layer" v-tap="{ methods:closeBetListbox }"></div>
        <div class="popIn">
            <div class="popTit">
                <h2 class="title">竞猜记录</h2>
                <span class="close" v-tap="{ methods:closeBetListbox }"><span></span></span>
            </div>
            <div class="box">
                <!-- 猜球记录为空 start -->
                <div class="emptyBox respon2" v-if="!goldList">
                    <div class="empty respon2-itm">
                        <div class="emptyIn">
                            <span class="icon icon_empty"></span>
                            <p>暂无猜球记录</p>
                        </div>
                    </div>
                </div>
                <!-- 猜球记录为空 end -->
                <div class="scroller" v-if="goldList">
                    <div class="list" v-if="goldList && goldList.currentmatch.matchinfo&&goldList.currentmatch.matchinfo.MatchID">
                        <div class="list-tit">
                            <h3>本场记录</h3>
                        </div>
                        <div class="list-cont">
                            <div class="cont-tit">
                                <div class="fl">
                                    {{goldList.currentmatch.matchinfo.HomeTeamName}}
                                    <span v-if="goldList.currentmatch.matchinfo.State==='0'||goldList.currentmatch.matchinfo.State==='3'||goldList.currentmatch.matchinfo.State==='4'||goldList.currentmatch.matchinfo.State==='5'">vs</span>
                                    <span v-if="goldList.currentmatch.matchinfo.State==='2'">取消</span>
                                    <span v-if="goldList.currentmatch.matchinfo.State==='1'">{{goldList.currentmatch.matchinfo.HomeTeamScore}}:{{goldList.currentmatch.matchinfo.AwayTeamScore}}</span>
                                    {{goldList.currentmatch.matchinfo.AwayTeamName}}
                                </div>
                                <div class="btn-goBet" data-type="开始竞猜" data-tab="beginBet" v-tap="{methods: beginBet}" v-if="(!goldList.currentmatch.list&&goldList.currentmatch.matchinfo.State!='1')||(!goldList.currentmatch.list.length&&goldList.currentmatch.matchinfo.State!='1')">竞猜本场<i class="icon-raw"></i></div>
                                <div class="btn-goBet" key="wcy" v-tap="{methods: beginBet}" v-if="goldList.currentmatch.matchinfo.State==='1'&&!goldList.currentmatch.list.length">未参与<i class="icon-raw"></i></div>
                                <!--<div class="btn-goBet">竞猜本场<i class="icon-raw"></i> </div>-->

                                <div class="fr" v-tap="{methods: switchMatch, matchinfo: goldList.currentmatch.matchinfo}" v-if="goldList.currentmatch.list&&goldList.currentmatch.list.length">
                                    <span :class="{'color9': goldList.currentmatch.prize<=0, 'yellow':goldList.currentmatch.prize>0}" class="yellow"> {{ goldList.currentmatch.prize|statusZh }} </span>
                                    <i class="icon-raw" v-if="goldList.currentmatch.list&&goldList.currentmatch.list.length" :class="{'icon-rawup': !shows[goldList.currentmatch.matchinfo.MatchID]}"></i>
                                </div>

                            </div>
                            <div class="cont" v-if="goldList.currentmatch.list&&goldList.currentmatch.list.length&&shows[goldList.currentmatch.matchinfo.MatchID]">
                                <table cellpadding="0" cellspacing="0" width="100%">
                                    <tbody>
                                    <tr>
                                        <th width="20%" align="left">玩法</th>
                                        <th align="left">选项</th>
                                        <th width="24%" align="right">猜球币</th>
                                        <th width="27%" align="right">结果</th>
                                    </tr>
                                    <tr v-for="tz in goldList.currentmatch.list">
                                        <td align="left" class="color9">{{tz.marketinfo.RuleType,tz.marketinfo.nextscore|ruleName}}
                                        </td>
                                        <td align="left">{{tz.order.f_selection,tz.marketinfo.RuleType,
                                            goldList.currentmatch.matchinfo|teamName}}
                                            @{{tz.order.f_odds}}
                                        </td>
                                        <td v-if="tz.order.f_orderstatus==='-1'||tz.order.f_orderstatus==='-2'" class="green"
                                            align="right">(已返还){{tz.order.f_golds|number}}
                                        </td>
                                        <td v-else align="right">{{tz.order.f_golds|number}}</td>
                                        <td style="padding-right: 0.02rem" v-if="tz.order.f_prize<=0" align="right" class="color9">{{tz.order.f_prize|result}}</td>
                                        <td v-else align="right" class="yellow">中 {{tz.order.f_prize|number}}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="list" v-for="day in goldList.orders">
                        <div class="list-tit">
                            <h3>{{day.matchtime}}</h3>
                        </div>
                        <div class="list-cont" v-for="item in day.list" v-tap="{methods: switchMatch, matchinfo: item.matchinfo}">
                            <div class="cont-tit cur">
                                <div class="fl">{{item.matchinfo.HomeTeamName}}
                                    <span v-if="item.matchinfo.State==='0'||item.matchinfo.State==='3'||item.matchinfo.State==='4'||item.matchinfo.State==='5'">vs</span>
                                    <span v-if="item.matchinfo.State==='2'">取消</span>

                                    <span v-if="item.matchinfo.State==='1'">{{item.matchinfo.HomeTeamScore}}:{{item.matchinfo.AwayTeamScore}}</span>
                                    {{item.matchinfo.AwayTeamName}}
                                </div>
                                <div class="fr">
                                    <span style="padding-right: 0.02rem" :class="{'color9': item.prize<=0, 'yellow':item.prize>0}" class="yellow">{{item.prize|statusZh}}</span>
                                    <i class="icon-raw " :class="{'icon-rawup': !shows[item.matchinfo.MatchID]}"></i>
                                </div>
                            </div>
                            <div class="cont" v-if="shows[item.matchinfo.MatchID]">
                                <table cellpadding="0" cellspacing="0" width="100%">
                                    <tbody>
                                    <tr>
                                        <th width="22%" align="left">玩法</th>
                                        <th align="left">选项</th>
                                        <th width="24%" align="right">猜球币</th>
                                        <th width="27%" align="right">结果</th>
                                    </tr>
                                    <tr v-for="tz in item.list">
                                        <td align="left" class="color9">{{tz.marketinfo.RuleType,
                                            tz.marketinfo.nextscore|ruleName}}
                                        </td>
                                        <td align="left">{{tz.order.f_selection,tz.marketinfo.RuleType, item.matchinfo|teamName}}
                                            @{{tz.order.f_odds}}
                                        </td>
                                        <td v-if="tz.order.f_orderstatus==='-1'||tz.order.f_orderstatus==='-2'" class="green"
                                            align="right">(已返还){{tz.order.f_golds|number}}
                                        </td>
                                        <td v-else align="right">{{tz.order.f_golds|number}}</td>

                                        <td v-if="tz.order.f_prize<=0" align="right" class="color9">{{tz.order.f_prize|result}}</td>
                                        <td v-else align="right" class="yellow">中 {{tz.order.f_prize|number}}</td>
                                    </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="emptyBox respon2" v-if="goldList.orders.length=='0'&& !goldList.currentmatch.matchinfo.MatchID">
                        <div class="empty respon2-itm">
                            <div class="emptyIn">
                                <span class="icon icon_empty"></span>
                                <p>暂无记录</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {starHtml} from '~common/util'
    export default {
        data () {
            return {
                shows: {}
            }
        },
        watch: {
            goldList (newList, oldList) {
                this.showFirst()
            }
        },
        methods: {
            beginBet () {
//               关闭 消息
//                this.$router.push(`/main/${this.currentMatchID_my}`)
                starHtml()
                this.$store.commit('showBetListbox', false)
            },
            switchMatch ({matchinfo}) {
                Vue.set(this.shows, matchinfo.MatchID, !this.shows[matchinfo.MatchID])
            },
            showFirst () {
                if (this.goldList) {
                    if (this.goldList.orders.length > 1) {
                        this.goldList.orders.forEach((order) => {
                            if (order.list) {
                                order.list.forEach((item) => {
                                    Vue.set(this.shows, item.matchinfo.MatchID, false)
                                })
                            }
                        })
                    }
                    if (this.goldList.currentmatch && this.goldList.currentmatch.matchinfo && this.goldList.currentmatch.matchinfo.MatchID && this.goldList.currentmatch.list && this.goldList.currentmatch.list.length) {
                        Vue.set(this.shows, this.goldList.currentmatch.matchinfo.MatchID, true)
                    } else if (this.goldList && this.goldList.orders && this.goldList.orders[0] && this.goldList.orders[0].list && this.goldList.orders[0].list[0] && this.goldList.orders[0].list[0].matchinfo && this.goldList.orders[0].list[0].matchinfo.MatchID) {
                        Vue.set(this.shows, this.goldList.orders[0].list[0].matchinfo.MatchID, true)
                    }
                }
            },
            closeBetListbox () {
                //  关闭 消息
                starHtml()
                this.$store.commit('showBetListbox', false)
            }
        },
        computed: {
            goldList () {
                return this.$store.state.guessAllData.goldList
            },
            currentMatchID_my () {
                //   猜本场比赛
                return this.$store.state.main.currentMatchID_my
            }
        },
        filters: {
            ruleName: (ruleType, nextscore) => {
                switch (ruleType) {
                case '100':
                    return '赛果'
                case '130':
                    return '单双'
                case '350':
                    return `第${nextscore}个进球`
                case '410':
                    return `进球数`
                case '140':
                    return `比分`
                }
            },
            teamName: (selection, ruleType, matchinfo) => {
                switch (ruleType) {
                case '100':
                    if (selection === '1') {
                        return matchinfo.HomeTeamName
                    } else if (selection === '-1') {
                        return matchinfo.AwayTeamName
                    } else if (selection === '0') {
                        return '平'
                    }
                    break
                case '130':
                    if (selection === '1') {
                        return '单'
                    } else if (selection === '-1') {
                        return '双'
                    }
                    break
                case '350':
                    if (selection === '1') {
                        return matchinfo.HomeTeamName
                    } else if (selection === '-1') {
                        return matchinfo.AwayTeamName
                    } else if (selection === '0') {
                        return '无'
                    }
                    break
                case '410':
                    if (selection !== '-1') {
                        return parseInt(selection) - 1
                    }
                    if (selection === '-1') {
                        return '7+'
                    }
                    break
                case '140':
                    switch (selection) {
                    case '10001': return '0-0'
                    case '10002': return '1-0'
                    case '10003': return '2-0'
                    case '10004': return '3-0'
                    case '10005': return '4-0'
                    case '10006': return '5-0'
                    case '10007': return '6-0'

                    case '20001': return '0-1'
                    case '20002': return '1-1'
                    case '20003': return '2-1'
                    case '20004': return '3-1'
                    case '20005': return '4-1'
                    case '20006': return '5-1'
                    case '20007': return '6-1'

                    case '30001': return '0-2'
                    case '30002': return '1-2'
                    case '30003': return '2-2'
                    case '30004': return '3-2'
                    case '30005': return '4-2'
                    case '30006': return '5-2'
                    case '30007': return '6-2'

                    case '40001': return '0-3'
                    case '40002': return '1-3'
                    case '40003': return '2-3'
                    case '40004': return '3-3'
                    case '40005': return '4-3'
                    case '40006': return '5-3'
                    case '40007': return '6-3'

                    case '50001': return '0-4'
                    case '50002': return '1-4'
                    case '50003': return '2-4'
                    case '50004': return '3-4'
                    case '50005': return '4-4'
                    case '50006': return '5-4'
                    case '50007': return '6-4'

                    case '60001': return '0-5'
                    case '60002': return '1-5'
                    case '60003': return '2-5'
                    case '60004': return '3-5'
                    case '60005': return '4-5'
                    case '60006': return '5-5'
                    case '60007': return '6-5'

                    case '70001': return '0-6'
                    case '70002': return '1-6'
                    case '70003': return '2-6'
                    case '70004': return '3-6'
                    case '70005': return '4-6'
                    case '70006': return '5-6'
                    case '70007': return '6-6'

//                    case '50': return '胜其它'
//                    case '51': return '负其它'

                    case '2': return '胜其它'
                    case '4': return '负其它'

                    case '3': return '平其它'

                    default:return '0-0'
                    }
                }
                return ruleType
            },
            number: (prize) => {
                prize = Number(prize)
                if (prize < 10000) {
                    return prize
                } else if (prize < 100000000) {
                    return Math.round(prize / 10000 * 100) / 100 + '万'
                } else {
                    return Math.round(prize / 100000000 * 100) / 100 + '亿'
                }
            },
            result: (prize) => {
                switch (prize) {
                case '-4':
                    return '交易失败'
                case '-3':
                    return '交易中'
                case '-2':
                    return '无效退款'
                case '-1':
                    return '待开奖'
                case '0':
                    return '未中奖'
                }
            },
            statusZh: (prize) => {
                if (prize > 0) {
                    prize = Number(prize)
                    if (prize < 10000) {
                        return `中 ${prize}`
                    } else if (prize < 100000000) {
                        return `中 ${Math.round(prize / 10000 * 100) / 100}万`
                    } else {
                        return `中 ${Math.round(prize / 100000000 * 100) / 100}亿`
                    }
                } else if (prize === '0') {
                    return '未中奖'
                } else if (prize === '-1') {
                    return '待开奖'
                } else if (prize === '-2') {
                    return '无效退款'
                } else if (prize === '-3') {
                    return '交易中'
                } else if (prize === '-4') {
                    return '交易失败'
                }
            }
        }
    }
</script>
<style>
</style>
