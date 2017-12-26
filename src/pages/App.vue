<template>
    <div class="l-full">
        <div class="toast" v-show="toastMsg" :class="{'tipsHeight': showHeightTips }">{{ toastMsg }}</div>
        <router-view v-if="ready"></router-view>
        <div class="loading" v-else>
            <img src="~static/images/loading.svg" >
        </div>
    </div>
</template>
<script>
    import '~static/css/public.css'
    import '~static/css/index.css'
    import '~static/css/bet.css'
    import '~static/css/live.css'
    import '~static/css/mine.css'
    import '~static/css/media.css'
    import '~static/css/pop.css'

    import '~static/css/reg.css'
    import {platform} from '~common/util'

    export default {
        data () {
            return {
                ready: false,
                platform: platform
            }
        },
        watch: {
            '$store.state.loginSucc': function (ck) {
                if (ck) {
                    this.$store.dispatch('showToast', {
                        duration: 1000,
                        message: '登录成功',
                        cb: () => {
                            this.$store.commit('showHeightTips', false)
                        }
                    })
                } else {
                    console.error('登陆失败')
                }
            },
            '$store.state.regisSucc': function (ck) {
                if (ck) {
                    this.$store.dispatch('showToast', {
                        duration: 1000,
                        message: '注册成功',
                        cb: () => {
                            this.$store.commit('showHeightTips', false)
                        }
                    })
                } else {
                    console.error('注册失败')
                }
            }
        },
        computed: {
            userInfo () {
                return this.$store.state.userInfo
            },
            toastMsg () {
                return this.$store.state.toastMsg
            },
            isLogin () {
                return this.$store.state.isLogin
            },
            showHeightTips () {
                return this.$store.state.showHeightTips
            }
        },
        async mounted () {
        /* 登陆还得修改下 */
            try {
            //    线下账号  测试  !!!
                await this.$store.dispatch('localLogin', 12342)
                await this.$store.dispatch('getUserInfo')
            /* 线上 登陆 */
//                await this.$store.dispatch('checkLogin')

                if (this.isLogin) {
                    await this.$store.dispatch('getUserInfo')
                }

                if (window.WebSocket) {
                    await this.$store.dispatch('initWebsocket')
                } else {
                    console.warn('该设备不支持websocket')
                }
                this.ready = true
            } catch (e) {
                if (e.code === '102') {
                    try {
                        await this.$store.dispatch('initWebsocket')
                        this.ready = true
                    } catch (e) {
                        this.ready = true
                        this.$store.dispatch('showToast', '网络异常， 请稍后再试')
                    }
                } else if (e.code === '103') { // 有websocket， 但是不触发如何事件， 导致超时
                    this.ready = true
                } else {
                    this.$store.dispatch('showToast', e.message)
                }
            }
        }
    }
</script>
<style>
    .tipsHeight{
        top:30% !important;
    }
</style>
