<template>
    <div id="feedback" class="wrap respon2">
        <!--v-if="!isHideHomeHead"-->
        <Public_Head class="topBar" person-title="我要反馈"></Public_Head>

        <div class="feedback01" :class="{'hide':!showFeedback01}">
            <div class="feedback-c">
                <div class="ask-write">
                    <textarea v-model="textareaData" id="submitcontent" placeholder="请输入您的宝贵意见或建议，我们将认真处理~谢谢！ 建议留下手机号或QQ，方便我们联系您）"></textarea>
                </div>
                <div class="ask-add-wrap">
                    <span class="ask-add" id="fileSelect" @click="checkFileReader">
                        <!--<input type="file" name="submitfile1"  @change="handleFiles">-->
                        <input type="file" name="submitfile1"  @change="handleFiles">
                    </span>
                </div>
            </div>
            <a href="javascript:;" class="btn-red btn-ask" :class="{'btn-unable':!textareaData}">
                提交反馈
            </a>
            <a href="javascript:;" style="color: #878fff ;!important;" v-tap="{methods:showkefu}" class="btn-online">
                在线客服
            </a>
        </div>

        <div class="pop pop-loading" :class="{'hide':!showLoading}">
            <img src="images/loading.svg" alt="">
            <p>正在提交</p>
        </div>

        <div class="feedback02 " :class="{'hide':!showFeedback02}">
            <span>反馈成功！</span>
            <p>
                感谢您对疯狂猜球的关注与支持，我们会认真
            </p>
            <p>
                处理您的反馈，尽快修复和完善相关功能。
            </p>
        </div>

        <div class="pop pop-imgView" style="display: none">
            <div class="pop_layer" onclick="$(this).parent().hide()"></div>
            <div class="imgView-box">
                <img id="imgMoreData" src="~static/images/testimg.png">
            </div>
        </div>

        <!--  <form id="form" enctype="multipart/form-data">-->
            <!--<input type="text" name="ck">-->
            <!--<input class="" type="file" name="image">-->
            <!--<input type="file" name="image2">-->
            <!--<input type="button" id="sendAjax" value="点击请求">-->
        <!--</form>  -->

        <!-- 吐槽弹窗 -->
        <Kefu_alert></Kefu_alert>
    </div>

</template>

<script>
    import Public_Head from '~components/publicHead'
    import Kefu_alert from '~components/kefu-alert'
    import $ from 'bc-zepto.full'
    import {aTypes, mTypes} from '~store/feedback'
    import {platform, src, getCk} from '~common/util'

    export default {
        data () {
            return {
                showkf: false,
                textareaData: '',
                showLoading: false,
                showFeedback01: true,
                showFeedback02: false
            }
        },
        methods: {
            showkefu () {
                $('#submitcontent').blur();
                this.$store.commit(mTypes.setkefuAlert, false)
            },
            handleFiles (e) {
                var that = this;
                var file = e.target.files[0]
                var reader = new FileReader()
                reader.onload = function () {
                    var imageHtml = ''
                    if (file.size > 4048576) {
                        that.$store.dispatch('showToast', '图片过大请更换');
                        return false
                    }
                    imageHtml += '<span class="itm-img"><span class="deleteimg" ></span><img src="'
                    imageHtml += reader.result + '" alt="" class="conPic1">'
                    imageHtml += '<input type="hidden" class="imagefile" name="imagefilename" value="' + reader.result + '"'
                    imageHtml += '</span>'

                    $('#fileSelect').before(imageHtml)
                }
                reader.readAsDataURL(file)
            /* 清楚数据 */
                $('.deleteimg').unbind('click')
                setTimeout(function () {
                    var imageNUm = $('.itm-img').length
                    $('.deleteimg').on('click', function () {
                        console.log('close');
                        $(this).parent().remove()
                        var imageNUm = $('.itm-img').length
                        if (!document.getElementById('fileSelect') && imageNUm < 3) {
                            $('.ask-add-wrap').append('<span class="ask-add" id="fileSelect"><input type="file" name="submitfile1" accept="image/*"  onchange="handleFiles(this.files)" ></span>')
                        }
                    })
                    $(document).on('click', '.itm-img img', function () {
                        $('#imgMoreData').parent().parent().show()
                        $('#imgMoreData').attr('src', $(this).attr('src'))
                    })
                    if (imageNUm + 1 > 3) {
                        $('#fileSelect').remove()
                        return false
                    }
                }, 100)
            },
            checkFileReader () {
                if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
                    this.$store.dispatch('showToast', '不支持图片上传')
                    return false
                }
            }
        },
        components: {
            Public_Head,
            Kefu_alert
        },
        mounted (t) {
            const options = {}
            if (process.env.NODE_ENV === 'production') {
                if (window.location.protocol === 'http:') {
                    options.baseURL = window.location.protocol + '//crazybet.choopaoo.com:6899'
                }else {
                    options.baseURL = window.location.protocol + '//crazybet.choopaoo.com:46899'
                }
            }else if (process.env.NODE_ENV === 'preRelease') {
                options.baseURL = 'http://crazybet.choopaoo.com:3899'
            } else {
                options.baseURL = '/api'
            }
            let that = this
            $('.btn-red').on('click', function () {
                let content = $('#submitcontent').val() // 内容
                let imageStr = ''
//                let img2 = ''
            // 图片base64编码
                if (!content || content === '') {
                    that.$store.dispatch('showToast', '反馈内容不可为空~')
                    return false
                } else if (content && content.length > 400) {
                    that.$store.dispatch('showToast', '超过字数限制，最多400字')
                    return false
                }
                that.showLoading = true;
                $.each($('.imagefile'), function (key, value) {
                    imageStr += $(this).val()
//                    img2 += $(this).val().split(',')[1] + '$$$$'
//                    str.slice(0,str.indexOf(',')+1)
                })
//                console.log(img2.slice(0,img2.length-3))

                $('#fileElem').remove()
                $.ajax({
                    type: 'POST',
                    url: options.baseURL + '/feedback/upload',
                    data: {
                        ck: getCk(),
                        os: platform,
                        src: src,
                        device: window.navigator.userAgent,
                        content: that.textareaData,
                        image: imageStr
                    },
                    dataType: 'json',
                    timeout: 50000,
                    success: function (d) {
                        that.showLoading = false
                        if (d.status === '100') {
                            that.showFeedback01 = false
                            that.showFeedback02 = true
                        } else {
                            that.$store.dispatch('showToast', d.message)
                        }
                    },
                    error: function (xhr, type) {
                        that.$store.dispatch('showToast', '网络请求失败，请检查')
                    }
                })
            })
        }
    }

</script>
