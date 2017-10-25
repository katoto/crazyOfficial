<template>
    <div class="pop pop02 pop-help">
        <div class="pop_layer" v-tap="{methods:closeHelpBox}"></div>
        <div class="popIn">
        <span class="close" v-tap="{methods:closeHelpBox}">
            <span></span>
        </span>
            <div class="popTit">
                <h2 class="title">玩法说明</h2>
            </div>
            <div class="box">
                <div class="respon2">
                    <div class="respon2-itm">
                        <div class="full-scroll">
                            <div class="list" v-tap="{methods:helpItem,helpSel:'helpSel_1'}">
                                <div class="list-cont">
                                    <div class="cont-tit">
                                        <h4>怎样才能参与竞猜呢？</h4>
                                        <i class="icon-raw" :class="{ 'rotate180':!helpSel.helpSel_1 }"></i></div>
                                    <div class="cont" :class="{ 'hide': !helpSel.helpSel_1}">
                                        您只需要注册新的账号，或者登陆您已有的账号，我们会附赠您少量初始猜球币，欢迎体验。
                                    </div>
                                </div>
                            </div>
                            <div class="list" v-tap="{methods:helpItem,helpSel:'helpSel_2'}">
                                <div class="list-cont">
                                    <div class="cont-tit">
                                        <h4>什么是猜球币？如何获得？</h4>
                                        <i class="icon-raw" :class="{ 'rotate180':!helpSel.helpSel_2 }"></i></div>
                                    <div class="cont" :class="{ 'hide': !helpSel.helpSel_2}">
                                        猜球币是竞猜过程中需要使用的一种虚拟币，只可进行竞猜，不可提款。猜球币可以通过初始赠送，运营活动，或者充值获取。
                                    </div>
                                </div>
                            </div>
                            <div class="list" v-tap="{methods:helpItem,helpSel:'helpSel_3'}">
                                <div class="list-cont">
                                    <div class="cont-tit">
                                        <h4>猜球币充值有哪些方式？</h4>
                                        <i class="icon-raw" :class="{ 'rotate180':!helpSel.helpSel_3 }"></i></div>
                                    <div class="cont" :class="{ 'hide': !helpSel.helpSel_3}">本收银台支持500余额支付、连连支付、支付宝支付，不包括500红包</div>
                                </div>
                            </div>
                            <div class="list" v-tap="{methods:helpItem,helpSel:'helpSel_4'}">
                                <div class="list-cont">
                                    <div class="cont-tit">
                                        <h4>封盘会在哪些情况下出现？</h4>
                                        <i class="icon-raw" :class="{ 'rotate180':!helpSel.helpSel_4 }"></i></div>
                                    <div class="cont" :class="{ 'hide': !helpSel.helpSel_4}">
                                        系统在进行到85分钟自动封盘，另外某些情况下在调整盘口和赔率时，可能会出现短时间内无法投注的情况。
                                    </div>
                                </div>
                            </div>
                            <div class="list" v-tap="{methods:helpItem,helpSel:'helpSel_5'}">
                                <div class="list-cont">
                                    <div class="cont-tit">
                                        <h4>竞猜结果是怎样结算的？</h4>
                                        <i class="icon-raw" :class="{ 'rotate180':!helpSel.helpSel_5 }"></i></div>
                                    <div class="cont" :class="{ 'hide': !helpSel.helpSel_5}">
                                        竞猜结果以第三方数据做标准，保证真实可信，猜球币奖励与猜球时约定的最终获得猜球币有关。小数点后的猜球币数额不显示
                                    </div>
                                </div>
                            </div>
                            <div class="list" v-tap="{methods:helpItem,helpSel:'helpSel_6'}">
                                <div class="list-cont">
                                    <div class="cont-tit">
                                        <h4>比赛取消怎样结算？</h4>
                                        <i class="icon-raw" :class="{ 'rotate180':!helpSel.helpSel_6 }"></i></div>
                                    <div class="cont" :class="{ 'hide': !helpSel.helpSel_6}">取消（包含延期1天以上）的比赛退回原有竞猜的猜球币。
                                    </div>
                                </div>
                            </div>
                            <div class="list" v-tap="{methods:helpItem,helpSel:'helpSel_7'}">
                                <div class="list-cont">
                                    <div class="cont-tit">
                                        <h4>异常情况订单的处理？</h4>
                                        <i class="icon-raw" :class="{ 'rotate180':!helpSel.helpSel_7 }"></i></div>
                                    <div class="cont" :class="{ 'hide': !helpSel.helpSel_7}">
                                        因突然停电，网络异常，数据源错误等不可抗因素导致结算异常的，系统会对异常订单进行撤单退款。
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="help-tips">
                <p>
                    相关说明：
                </p>
                <p>
                    1:本竞猜所有内容由《疯狂猜球提供，凡参与竞猜，即同意上述规则。
                </p>
                <p>
                    2:任何使用作弊行为获利的用户，《疯狂猜球》运营团队有权追回违规说得，数额较大者进行封号处理。
                </p>
                <p>
                    3:上述规则的解释权归《疯狂猜球》运营团队所有。
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                helpSel: {
                    helpSel_1: true,
                    helpSel_2: false,
                    helpSel_3: false,
                    helpSel_4: false,
                    helpSel_5: false,
                    helpSel_6: false,
                    helpSel_7: false
                }
            }
        },
        methods: {
            helpItem ({helpSel}) {
                //                切换帮助里头的选项
                switch (helpSel) {
                    case 'helpSel_1':
                        this.helpSel.helpSel_1 = !this.helpSel.helpSel_1
                        break
                    case 'helpSel_2':
                        this.helpSel.helpSel_2 = !this.helpSel.helpSel_2
                        break
                    case 'helpSel_3':
                        this.helpSel.helpSel_3 = !this.helpSel.helpSel_3
                        break
                    case 'helpSel_4':
                        this.helpSel.helpSel_4 = !this.helpSel.helpSel_4
                        break
                    case 'helpSel_5':
                        this.helpSel.helpSel_5 = !this.helpSel.helpSel_5
                        break
                    case 'helpSel_6':
                        this.helpSel.helpSel_6 = !this.helpSel.helpSel_6
                        break
                    case 'helpSel_7':
                        this.helpSel.helpSel_7 = !this.helpSel.helpSel_7
                        break
                    case 'backHistory':
                        window.history.back()
                        break
                }
            },
            closeHelpBox(){
                this.$store.commit('showHelpbox',false)
            }
        },
        computed:{
            showHelpbox(){
                return this.$store.state.showHelpbox
            },
        }
    }
</script>
