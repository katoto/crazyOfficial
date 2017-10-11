<template>
    <div class="pop pop_jiajiang">
        <div class="pop_layer" v-tap="{ methods:showAwardBoxFn}"></div>
        <div class="popIn">
            <div class="box">
                <img :src="setAwardImg"  @error="imgOnErrorLogo">
            </div>
            <span class="close" v-tap="{ methods:showAwardBoxFn}"></span>
            <a href="javascript:;" class="pop-down"  v-tap="{ methods:downLoadApp}">
                {{msg}}<i>{{msg2}}</i>
            </a>
        </div>
    </div>
</template>

<script>
    import {platform} from '~common/util'
    export default {
        data () {
            return {
                msg:'下载APP 加奖',
                msg2:'10%'
            }
        },
        watch: {},
        methods: {
            showAwardBoxFn () {
                this.$store.commit('showAwardbox', false)
            },
            imgOnErrorLogo (that) {
                that.target.setAttribute('src', 'https://crazybet.choopaoo.com/img/esun/upload/8c/70/8c705f765b1611e7b209.jpg')
            },
            downLoadApp(){
                if (platform === 'android') {
                    window.location.href = 'http://download.choopaoo.com/download/cbet_for_Android_500cpH5.apk'
                } else {
                    window.location.href = 'https://at.umeng.com/uKrSPn?cid=481'
                }
                _hmt.push(['_trackEvent', '500fkcqH5_下载app(嘉奖)点击', 'click', '500fkcqH5_下载app']);
            }
        },
        computed: {
            setAwardImg () {
                return this.$store.state.awardAllData.setAwardImg
            }
        }
    }
</script>
<style>
</style>
