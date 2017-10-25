<template>
    <div class="header_pop">
        <span class="btn btn-back"  v-tap="{methods:goback}"></span>
        <h1>{{ this.personTitle }}</h1>
        <a v-tap="{methods:jumpRight}" v-if="showFeedback" class="feedback-re">
            反馈记录
            <sup class="dot" v-if="( userInfo.fb_badge && parseInt(userInfo.fb_badge)>0 )"></sup>
        </a>
    </div>
</template>

<script>
    export default {
        props: ['personTitle'],
        data () {
            return {
                showFeedback: false
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
        },
        computed: {
            userInfo () {
                return this.$store.state.userInfo
            }
        }

    }
</script>
