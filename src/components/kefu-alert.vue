<template>
    <div class="pop pop02 pop-opinion" :class="{'hide':kefuAlert}">
        <div class="pop_layer"  v-tap="{methods:closekefu}"></div>
        <div class="pop-o">
            <span class="close" v-tap="{methods:closekefu}" >
                <span></span>
            </span>
            <div class="pop-t">
                在线客服
            </div>
            <p>微信搜索 "<i>疯狂猜球服务号</i>"</p>
            <p>在线反馈您的问题</p>
            <div class="pop-img">
                <img src="~static/images/img-public.png" alt="疯狂猜球服务号">
            </div>
            <h3>还有更新资讯、福利</h3>
        </div>
    </div>
</template>

<script>
    import {aTypes, mTypes} from '~store/feedback'
    export default {
        data () {
            return {
                title: '我是頭部'
            }
        },
        watch: {},
        methods: {
            closekefu () {
                this.$store.commit('setkefuAlert', true)
            }
        },
        computed: {
            kefuAlert () {
                return this.$store.state.kefuAlert
            }
        },
        mounted () {

        }
    }
</script>
<style>
</style>
