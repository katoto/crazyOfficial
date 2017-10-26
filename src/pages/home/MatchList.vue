<template>
    <section class="listWrap respon2">
        <PublicHead person-title="全部赛事"></PublicHead>
        <div class="listWrap_tit clear">
        <ul class="list_menu">
        <li :class="{'cur': currentNav==='noEnd'}" v-tap="{ methods:nav ,params:'noEnd'}">未结束</li>
        <li :class="{'cur': currentNav==='end'}" v-tap="{ methods:nav ,params:'end'}">已结束</li>
        </ul>
        <span class="btn_record" v-tap="{ methods:openBetListbox }">猜球记录
        <sup class="dot" v-if="userInfo && userInfo.newprize && userInfo.newprize !='0'">
        </sup>
        </span>
        </div>
        <div class="respon2-itm">
            <div class="full-scroll">
                <router-view></router-view>
            </div>
        </div>
    </section>
</template>
<script>
    import {mutationTypes} from '~store/home'
    import {stopHtml} from '~common/util'
    import PublicHead from '~components/publicHead'
export default {
        data () {
            return {
                currentNav: 'noEnd'
            }
        },
        components: {
            PublicHead
        },
        computed: {
            userInfo () {
                return this.$store.state.userInfo
            },
            hasLogin () {
                return !!this.$store.state.ck
            }
        },
        mounted () {
            if (this.$route.fullPath && ~this.$route.fullPath.indexOf('end')) {
                this.nav({params: 'end'})
            }
            this.$store.commit('setIsHideHomeHead', true)
        },
        methods: {
            nav ({params}) {
                this.currentNav = params
                this.$store.commit(mutationTypes.currentBetSelect, null)  // 切换隐藏投注框
                switch (params) {
                case 'noEnd':
                case 'end':
                    if (params === 'noEnd') {
                        _hmt.push(['_trackEvent', 'off_全部赛事未结束点击', 'click', 'off_全部赛事未结束'])
                    } else {
                        _hmt.push(['_trackEvent', 'off_全部赛事已结束点击', 'click', 'off_全部赛事已结束'])
                    }
                    this.$router.replace(`/h5/matchList/${params}/`)
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
                } else {
                    this.$store.dispatch('doAuth')
                }
                _hmt.push(['_trackEvent', 'off_全部赛事页猜球记录点击', 'click', 'off_全部赛事页猜球记录'])
            }
        }
    }
</script>
