<template>
    <div id="feedback-answered" class="wrap respon2">
        <PublicHead class="topBar" person-title="反馈详情"></PublicHead>

        <div class="respon2-itm">
            <div class="full-scroll">
                <template v-if="fbMore">
                    <div class="my-ask">
                    <span class="ask-t">
                        我的反馈
                    </span>
                    <span class="ask-time">
                        {{ fbMore.fb_issue_time |formatTime_week  }}
                    </span>
                        <p class="ask-c">
                            {{ fbMore.fb_issues }}
                        </p>
                        <template v-if="fbMore.fb_images && fbMore.fb_images.length>0">
                            <span class="itm-img" v-for="imgMore in fbMore.fb_images"
                                  v-tap="{'methods': showMoreImg ,params:imgMore }"
                            >
                                <img :src=imgMore alt="">
                            </span>
                        </template>
                    </div>

                    <div class="my-answer" :class="{'hide':!( fbMore.fb_status !=='0')}">
                        <span class="ask-t">
                            客服回复
                        </span>
                        <span class="ask-time">
                            {{ fbMore.fb_comment_time | formatTime_week }}
                        </span>
                            <p class="ask-c">
                                {{ fbMore.fb_comments }}
                            </p>
                            <template v-if="fbMore.fb_comment_images && fbMore.fb_comment_images.length>0" >
                                <span class="itm-img" v-for="imgMore in fbMore.fb_comment_images"
                                      v-tap="{'methods': showMoreImg ,params:imgMore }"
                                >
                                    <img :src=imgMore >
                                </span>
                            </template>
                    </div>
                    <!--未回复-->
                    <p class="ask-answeredTips" :class="{'hide':!( fbMore.fb_status === '0')}">
                        暂无回复，我们会尽快处理
                    </p>
                    <p class="feedback-tips">
                        没解决问题？请联系
                    </p>
                    <a href="javascript:;" v-tap="{methods : showkefu }" class="btn-online">
                        在线客服
                    </a>
                </template>
            </div>
        </div>
        <div class="pop pop-imgView" :class="{'hide':!showPopImg}">
            <div class="pop_layer"  v-tap="{'methods': closePopImg }"></div>
            <div class="imgView-box" v-tap="{'methods': closePopImg }">
                <img id="imgMoreData" :src=moreImgView >
            </div>
        </div>

        <!-- 吐槽弹窗 -->
        <KefuAlert></KefuAlert>

    </div>
</template>

<script>
    import KefuAlert from '~components/kefu-alert'
    import PublicHead from '~components/publicHead'

    import {aTypes} from '~store/feedback'

    export default {
        data () {
            return {
                moreImgView: '',
                showPopImg: false
            }
        },
        methods: {
            showMoreImg ({params}) {
                this.showPopImg = true
                this.moreImgView = params
            },
            closePopImg () {
                this.showPopImg = false
            },
            showkefu () {
                this.$store.commit('setkefuAlert', false)
            }
        },
        computed: {
            fbMore () {
                return this.$store.state.feedback.fbMore
            }
        },
        components: {
            PublicHead,
            KefuAlert
        },
        mounted () {
            if (this.$route.params && this.$route.params.fbId) {
                this.$store.dispatch(aTypes.getfbListMore, this.$route.params.fbId)
                setTimeout(() => {
                    this.$store.dispatch('getUserInfo')
                }, 500)
            }
        },
        filters: {
            formatTime_week: (time, format = 'yyyy/MM/dd HH:mm') => {
                let t = new Date(parseInt(+time) * 1000)
                let tf = function (i) {
                    return (i < 10 ? '0' : '') + i
                }
                try {
                    if (~(t.toString().indexOf('GMT+00'))) {
                        t = new Date((+time * 1000) + (8 * 60 * 60 * 1000))
                    }
                } catch (e) {
                    console.error(e.message)
                }

                return format.replace(/yyyy|MM|dd|HH|mm|ss|WW/g, function (a) {
                    switch (a) {
                    case 'yyyy':
                        return tf(t.getFullYear())
                    case 'MM':
                        return tf(t.getMonth() + 1)
                    case 'mm':
                        return tf(t.getMinutes())
                    case 'dd':
                        return tf(t.getDate())
                    case 'HH':
                        return tf(t.getHours())
                    case 'ss':
                        return tf(t.getSeconds())
                    }
                })
            }
        }
    }
</script>
