<template>
    <div id="feedback" class="wrap respon2">
        <Public_Head class="topBar" person-title="反馈记录"></Public_Head>
        <div class="feedback-items respon2-itm">
            <ul class="full-scroll" v-if="feedbackList && feedbackList.fb_lst">

                <li  v-for="item in feedbackList.fb_lst"
                    :class="{'ask-had': item.fb_status==='1',
                     'ask-hadno': item.fb_status==='2'
                     }"
                >
                    <span class="ask-t">
                        {{ item.fb_status | statusFormate }}
                    </span>
                    <span class="ask-time">
                        {{ item.fb_time | formatTime_week }}
                    </span>
                    <p class="ask-c">
                        {{ item.fb_issues }}
                    </p>
                    <template v-if="item.fb_images && item.fb_images.length>0">
                        <img v-for="imgItem in item.fb_images" v-tap="{'methods': showMoreImg ,params:imgItem }" :src=imgItem>
                    </template>
                </li>
            </ul>
        </div>
        <p class="feedback-tips">
            感谢您的热心反馈，我们会在第一时间回复您
        </p>
        <!-- 弹窗 -->
        <div class="pop pop-imgView" :class="{'hide':!showPopImg}">
            <div class="pop_layer"  v-tap="{'methods': closePopImg }"></div>
            <div class="imgView-box">
                <img id="imgMoreData" :src=moreImgView >
            </div>
        </div>

    </div>
</template>

<script>
    import Public_Head from '~components/publicHead'
    import {aTypes, mTypes} from '~store/feedback'
    export default {
        data(){
            return {
                title: '',
                moreImgView:'',
                showPopImg:false,
            }
        },
        watch: {},
        methods: {
            showMoreImg({params}){
                this.showPopImg = true;
                this.moreImgView = params;
            },
            closePopImg(){
                this.showPopImg = false;
            }
        },
        computed: {
            feedbackList(){
                return this.$store.state.feedback.feedbackList
            }
        },
        components: {
            Public_Head
        },
        mounted(){
            this.$store.dispatch(aTypes.getFeedbackList);
        },
        filters: {
            format: (num) => {
//                金币格式处理
                num = Number(num);
                if (num < 10000) {
                    return num
                } else if (num < 100000000) {
                    return Math.round(num / 10000 * 10) / 10 + '万'
                } else {
                    return Math.round(num / 100000000 * 10) / 10 + '亿'
                }
            },
            statusFormate:(status)=>{
                status = status || '0';
                switch (status){
                    case '0':
                        return '待回复'
                        ;break;
                    case '1':
                    case '2':
                        return '已回复'
                        ;break;
                }
            },
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

                let weekFormate = function (weekDay) {
                    switch (weekDay) {
                        case 0: return '周日'
                        case 1: return '周一'
                        case 2: return '周二'
                        case 3: return '周三'
                        case 4: return '周四'
                        case 5: return '周五'
                        case 6: return '周六'
                        default : return '时间有误'
                    }
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
                        case 'WW':
                            return weekFormate(t.getDay())
                    }
                })
            }
        },
    }
</script>
<style>
</style>
