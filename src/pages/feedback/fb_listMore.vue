<template>
    <div id="feedback-answered" class="wrap respon2">
        <Public_Head class="topBar" person-title="反馈详情"></Public_Head>

        <div class="respon2-itm">
            <div class="full-scroll">
                <div class="my-ask">
                    <span class="ask-t">
                        我的反馈
                    </span>
                    <span class="ask-time">
                       2017/10/1   09:42
                    </span>
                    <p class="ask-c">
                        你们这产品呀我都不会用，什么鬼啊，叫你们老板出来啊，哼，信不信我打电话报警！
                    </p>
                    <span class="itm-img">
                        <img src="~static/images/testimg.png" alt="">
                    </span>
                </div>
                <div class="my-answer">
                    <span class="ask-t">
                        客服回复
                    </span>
                    <span class="ask-time">
                       2017/10/1   09:42
                    </span>
                    <p class="ask-c">
                        ^_^ 这个表情写死在开头，您好，再说我扣你钱！我们产品
                        是国家许可的啦啦啦啦啦！我们产品是国家许可的啦啦啦啦
                        啦！我们产品是国家许可的啦啦啦啦啦！我们产品是国家许可的啦啦啦啦
                        啦！我们产品是国家许可的啦啦啦啦啦！我们产品是国家许可的啦啦啦啦
                        啦！我们产品是国家许可的啦啦啦啦啦！我们产品是国家许可的啦啦啦啦
                        啦！我们产品是国家许可的啦啦啦啦啦！我们产品是国家许可的啦啦啦啦
                        啦！我们产品是国家许可的啦啦啦啦啦！我们产品是国家许可的啦啦啦啦
                        啦！我们产品是国家许可的啦啦啦啦啦！我们产品是国家许可的啦啦啦啦
                        啦！我们产品是国家许可的啦啦啦啦啦！我们产品是国家许可的啦啦啦啦
                        啦！我们产品是国家许可的啦啦啦啦啦！我们产品是国家许可的啦啦啦啦
                        啦！我们产品是国家许可的啦啦啦啦啦！我们产品是国家许可的啦啦啦啦
                        啦！我们产品是国家许可的啦啦啦啦啦！我们产品是国家许可的啦啦啦啦
                        啦！我们产品是国家许可的啦啦啦啦啦！我们产品是国家许可的啦啦啦啦
                        啦！我们产品是国家许可的啦啦啦啦啦！我们产品是国家许可的啦啦啦啦
                        啦！我们产品是国家许可的啦啦啦啦啦！我们产品是国家许可的啦啦啦啦
                        啦！我们产品是国家许可的啦啦啦啦啦！我们产品是国家许可的啦啦啦啦
                        啦！我们产品是国家许可的啦啦啦啦啦！我们产品是国家许可的啦啦啦啦
                        啦！我们产品是国家许可的啦啦啦啦啦！我们产品是国家许可的啦啦啦啦
                        啦！我们产品是国家许可的啦啦啦啦啦！我们产品是国家许可的啦啦啦啦
                        啦！我们产品是国家许可的啦啦啦啦啦！我们产品是国家许可的啦啦啦啦
                        啦！我们产品是国家许可的啦啦啦啦啦！我们产品是国家许可的啦啦啦啦
                        啦！我们产品是国家许可的啦啦啦啦啦！我们产品是国家许可的啦啦啦啦
                        啦！我们产品是国家许可的啦啦啦啦啦！我们产品是国家许可的啦啦啦啦
                        啦！我们产品是国家许可的啦啦啦啦啦！
                    </p>
                    <span class="itm-img">
                        <img src="images/testimg.png" alt="">
                    </span>
                </div>
                <!--未回复-->
                <p class="ask-answeredTips hide">
                    暂无回复，我们会尽快处理
                </p>
            </div>
        </div>
        <p class="feedback-tips">
            没解决问题？请联系
        </p>
        <a href="javascript:;" v-tap="{methods : showkefu }" class="btn-online">
            在线客服
        </a>

        <!-- 吐槽弹窗 -->
        <Kefu_alert></Kefu_alert>


    </div>
</template>

<script>
    import Kefu_alert from '~components/kefu-alert'
    import Public_Head from '~components/publicHead'

    import {aTypes, mTypes} from '~store/feedback'

    export default {
        data(){
            return {
                title: ''
            }
        },
        watch: {},
        methods: {
            showkefu(){
                this.$store.commit(mTypes.setkefuAlert , false)
            },
        },
        computed: {},
        components: {
            Public_Head,
            Kefu_alert
        },
        mounted(){

        }
    }
</script>
<style>
</style>
