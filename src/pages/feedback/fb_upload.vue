<template>
    <div id="feedback" class="wrap respon2">
        <!--v-if="!isHideHomeHead"-->
        <Public_Head class="topBar" person-title="我要反馈"></Public_Head>

        <!--<section class="topBar">-->
            <!--<div class="icon_back"></div>-->
            <!--<h1>我要反馈</h1>-->
            <!--<a href="feedback-item.html" class="feedback-re">-->
                <!--反馈记录-->
            <!--</a>-->
        <!--</section>-->

        <div class="feedback01">
            <div class="feedback-c">
                <div class="ask-write">
                    <textarea placeholder="请输入您的宝贵意见或建议，我们将认真处理~谢谢！ 建议留下手机号或QQ，方便我们联系您）"></textarea>
                </div>
                <div class="ask-add-wrap">
                    <span class="ask-add" id="fileSelect">
                        <input type="file" id="fileElem" name="submitfile1"  @change="handleFiles" style="cursor: pointer;">
                    </span>
                </div>
            </div>
            <a href="javascript:;" class="btn-ask btn-ask-on">
                提交反馈
                <!--btn-ask 未输入内容不可提交/btn-ask-on可提交-->
            </a>
            <a href="javascript:;" class="btn-online">
                在线客服
            </a>
        </div>
        <div class="feedback02 hide">
            <img src="images/feedback/feedback-su.png" alt="">
            <span>反馈成功！</span>
            <p>
                感谢您对疯狂猜球的关注与支持，我们会认真
            </p>
            <p>
                处理您的反馈，尽快修复和完善相关功能。
            </p>
        </div>

        <!--<div class="ask-wrap">-->
            <!--<div class="ask-write">-->
                <!--<textarea name="content" id="submitcontent" class="ask-inp" placeholder="请详细描述你的问题或建议，我们将及时跟进与解决（建议添加相关问题截图）"></textarea>-->
                <!--<div class="ask-add-wrap">-->
                <!--<span class="ask-add" id="fileSelect">-->
                	<!--<input type="file" id="fileElem" name="submitfile1"  @change="handleFiles" style="cursor: pointer;">-->
                <!--</span>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="ask-btns">-->
                <!--<span class="btn-red mb10" style="cursor: pointer;">提交</span>-->
                <!--<span class="btn-white" data-href="/helpcenter/userproblem/">历史意见反馈</span>-->
            <!--</div>-->
        <!--</div>-->

    </div>

</template>

<script>
    import $ from 'bc-zepto.full'
    import Public_Head from '~components/publicHead'

    export default {
        data(){
            return {
                title: ''
            }
        },
        watch: {},
        methods: {
            handleFiles(e){
                var file = e.target.files[0];
                var reader = new FileReader();
                reader.onload = function(){
                    var imageHtml = '';
                    if(file.size > 2048576){
//                        alertTip(5);
                        console.error('文件太大')
                        return false;
                    }
                    //console.log(image);
                    imageHtml += '<span class="itm-img"><span class="deleteimg" @click="deleteimg"></span><img src="';
                    imageHtml += reader.result+'" alt="" data-src="';
                    imageHtml += reader.result+'" class="conPic1">';
                    imageHtml += '<input type="hidden" class="imagefile" name="imagefilename[]" value="'+reader.result+'"';
                    imageHtml +='</span>';

                    $("#fileSelect").before(imageHtml);
                }
                reader.readAsDataURL(file);
                /* 清楚数据 */
                setTimeout(function(){
                    var imageNUm = $('.itm-img').length;
                    if(imageNUm+1 > 3){
                        $("#fileSelect").remove();
                        return false;
                    }
                },100);
            },
            deleteimg(e){
                console.log(e.target)
                console.log($(e.target))
                console.log($(e.target).parent())
                $(e.target).parent().remove();
//                var imageNUm = $('.itm-img').length;
//                if(document.getElementById("fileSelect")){
//                }else{
//                    if( imageNUm < 3){
//                        if( window.EsApp ){
//                            $(".ask-add-wrap").append('<span class="ask-add" id="fileSelect"><input type="file" id="fileElem" name="submitfile1"  onchange="handleFiles(this.files)" style="cursor: pointer;"></span>');
//                        }else{
//                            $(".ask-add-wrap").append('<p>ffff</p>')
//                            $(".ask-add-wrap").append('<span class="ask-add" id="fileSelect"><input type="file" id="fileElem" name="submitfile1" accept="image/*"  onchange="handleFiles(this.files)" style="cursor: pointer;"></span>');
//                        }
//
//                    }
//                }

            }
    },
        computed: {

        },
        components: {
            Public_Head
        },
        mounted(){

        }
    }
</script>
<style>

</style>
