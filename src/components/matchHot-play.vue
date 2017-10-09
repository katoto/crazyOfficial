<template>
    <section  v-if="matchData" class="hot" :class="{'hot-1':matchData.MatchStat==='3' && matchData.isAwards==='0',
    'hot-2':matchData.MatchStat==='3' && matchData.isAwards==='1',
    'hot-3':matchData.MatchStat!=='3' && matchData.isAwards==='0',
    'hot-4':matchData.MatchStat!=='3' && matchData.isAwards==='1',
    }">
        <!-- 没有直播的情况   -->
        <div class="hot_vs respon" v-if="matchData.odds" v-tap="{methods:goMain,matchid:matchData.MatchID}">
            <div class="host_vs_l resone-itm" :class="{'active':currentBetSelect&&currentBetSelect.item===matchData.odds.Selections[1]}">
                <span class="vs_logo"><img :src="matchData.HomeLogo" @error="imgOnError"></span>
                <p class="vs_team">{{ matchData.HomeTeamName }}</p>
                <p class="vs_pl item_end_single" v-if="Number(matchData.odds.Selections[1].BackOdds)<=1.01 || (matchData.odds && matchData.odds.State!=='1'&&matchData.odds.State!=='3')">主胜
                    <span>―</span>
                </p>
                <p class="vs_pl" v-else
                        v-tap="{methods:clickBetTab,params: {item: matchData.odds.Selections[1] ,matchid:matchData.MatchID,VerifyResult:matchData.odds.VerifyResult }}">主胜 <span
                        :class="{'changeColor_hc':BackOddsChange[matchData.MatchID+'_1']}">{{ matchData.odds.Selections[1].BackOdds }}</span></p>
            </div>
            <!-- hot_vsColor_hc -->
            <div class="hot_vs_c" :class="{'hot_vsColor_hc':matchData.MatchStat!=='3','active':currentBetSelect&&currentBetSelect.item===matchData.odds.Selections[0]}">
                <p class="vs_score" v-if="matchData.MatchStat==='3'">{{ matchData.HomeTeamScore }}:{{ matchData.AwayTeamScore }}</p>
                <p class="vs_score" v-if="matchData.MatchStat!=='3'">VS</p>
                <!--<p class="time">上半场42'</p>   时间  和 封盘的各种状态 、行进中的状态   -->
                <p class="time" v-if="matchData.MatchStat==='3'">{{ matchData.MatchStatus | matchStatusStr }}<em>{{ matchData.MatchOnTime | timeSlice(matchData.MatchStatus)  }}</em></p>
                <p class="time" v-if="matchData.MatchStat!=='3'">{{ matchData.MatchTime | matchTimeFormat(matchData.SystemTime) }}</p>
                <!--<span class="live" v-if="matchData.MatchStat==='3'"><i>LIVE</i>{{ matchData.MatchStatus | matchStatusStr }}<em>{{ matchData.MatchOnTime }}'</em></span>-->
                <!--<span class="time" hot_slt  v-if="matchData.MatchStat!='3'">{{ matchData.MatchTime | matchTimeFormat }}</span>-->
                <p class="vs_pl item_end_single" v-if="Number(matchData.odds.Selections[0].BackOdds)<=1.01 || (matchData.odds && matchData.odds.State!=='1'&&matchData.odds.State!=='3')">平局
                    <span>―</span>
                </p>
                <p class="vs_pl " v-else
                        v-tap="{methods:clickBetTab,params: {item: matchData.odds.Selections[0] ,matchid:matchData.MatchID,VerifyResult:matchData.odds.VerifyResult }}">平局 <span
                        :class="{'changeColor_hc':BackOddsChange[matchData.MatchID+'_0']}">{{ matchData.odds.Selections[0].BackOdds }}</span></p>

            </div>
            <div class="host_vs_r resone-itm" :class="{'active':currentBetSelect&&currentBetSelect.item===matchData.odds.Selections[-1]}">
                <span class="vs_logo"><img :src="matchData.AwayLogo" @error="imgOnError"></span>
                <p class="vs_team" >{{ matchData.AwayTeamName }}</p>
                <p class="vs_pl item_end_single" v-if="Number(matchData.odds.Selections[-1].BackOdds)<=1.01 || (matchData.odds && matchData.odds.State!=='1'&&matchData.odds.State!=='3')">客胜
                    <span>―</span>
                </p>
                <p class="vs_pl" v-else
                   v-tap="{methods:clickBetTab,params: {item: matchData.odds.Selections[-1] ,matchid:matchData.MatchID,VerifyResult:matchData.odds.VerifyResult }}">客胜
                    <span :class="{'changeColor_hc':BackOddsChange[matchData.MatchID+'_-1']}">{{ matchData.odds.Selections[-1].BackOdds }}</span>
                </p>
            </div>
        </div>
    </section>
</template>
<script>
    import {mutationTypes} from '~store/home'
    export default {
        props: ['matchData', 'pages'],
        data () {
            return {
                title: ''
            }
        },
        watch: {},
        methods: {
            imgOnError (that) {
                that.target.setAttribute('src', 'https://crazybet.choopaoo.com/img/esun/upload/f8/33/f833e6e641ef11e78fcf.png')
//                that.target.setAttribute('src', 'http://odds.500.com/static/soccerdata/images/TeamPic/teamsignnew_1213.png')
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
                this.$store.commit(mutationTypes.currentBetSelect, params)
            },
            clickPanel (args) {
                //  点击去空白 还没用到
                if (!args.event.isItem) {
                    this.$store.commit(mutationTypes.currentBetSelect, null)
                }
            },
            goMain ({matchid}) {
                this.$router.push(`/main/${matchid}`)
            }
        },
        computed: {
            BackOddsChange () {
                return this.$store.state.home.BackOddsChange
            },
            currentBetSelect () {
                return this.$store.state.home.currentBetSelect
            }
        },
        mounted () {
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
                sliceTime = time.split(':')
                switch (matchStatus) {
                case '2':
                    if (sliceTime[0] && parseInt(sliceTime[0]) > 45) {
                        return '45+\''
                    }
                    return sliceTime[0] + '\'' || '0'
                case '8':
                    if (sliceTime[0] && parseInt(sliceTime[0]) > 90) {
                        return '90+\''
                    }
                    return sliceTime[0] + '\'' || '0'
                case '64':
                    if (sliceTime[0] && parseInt(sliceTime[0]) > 115) {
                        return '115+\''
                    }
                    return sliceTime[0] + '\'' || '0'
                case '256':
                    if (sliceTime[0] && parseInt(sliceTime[0]) > 120) {
                        return '120+\''
                    }
                    return sliceTime[0] + '\'' || '0'
                }
                return ''
            }
        }
    }
</script>
<style>
</style>
