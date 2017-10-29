<template>
    <div class="pop pop02 pop_msg message">
        <div class="pop_layer" v-tap="{ methods:closeMessbox }"></div>
        <div class="popIn">
            <span class="close" v-tap="{ methods:closeMessbox }">
                <span></span>
            </span>
            <div class="popTit">
                <h2 class="title">我的消息</h2>
                <span class="user_id" v-if="userInfo">ID：{{ userInfo.uid }}</span>
            </div>
            <div class="box">
                <!-- 消息为空-->
                <div class="emptyBox respon2" :class="{'hide':messageList.length}">
                    <div class="empty respon2-itm">
                        <div class="emptyIn">
                            <span class="icon icon_empty"></span>
                            <p>近期无消息</p>
                        </div>
                    </div>
                </div>
                <!-- 消息不为空 -->
                <div class="scroller">
                    <div  id="MatchListDom">
                        <div class="msg_item" v-for="msg in messageList" :class="{ 'msg_item_yidu' : !msg.valid }">
                            <div class="msg_tit"  v-tap="{methods: switchMsgContent, cid: msg.cid}">
                                <h3>[{{ msg.pid?'奖励':'系统' }}] {{ msg.title }}<sup v-if="(msg.pid && msg.valid )|| (!msg.pid && msg.isnew==='1' )"></sup></h3>
                                <p class="msg_time">{{msg.time}}</p>
                                <!-- 点击可折叠 -->
                                <i class="icon icon_raw" v-if="msg.cid"
                                 :class="{'icon_rawdown':!showsContent[msg.cid] }"
                                ></i>
                            </div>
                            <!--<div class="msg_cont" :class="{'hide':!msg.pid && !showsContent[msg.cid] }">-->
                            <div class="msg_cont">
                                <!--style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);"-->
                                {{msg.content}}
                            </div>
                            <template v-if="msg.pid">
                                <div class="jiangli">
                                    <strong class="yellow">奖励{{msg.award_num}}猜球币</strong>
                                    <span class="btn-lingqu btn-lingqu-no" key="liqu" v-if="msg.valid"  v-tap="{methods: lq, params: msg.pid}">领取</span>
                                    <span class="btn-lingqu btn-lingqu-no" style="background-color: transparent; color: #6f799a" key="liqu_ok" v-if="!msg.valid"  v-tap="{methods: lq, params: msg.pid}">已领取</span>
                                </div>
                                <div class="toast" v-if="msg.showSucc">领取成功</div>
                            </template>
                        </div>

                        <p class="message-tips" :class="{'hide':!messageList.length}" v-show="isAddMessList">加载中...</p>
                        <p class="message-tips" :class="{'hide':!messageList.length || messageList.length<3 }">只显示最近的50条系统消息</p>
                        <p class="message-tips" style="position: fixed;bottom: 0;width:100%;" :class="{'hide':!messageList.length || messageList.length >= 3 }">只显示最近的50条系统消息</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {starHtml} from '~common/util'
    export default {
        data () {
            return {
                title: '',
                showsContent: {}
            }
        },
        watch: {},
        methods: {
            switchMsgContent ({cid}) {
                if (!cid) {
                    return false
                }
                Vue.set(this.showsContent, cid, !this.showsContent[cid])
            },
            closeMessbox () {
                //  关闭 消息
                starHtml()
                this.$store.commit('showMessbox', false)
                this.$store.dispatch('getUserInfo')
            },
            lq ({params}) {
//                领取金币
                this.$store.dispatch('lqPrize', params)
            },
            onScroll (event) {
                var offsetHeight = document.getElementById('MatchListDom').offsetHeight,
                    scrollTop = event.target.scrollTop,
                    scrollBottom = windowHeight() + scrollTop + 10

                if (scrollTop === 0) {
                    if (this.messPageNum === 1) {
                        return
                    }
                }
                if (scrollBottom >= offsetHeight) {
                    console.log('到底在 可以去请求数据了')
                    this.throttle(this.changePgItems)
                }
                function windowHeight () {
                    return (document.compatMode === 'CSS1Compat')
                        ? document.documentElement.clientHeight
                        : document.body.clientHeight
                }
            },
            throttle (method, context) {
//               函数节流
                clearTimeout(method.tId)
                method.tId = setTimeout(() => { method() }, 50)
            },
            changePgItems () {
                this.$store.dispatch('getMessageList', this.messPageNum)
            }
        },
        computed: {
            userInfo () {
                return this.$store.state.userInfo
            },
            messageList () {
                return this.$store.state.msgAllData.messageList
            },
            messPageNum () {
                return this.$store.state.msgAllData.messPageNum
            },
            isNoneMessList () {
                return this.$store.state.msgAllData.isNoneMessList
            },
            isAddMessList () {
                return this.$store.state.msgAllData.isAddMessList
            }
        },
        mounted () {
            setTimeout(() => {
                let messageDom = document.querySelector('.message')
                messageDom && messageDom.addEventListener('scroll', this.onScroll)
            }, 100)
            this.$store.state.msgAllData.isNoneMessList = false
        }
    }
</script>
