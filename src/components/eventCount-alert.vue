<template>
    <!-- 統計 -->
    <div class="pop pop_shuju">
        <div class="pop_layer" v-tap="{ methods:closeBetListbox }"></div>
        <div class="popIn">
            <div class="popTit">
                <ul class="list_menu clear">
                    <li class="" :class="{'cur':!showDataCount}" v-tap="{ methods:changeEventTab,params:'dataCount' }">数据统计</li>
                    <li class="" :class="{'cur':showDataCount}"  v-tap="{ methods:changeEventTab,params:'eventCount' }">事件记录</li>
                </ul>
                <span class="close" v-tap="{ methods:closeBetListbox }">
                    <span></span>
                </span>
            </div>
            <div class="box":class="{'box2':showDataCount}">
                <div class="scroller">
                    <table cellpadding="0" cellspacing="0" width="100%" class="table_shuju">
                        <colgroup>
                            <col width="16%">
                            <col width="">
                            <col width="16%">
                        </colgroup>
                        <tbody v-if="!showDataCount && footballStatData">
                            <tr v-for="item in footballStatData">
                                <td><span class="num">{{ item.homecount }}</span></td>
                                <td>
                                    <div class="contrast">
                                        <strong>{{ item.statstype | formatFootballStat }}</strong>
                                        <p class="item">
                                            <span :class="{ 'item_more': parseInt(item.homecount ) >= parseInt(item.awaycount ) ,'no_line':item.awaycount==='0'&&item.homecount === '0' }"
                                                  :style="{width:  parseInt(item.homecount ) < parseInt(item.awaycount ) && ((parseInt(item.homecount )) / (parseInt(item.awaycount ))) * 50 +'%' }"></span>
                                            <span :class="{ 'item_more': parseInt(item.homecount ) < parseInt(item.awaycount ) ,'no_line':item.awaycount==='0'&&item.homecount === '0' }"
                                                  :style="{width:  parseInt(item.homecount ) >= parseInt(item.awaycount ) && ((parseInt(item.awaycount )) / (parseInt(item.homecount ))) * 50 +'%' }"></span>
                                        </p>
                                    </div>
                                </td>
                                <td><span class="num" :class="{'gray':item.awaycount ==='0'}">{{ item.awaycount }}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="scroller scroller2" v-if="matchState !== '0'">
                    <ul class="time_line" v-if="showDataCount && footballCaseData" >
                        <li><span class="time_point">开始</span></li>
                        <li v-for="item in footballCaseData" v-if="isemptyEvent(item.casetype)"
                            :class="{'line_left': item.casetype === '101025' ||  item.casetype === '101065' ||
                              item.casetype === '101045' ||  item.casetype === '101032' ||  item.casetype === '101034'
                             , 'line_right': item.casetype === '102049' ||  item.casetype === '102089' ||
                              item.casetype === '102069' ||  item.casetype === '102056' ||  item.casetype === '102058'
                             }"
                        >
                            <span class="time_point" v-if="item.casetype === '100141'">开始</span>
                            <span class="time_point" v-else-if="item.casetype === '100001'">中场</span>
                            <span class="time_point" v-else-if="item.casetype === '200050'">完场</span>
                            <span class="time_point" v-else-if="item.casetype === '100018' || item.casetype === '100008' ">点球开始</span>
                            <span class="time_point" v-else-if="item.casetype === '100782'">比赛取消</span>
                            <div v-else>
                                <span class="item_time" >{{ item.caseminutes }}'</span>
                                <i class="icon "
                                    :class="{'icon_jiaoqiu':item.casetype ==='101025' || item.casetype ==='102049',
                                    'icon_huangpai': item.casetype ==='101034' || item.casetype ==='102058',
                                    'icon_hongpai': item.casetype ==='101045' || item.casetype ==='101032'||item.casetype ==='102069' || item.casetype ==='102056',
                                    'icon_jinqiu': item.casetype ==='101065' || item.casetype ==='102089',
                                     }"
                                ></i>
                                <span v-if="item.casetype === '101025' ||  item.casetype === '101065' ||
                              item.casetype === '101045' ||  item.casetype === '101032' ||  item.casetype === '101034'">{{ fmdetail.HomeTeamName }}</span>
                                <span v-if="item.casetype === '102049' ||  item.casetype === '102089' ||
                              item.casetype === '102069' ||  item.casetype === '102056' ||  item.casetype === '102058'">{{ fmdetail.AwayTeamName }}</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div v-else >
                    <p style="margin: 0.9rem auto;text-align: center">比赛未开始</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .item_more{
        width: 50%;
    }
    .no_line{
        display: none !important;
    }
</style>
<script>
    import {starHtml} from '~common/util'
    export default {
        props: ['matchState'],
        data () {
            return {
                showDataCount: true
            }
        },
        watch: {},
        methods: {
            closeBetListbox () {
                //  关闭 消息
                starHtml()
                this.$store.commit('showEventCountbox', false)
            },
            changeEventTab ({ params }) {
                if (params && params === 'dataCount') {
                    this.showDataCount = false
                } else {
                    this.showDataCount = true
                }
            },
            isemptyEvent (data) {
                switch (data) {
                case '101025':
                case '101065':
                case '101045':
                case '101032':
                case '101034':
                case '102049':
                case '102089':
                case '102069':
                case '102056':
                case '100018':
                case '100141':
                case '100001':
                case '100008':
                case '100782':
                case '200050':
                case '102058':return true
                default: return false
                }
            }
        },
        computed: {
            footballCaseData () {
                return this.$store.state.eventCountAllData.footballCaseData
            },
            footballStatData () {
                return this.$store.state.eventCountAllData.footballStatData
            },
            fmdetail () {
                return this.$store.state.main.fmdetail
            }

        },
        mounted () {
            console.log(this.matchState)
        },
        filters: {
            formatFootballStat: (stat) => {
//                足球比赛统计
                switch (stat) {
                case '90018':return '射门次数'
                case '90007': return '射正次数'
                case '90001':return '角球'
                case '90005':return '任意球'
                case '90010':return '犯规'
                case '90011':return '越位'
                case '90002':return '黄牌'
                case '90003':return '红牌'
                default: return ''
                }
            }
        }
    }
</script>
<style>
</style>
