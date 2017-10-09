<template>
    <div style="display: none; position: absolute;top:100px;left: 50px;z-index:100;border: 1px solid #000;width: 300px;height: 300px">
        <h1>赛事统计</h1>
        <p ></p>
        <ul>
            <li :class="{'active':currNav==='stat'}" v-tap="{methods:matchTotalNav,type:'stat'}">统计数据</li>
            <li :class="{'active':currNav==='case'}" v-tap="{methods:matchTotalNav,type:'case'}">事件记录</li>
        </ul>
        <div v-if="currNav==='stat' && footballStatData"
            v-for="item in footballStatData"
        >
            <p> {{ item.statstype | formatFootballStat }} </p>
            <p> {{ item.homecount }} vs {{ item.awaycount }}  </p>
        </div>
        <div v-if="currNav==='case' && footballCaseData"
             v-for="item in footballCaseData"
        >
            <span>主队 {{ item.casetype | formatFootballCaseHome }} </span>
            <span> {{ item.caseminutes }}'  </span>
            <span>客队 {{ item.casetype | formatFootballCaseAway }} </span>
        </div>
    </div>
</template>

<script>
    import {aTypes} from '~store/main'
    export default {
        data () {
            return {
                title: '',
                currNav: 'stat',
                routeMatchid: 'routeMatchid'
            }
        },
        watch: {},
        methods: {
            matchTotalNav ({type}) {
                this.currNav = type
                if (type === 'stat') {
                    this.$store.dispatch(aTypes.getFootballStat, this.routeMatchid)
                } else if (type === 'case') {
                    this.$store.dispatch(aTypes.getFootballCase, this.routeMatchid)
                }
            }
        },
        computed: {
            footballCaseData () {
                return this.$store.state.main.footballCaseData
            },
            footballStatData () {
                return this.$store.state.main.footballStatData
            }
        },
        mounted () {
            let routeMatchid = this.$route.params.matchid
            this.routeMatchid = routeMatchid
            this.$store.dispatch(aTypes.getFootballStat, routeMatchid)
            console.log('赛事统计 点击')
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
            },
            formatFootballCaseHome: (caseStr) => {
//                足球比赛统计 主
                switch (caseStr) {
                case '101025':return '角球'
                case '101065':return '进球'
                case '101045':return '红牌'
                case '101032':return '红牌'
                case '101034':return '黄牌'
                case '100141':return '比赛开始'// 有数据就开始
                case '100001':return '中场休息'
                case '100018':return '点球开始'
                case '100782':return '取消比赛'
                default: return false
                }
            },
            formatFootballCaseAway: (caseStr) => {
//                足球比赛统计
                switch (caseStr) {
                case '102049':return '角球'
                case '102089':return '进球'
                case '102069':return '红牌'
                case '102056':return '红牌'
                case '102058':return '黄牌'
                case '100141':return '比赛开始' // 有数据就开始
                case '100001':return '中场休息'
                case '100008':return '点球开始'
                case '100782':return '取消比赛'
                default: return ''
                }
            }
        }
    }
</script>
<style>

</style>
