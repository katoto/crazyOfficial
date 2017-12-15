<template>
    <div class="header_pop">
        <span class="btn btn-back" v-if=" !(this.personTitle ==='疯狂猜球-猜足球赢豪礼' && this.isCopyWeix ) "  v-tap="{methods:goback}"></span>
        <h1>{{ this.personTitle }}</h1>
        <a v-tap="{methods:jumpRight}" v-if="showFeedback" class="feedback-re">
            反馈记录
            <sup class="dot" v-if="( userInfo.fb_badge && parseInt(userInfo.fb_badge)>0 )"></sup>
        </a>
    </div>
</template>

<script>
    import { isWeiX } from '~common/util'
    export default {
        props: ['personTitle'],
        data () {
            return {
                showFeedback: false,
                isCopyWeix:null,
            }
        },
        methods: {
            goback () {
                if (this.personTitle === '商城') {
                    this.$router.push('/h5/home')
                } else {
                    window.history.back()
                }
            },
            jumpRight () {
                if (this.personTitle === '我要反馈') {
                    _hmt.push(['_trackEvent', 'off_我要反馈点击', 'click', 'off_我要反馈'])
                    this.$router.push('/fb_list')
                }
            }
        },

        mounted () {
            if (this.personTitle === '我要反馈') {
                this.showFeedback = true
            }
            this.isCopyWeix = isWeiX ;
            console.log( this.isCopyWeix );
        },
        computed: {
            userInfo () {
                return this.$store.state.userInfo
            }
        }
    }
</script>
