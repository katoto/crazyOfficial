<template>
        <div class="item" v-if="(matchData && matchData.MatchID !==hidehotMatchID) || (matchStyle!=='hot')" :class="{'item_end':matchData.MatchStat==='1','sealing':matchData.odds && matchData.odds.State!=='1'&&matchData.odds.State!=='3'}" v-tap="{methods:clickPanel}">
            <!--   用在已结束 item_end-->
            <div class="item_tit">
                <span class="live" v-if="matchData.MatchStat==='3'"><i>LIVE</i>{{ matchData.MatchStatus | matchStatusStr }}<em>{{ matchData.MatchOnTime | timeSlice(matchData.MatchStatus) }}</em></span>
                <span class="time" v-if="matchData.MatchStat!=='3'">{{ matchData.MatchTime | matchTimeFormat(matchData.SystemTime) }}</span>
                {{ matchData.CompetitionName }}
                <span class="icon_sealing" v-if="matchData.odds && matchData.odds.State!=='1'&&matchData.odds.State!=='3'">封盘中</span>

            </div>
            <div class="item_vs">
                <div class="team" v-tap="{methods:goMain,matchid:matchData.MatchID}">
                    <!-- 只差一个正在打的比赛的状态 -->
                    <p><img :src="matchData.HomeLogo" @error="imgOnErrorLogo">{{ matchData.HomeTeamName }}<span class="score" v-if="matchData.MatchStat==='3' || matchData.MatchStat==='1'">{{ matchData.HomeTeamScore }}</span></p>
                    <p><img :src="matchData.AwayLogo" @error="imgOnErrorLogo">{{ matchData.AwayTeamName }}<span class="score" v-if="matchData.MatchStat==='3' || matchData.MatchStat==='1'">{{ matchData.AwayTeamScore }}</span></p>
                </div>
                <div class="item_bet" v-if="matchData.MatchStat!='1'&& matchData.odds && matchData.odds.State==='1'">
<p class="btn_bet" :class="{'slt':currentBetSelect&&currentBetSelect.item===matchData.odds.Selections[1],'item_end_single':Number(matchData.odds.Selections[1].BackOdds)<=1.01,'changeColor_hc':BackOddsChange[matchData.MatchID+'_1']}"  v-tap="{methods:clickBetTab,params: {item: matchData.odds.Selections[1] ,matchid:matchData.MatchID,VerifyResult:matchData.odds.VerifyResult }}" ><em>主胜</em>{{ matchData.odds.Selections[1].BackOdds }}</p>
<p class="btn_bet btn_line" :class="{'slt':currentBetSelect&&currentBetSelect.item===matchData.odds.Selections[0],'item_end_single':Number(matchData.odds.Selections[0].BackOdds)<=1.01,'changeColor_hc':BackOddsChange[matchData.MatchID+'_0'] }" v-tap="{methods:clickBetTab,params: {item: matchData.odds.Selections[0] ,matchid:matchData.MatchID,VerifyResult:matchData.odds.VerifyResult }}"><em>平</em>{{ matchData.odds.Selections[0].BackOdds }}</p>
<p class="btn_bet" :class="{'slt':currentBetSelect&&currentBetSelect.item===matchData.odds.Selections[-1],'item_end_single':Number(matchData.odds.Selections[-1].BackOdds)<=1.01,'changeColor_hc':BackOddsChange[matchData.MatchID+'_-1'] }" v-tap="{methods:clickBetTab,params: {item: matchData.odds.Selections[-1] ,matchid:matchData.MatchID,VerifyResult:matchData.odds.VerifyResult }}"><em>客胜</em>{{ matchData.odds.Selections[-1].BackOdds }}</p>
                </div>
                <div class="item_bet" key="end" v-if="matchData.odds && matchData.odds.State!=='1'&&matchData.odds.State!=='3'">
                    <p class="btn_bet">
                        <em>主胜  </em> -
                    </p>
                    <p class="btn_bet"><em>平 </em> -
                    </p>
                    <p class="btn_bet"><em>客胜</em> -
                    </p>
                </div>
                <!--  已结束  使用 ok -->
                <div class="item_end_info" v-if="matchData.MatchStat==='1'">
                    <span class="haveBet" v-if="matchData.isPurchased==='1'&&matchData.isprize!=='1'"><i class="icon icon_star"></i>已投</span>
                    <span class="winning" v-if="matchData.isprize==='1'"></span>
                    <span class="end_msg">完场</span>
                </div>
                <div class="item_end_info" v-if="matchData.MatchStat==='2'">
                    <span class="end_msg">取消</span>
                </div>
            </div>
            <div class="item_info">
                <span><i class="icon icon_user"></i>{{ matchData.PurchaseNumber }}</span>
                <span><i class="icon icon_money"></i>{{ matchData.PurchaseTotal }}</span>
                <span class="haveBet" v-if="matchData.MatchStat!=='1' && matchData.isPurchased==='1'"><i class="icon icon_star"></i>已投</span>
            </div>
            <span class="icon_jiajiang" v-if="matchData.isAwards==='1'" :class="{ 'icon':matchData.isAwards==='1'}"
                  v-tap="{ methods:showAwardBoxFn,params: matchData.award_url }"
            ></span>
        </div>
