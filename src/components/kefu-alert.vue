<template>
    <div class="pop pop02 pop-opinion" :class="{'hide':kefuAlert}">
        <div class="pop_layer"  v-tap="{methods:closekefu}"></div>
        <div class="pop-o">
            <span class="close" v-tap="{methods:closekefu}" >
                <span></span>
            </span>
            <div class="popTit">
                <h2>在线客服</h2>
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
    export default {
        methods: {
            closekefu () {
                this.$store.commit('setkefuAlert', true)
            }
        },
        computed: {
            kefuAlert () {
                return this.$store.state.kefuAlert
            }
        }
    }
</script>
<style>
</style>
