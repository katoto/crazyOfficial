<template>
    <div id="feedback" class="wrap respon2">
        <Public_Head class="topBar" person-title="反馈记录"></Public_Head>

        <div class="feedback-items respon2-itm">
            <ul class="full-scroll">
                <li class="">
                    <span class="ask-t">
                        待回复
                    </span>
                    <span class="ask-time">
                       2017/10/1   09:42
                    </span>
                    <p class="ask-c">
                        你们这产品呀我都不会用，什么鬼啊，叫你们老板出来啊，哼，信不信我打电话报警！
                    </p>
                </li>
                <li class="ask-hadno">
                    <span class="ask-t">
                        已回复
                    </span>
                    <span class="ask-time">
                       2017/10/1   09:42
                    </span>
                    <p class="ask-c">
                        hadno 已回复未查看.这里用js判断多行超出隐藏.差评！！！！！！！！ 差评！！！！！！！！ 差评！！！！！！！！你们这产品呀我都不会用啊叫你们负责人出来谈谈你们这产品呀我都不会用啊叫叫你们负责人...
                    </p>
                    <img src="images/testimg.png" alt="">
                    <img src="images/testimg.png" alt="">
                </li>
                <li class="ask-had">
                    <span class="ask-t">
                        已回复
                    </span>
                    <span class="ask-time">
                       2017/10/1   09:42
                    </span>
                    <p class="ask-c">
                        had已回复未查看.差差差！差差差！差差差！差差差！差差差！
                    </p>
                </li>
                <li class="ask-had">
                    <span class="ask-t">
                        已回复
                    </span>
                    <span class="ask-time">
                       2017/10/1   09:42
                    </span>
                    <p class="ask-c">
                        差差差！差差差！差差差！差差差！差差差！
                    </p>
                </li>
                <li class="ask-had">
                    <span class="ask-t">
                        已回复
                    </span>
                    <span class="ask-time">
                       2017/10/1   09:42
                    </span>
                    <p class="ask-c">
                        差差差！差差差！差差差！差差差！差差差！
                    </p>
                </li>
                <li class="ask-had">
                    <span class="ask-t">
                        已回复
                    </span>
                    <span class="ask-time">
                       2017/10/1   09:42
                    </span>
                    <p class="ask-c">
                        差差差！差差差！差差差！差差差！差差差！
                    </p>
                </li>
                <li class="ask-had">
                    <span class="ask-t">
                        已回复
                    </span>
                    <span class="ask-time">
                       2017/10/1   09:42
                    </span>
                    <p class="ask-c">
                        差差差！差差差！差差差！差差差！差差差！
                    </p>
                </li>
                <li class="ask-had">
                    <span class="ask-t">
                        已回复
                    </span>
                    <span class="ask-time">
                       2017/10/1   09:42
                    </span>
                    <p class="ask-c">
                        差差差！差差差！差差差！差差差！差差差！
                    </p>
                </li>
                <li class="ask-had">
                    <span class="ask-t">
                        已回复
                    </span>
                    <span class="ask-time">
                       2017/10/1   09:42
                    </span>
                    <p class="ask-c">
                        差差差！差差差！差差差！差差差！差差差！
                    </p>
                </li>
            </ul>
        </div>
        <p class="feedback-tips">
            感谢您的热心反馈，我们会在第一时间回复您
        </p>
    </div>
</template>

<script>
    import Public_Head from '~components/publicHead'
    import {aTypes, mTypes} from '~store/feedback'
    export default {
        data(){
            return {
                title: '我是頭部'
            }
        },
        watch: {},
        methods: {},
        computed: {},
        components: {
            Public_Head
        },
        mounted(){

        }
    }
</script>
<style>
</style>
