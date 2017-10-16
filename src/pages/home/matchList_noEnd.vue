<template>
    <div v-if="matchList_noEnd" class="listBox">
        <template v-for="items in matchList_noEnd">
            <!--{{ items }}    uniqueValue time  是唯一的值-->
            <div class="list_day clear"  v-tap="{methods: switchMatch, uniqueValue: items.matchtime}">
                <span class="time">
                      {{ items.matchtime | formatTime_week('MM月dd日 WW') }}  {{ items.list.length }}场比赛
                </span>
                <span class="icon_raw" :class="{'icon_raw_down': shows[items.matchtime] }"></span>
            </div>
            <div class="dayBox" v-show="!shows[items.matchtime]">
                <template v-for="item in items.list">
                    <matchListTemplate :matchStyle="'noEnd'" :matchData="item">
                    </matchListTemplate>
                </template>
            </div>
        </template>
    </div>
    <div v-else class="loading">
        <img src="~static/images/loading.svg">
    </div>
</template>

<script>
    import Vue from 'vue'
    import MatchListTemplate from '~components/matchlist-template.vue'
    import {actionTypes} from '~store/home'
    export default {
        data () {
            return {
                shows: {}
            }
        },
        components: {
            MatchListTemplate
        },
        watch: {
            socketData (data) {
                Object.assign(data, {'matchStyle': 'total'})
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
            }
        },
        methods: {
            switchMatch ({uniqueValue}) {
                Vue.set(this.shows, uniqueValue, !this.shows[uniqueValue])
            }
        },
        computed: {
            socketData () {
                return this.$store.state.socket.data
            },
            matchList_noEnd () {
                return this.$store.state.home.matchList_noEnd
            },
            matchIDStr () {
//                双层循环
                let matchIDStr = ''
                if (this.matchList_noEnd && Array.isArray(this.matchList_noEnd)) {
                    this.matchList_noEnd.forEach((items) => {
                        if (items.list && Array.isArray(items.list)) {
                            items.list.forEach((item) => {
                                matchIDStr += item.MatchID + '|'
                            })
                        }
                    })
                }
                return matchIDStr
            }
        },
        mounted () {
            if (this.matchIDStr) {
                this.$store.dispatch('subscribe', {
                    ptype: 'list',
                    body: this.matchIDStr
                })
            }
            this.$store.dispatch(actionTypes.getFootballMatchList, 'total')
            this.$store.dispatch(actionTypes.setIntervalFn, { type: 'total', time: 30000 })
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
            formatTime_week: (time, format = 'yyyy-MM-dd') => {
                let t = new Date(+time * 1000)
                let tf = function (i) {
                    return (i < 10 ? '0' : '') + i
                }
                try {
                    if (~(t.toString().indexOf('GMT+00'))) {
                        t = new Date((+time * 1000) + (8 * 60 * 60 * 1000))
                    }
                } catch (e) {
                    console.error(e.message)
                }

                let weekFormate = function (weekDay) {
                    switch (weekDay) {
                    case 0: return '周日'
                    case 1: return '周一'
                    case 2: return '周二'
                    case 3: return '周三'
                    case 4: return '周四'
                    case 5: return '周五'
                    case 6: return '周六'
                    default : return '时间有误'
                    }
                }

                return format.replace(/yyyy|MM|dd|HH|mm|ss|WW/g, function (a) {
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
                    case 'WW':
                        return weekFormate(t.getDay())
                    }
                })
            }
        },
        beforeDestroy () {
            this.$store.dispatch(actionTypes.clearIntervalFn)
//            取消订阅
            this.$store.dispatch('unsubscribe', {
                ptype: 'list',
                body: this.matchIDStr
            })
        }
    }
</script>
