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
            <a href="javascript:;" class="btn-red btn-ask" :class="{'btn-ask-on':textareaData}">
                提交反馈
            </a>
            <a href="javascript:;" v-tap="{methods:showkefu}" class="btn-online">
                在线客服
            </a>
        </div>

        <div class="pop pop-loading" :class="{'hide':!showLoading}">
            <img src="images/loading.svg" alt="">
            <p>正在提交</p>
        </div>

        <div class="feedback02 " :class="{'hide':!showFeedback02}">
            <img src="images/feedback/feedback-su.png" alt="">
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
        data(){
            return {
                showkf:false,
                textareaData:'',
                showLoading:false,
                showFeedback01:true,
                showFeedback02:false,
            }
        },
        methods: {
            showkefu(){
                this.$store.commit(mTypes.setkefuAlert , false)
            },
            handleFiles(e){
                var file = e.target.files[0];
                var reader = new FileReader();
                reader.onload = function(){
                    var imageHtml = '';
                    if(file.size > 2048576){
                      this.$store.dispatch('showToast', '图片太大请截图');
                        return false;
                    }
                    imageHtml += '<span class="itm-img"><span class="deleteimg" ></span><img src="';
                    imageHtml += reader.result+'" alt="" class="conPic1">';
                    imageHtml += '<input type="hidden" class="imagefile" name="imagefilename" value="'+reader.result+'"';
                    imageHtml +='</span>';

                    $("#fileSelect").before(imageHtml);
                }
                reader.readAsDataURL(file);
                /* 清楚数据 */
                $('.deleteimg').unbind('click');
                setTimeout(function(){
                    var imageNUm = $('.itm-img').length;
                    $(document).on('click', '.deleteimg', function(){
                        $(this).parent().remove();
                        var imageNUm = $('.itm-img').length;
                        if( !document.getElementById("fileSelect") && imageNUm < 3){
                            $(".ask-add-wrap").append('<span class="ask-add" id="fileSelect"><input type="file" name="submitfile1" accept="image/*"  onchange="handleFiles(this.files)" ></span>');
                        }
                    });
                    $(document).on('click', '.itm-img img', function(){
                        $('#imgMoreData').parent().parent().show();
                        $('#imgMoreData').attr('src',$(this).attr('src'))
                    });
                    if(imageNUm+1 > 3){
                        $("#fileSelect").remove();
                        return false;
                    }
                },100);
            },
            checkFileReader(){
                if ( !(window.File && window.FileReader && window.FileList && window.Blob) ){
                    this.$store.dispatch('showToast', '不支持图片上传');
                    return false;
                }
            }
        },
        components: {
            Public_Head,
            Kefu_alert
        },
        mounted(t){
            let that = this;
            $(".btn-red").on('click', function(){
                let content = $('#submitcontent').val(); //内容
                let image = [];
                let imageStr = '';
                let img2 = '';
                //图片base64编码
                if(!content || content === ''){
                    that.$store.dispatch('showToast', '反馈内容不可为空~');
                    return false;
                }
                that.showLoading = true;
                $.each( $('.imagefile'), function(key, value){
                    imageStr +=  $(this).val();
                    img2 += $(this).val().split(',')[1] +'$$$$';
//                    str.slice(0,str.indexOf(',')+1)
//                    image[key] = $(this).val();
                });
//                console.log(img2.slice(0,img2.length-3))

                $("#fileElem").remove();
//                console.log(new FormData($('#uploadForm')[0]))
//                    ,imgArr:image
//                var arr = [1,2,3]
                $.ajax({
                    type: 'POST',
                    url: 'http://192.168.50.12:9899/feedback/upload',
                    data: {
                        ck:getCk(),
                        os:platform,
                        src:src,
                        device:window.navigator.userAgent,
                        content:that.textareaData,
                        image: imageStr,
                    },
                    dataType: 'json',
                    success: function(d){
                        that.showLoading = false;
                        if(d.status==='100'){
                            that.showFeedback01 = false;
                            that.showFeedback02 = true;
                        }else{
                            that.$store.dispatch('showToast', d.message);
//                            that.$store.dispatch('showToast', '反馈上传出错，请刷新再试试~');
                        }
                    },
                    error: function(xhr, type){
                        that.$store.dispatch('showToast', '上传提交出错，请稍后再试试~~');
                    }
                });
            });

        }
    }
//    $("#sendAjax").on('click', function(){
//        console.log($('#form')[0])
//        console.log(new FormData($('#form')[0]))
//        console.log(new FormData($('#form')[0]).values)
//        $.ajax({
//            type: 'POST',
//            url: 'http://192.168.50.12:9899/feedback/upload',
////                    data: { ck: 'OTk5OTM1MGI0YjllZDcyZTdmNTY1NDAwNDczOTM1ZDg3ODU0MzE4',imgArr:arr},
//            data: new FormData($('#form')[0]),
//            processData: false,
//            contentType: false,
//            dataType: 'json',
//            success: function(d){
//                switch(d){
//                    case 0:
//                        $('.ui-alert-tips').addClass("hide");
//                        break;
//                    case 1:
//                        $('.ui-alert-tips').addClass("hide");
//                        $('.bg-staff').html('<span class="ico-done"></span>');
//                        $('.wrap').append('<div class="tips-box"><p>感谢您的反馈</p><p>我们将尽快跟进解决您的反馈，完善产品</p><span class="btn-red btn-competed" data-href="/helpcenter/" style="cursor: pointer;">完成</span></div>');
//                        $(".ask-wrap").remove();
//                        break;
//                    case 2:
//                        $('.ui-alert-tips').addClass("hide");
//                        break;
//                }
//            },
//            error: function(xhr, type){
//                $('.ui-alert-tips').addClass("hide");
//                alertTip(8);
//            }
//        });
//
//    });
</script>
