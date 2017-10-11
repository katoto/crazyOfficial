<template>
    <div v-tap="{methods: trackEvent}" class="l-full">
        <div class="toast" v-show="toastMsg">{{ toastMsg }}</div>
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
    import {platform} from '~common/util'

    export default {
        data () {
            return {
                ready: false,
                platform: platform
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
            }
        },
        async mounted () {
            console.log(window.location.href)
        /* 登陆还得修改下 */
            try {
            //    线下账号  测试  !!!
//                await this.$store.dispatch('localLogin', 8);
//                await this.$store.dispatch('getUserInfo');
                /* 线上 登陆 */
//                await this.$store.dispatch('checkLogin')
//            /* 线下 登陆 */
////                await this.$store.dispatch('localCheckLogin');
//                if (this.isLogin) {
//                    await this.$store.dispatch('getUserInfo')
//                } else {
//                    /* 调登录 */
//                    window.location.href = 'http://m.500.com/user/index.php?c=home&a=login&backurl=' + location.href.split(location.pathname)[0] + '/fkcqH5/#/h5/home/hot'
////                    window.location.href = 'http://wx.500boss.com/user/index.php?c=home&a=login&backurl=' + location.href.split(location.pathname)[0] + '/fkcqH5/#/h5/home/hot'
//                    return false;
//                }

                if (window.WebSocket) {
                    await this.$store.dispatch('initWebsocket')
                } else {
                    console.warn('该设备不支持websocket')
                }
                this.ready = true
            } catch (e) {
                if (e.code === '102') {
                    try {
                        await this.$store.dispatch('initWebsocket');
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
        },
        methods: {
            trackEvent ({event}) {
                if (event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT' || event.target.tagName === 'TEXTAREA') {
                    event.target.focus()
                }
                if (event.target.tagName === 'BUTTON') {
                    event.target.click()
                }
            }
        }
    }
</script>