</template>
<script>
    import {mutationTypes} from '~store/home'

    export default {
        props: ['matchData', 'matchStyle'],
        methods: {
            showAwardBoxFn ({params}) {
                this.$store.commit('showAwardbox', true)
//                this.$store.commit('setAwardImg', params)
                this.$store.commit('setAwardImg', 'https://crazybet.choopaoo.com/img/esun/upload/d5/d7/d5d7597ca4f311e78ca3.jpg')
            },
            imgOnErrorLogo (that) {
//                that.target.setAttribute('src', 'https://crazybet.choopaoo.com/img/esun/upload/f8/33/f833e6e641ef11e78fcf.png')
                that.target.setAttribute('src', 'http://odds.500.com/static/soccerdata/images/TeamPic/teamsignnew_1213.png')
            },
            clickBetTab ({params}) {
                let oldFlag = ''
                let oldcurrentBetSelect = this.$store.state.home.currentBetSelect
                if (+params.item.BackOdds <= 1.01) {
                    return
                }
                if (oldcurrentBetSelect) {
                    oldFlag = oldcurrentBetSelect.matchid + '_' + oldcurrentBetSelect.item.Selection
                }
                if (oldFlag === params.matchid + '_' + params.item.Selection) {
                    this.$store.commit(mutationTypes.currentBetSelect, null)
                    return false
                }
                // 这个去了正常手机会闪
                this.$store.commit(mutationTypes.currentBetSelect, params)
                setTimeout(() => {
                    this.$store.commit(mutationTypes.currentBetSelect, params)
                }, 0)
            },
            clickPanel (args) {
                if (!args.event.isItem) {
                    this.$store.commit(mutationTypes.currentBetSelect, null)
                    this.$store.commit(mutationTypes.setSelectedNum, 0)
                }
            },
            goMain ({matchid}) {
                this.$router.push(`/main/${matchid}`)
            }

        },
        computed: {
            showAwardbox () {
                return this.$store.state.awardAllData.showAwardbox
            },
            currentBetSelect () {
                return this.$store.state.home.currentBetSelect
            },
            BackOddsChange () {
                return this.$store.state.home.BackOddsChange
            },
            hidehotMatchID () {
                return this.$store.state.home.hidehotMatchID
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
            },
            matchTimeFormat (time, baseTime, format = 'MM月dd日 HH:mm') {
                baseTime = +baseTime * 1000
                let t = new Date(+time * 1000)

                let tf = function (i) {
                    return (i < 10 ? '0' : '') + i
                }
                let leftTime = function (ms) {
                    let hour = 0
                    let minute = 0
                    ms = +ms
                    let allHour = Math.floor(ms / 1000 / 60 / 60)
                    if (allHour > 0) {
                        hour = allHour
                        minute = Math.floor(ms / 1000 / 60) - hour * 60
                        return tf(hour) + ':' + tf(minute)
                    }
                    minute = Math.floor(ms / 1000 / 60)
                    return tf(hour) + ':' + tf(minute)
                }
                switch (Math.ceil((t.getTime() - baseTime) / 86400000)) {
                case 1: return '今天' + leftTime(t.getTime() - baseTime)
                case 2: return '明天' + leftTime(t.getTime() - baseTime - (24 * 60 * 60 * 1000))
                case 3: return '后天' + leftTime(t.getTime() - baseTime - (24 * 2 * 60 * 60 * 1000))
                }

                try {
                    if (~(t.toString().indexOf('GMT+00'))) {
                        t = new Date((+time * 1000) + (8 * 60 * 60 * 1000))
                    }
                } catch (e) {
                    console.error(e.message)
                }

                return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
                    switch (a) {
                    case 'yyyy':
                        return tf(t.getFullYear())
                    case 'MM':
                        return tf(t.getMonth() + 1)
                    case 'mm':
                        return tf(t.getMinutes())
                    case 'dd':
                        return tf(t.getDate())
                    case 'HH':
                        return tf(t.getHours())
                    case 'ss':
                        return tf(t.getSeconds())
                    }
                })
            },
            matchStatusStr (data) {
                let matchStatusStr = ''
                switch (data) {
                case '0':matchStatusStr = '未开始'; break
                case '1':matchStatusStr = '未开始'; break
                case '2':matchStatusStr = '上半场'; break
                case '4':matchStatusStr = '中场休息'; break
                case '8':matchStatusStr = '下半场'; break
                case '16':matchStatusStr = '完场'; break
                case '32':matchStatusStr = '完结'; break
                case '64':matchStatusStr = '加时上半场'; break
                case '128':matchStatusStr = '加时休息'; break
                case '256':matchStatusStr = '加时下半场'; break
                case '512':matchStatusStr = '加时完场'; break
                case '1024':matchStatusStr = '点球'; break
                default : matchStatusStr = '未开始'
                }
                return matchStatusStr
            },
            timeSlice (time, matchStatus) {
                let sliceTime = ''
                let sliceTimeNumber = 0
                sliceTime = time.split(':')
                if (sliceTime[0]) {
                    sliceTimeNumber = parseInt(sliceTime[0]) + 1
                }
                switch (matchStatus) {
                case '2':
                    if (sliceTimeNumber > 45) {
                        return '45+\''
                    }
                    return sliceTimeNumber + '\'' || '0'
                case '8':
                    if (sliceTimeNumber > 90) {
                        return '90+\''
                    }
                    return sliceTimeNumber + '\'' || '0'
                case '64':
                    if (sliceTimeNumber > 115) {
                        return '115+\''
                    }
                    return sliceTimeNumber + '\'' || '0'
                case '256':
                    if (sliceTimeNumber > 120) {
                        return '120+\''
                    }
                    return sliceTimeNumber + '\'' || '0'
                }
                return ''
            }
        }
    }
</script>

