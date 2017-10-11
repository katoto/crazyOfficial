<template>
    <div class="ask-wrap">
        <div class="ask-write">
            <textarea name="content" id="submitcontent" class="ask-inp" placeholder="请详细描述你的问题或建议，我们将及时跟进与解决（建议添加相关问题截图）"></textarea>
            <div class="ask-add-wrap">
                <span class="ask-add" id="fileSelect">
                	<input type="file" id="fileElem" name="submitfile1"  @change="handleFiles" style="cursor: pointer;">
                </span>
            </div>
        </div>
        <div class="ask-btns">
            <span class="btn-red mb10" style="cursor: pointer;">提交</span>
            <span class="btn-white" data-href="/helpcenter/userproblem/">历史意见反馈</span>
        </div>
    </div>
</template>

<script>
    import $ from 'bc-zepto.full'
    export default {
        data(){
            return {
                title: '我是頭部'
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
                    imageHtml += '<span class="itm-img"><s class="deleteimg" style="cursor: pointer;"></s><img src="';
                    imageHtml += reader.result+'" alt="" data-src="';
                    imageHtml += reader.result+'" class="conPic1">';
                    imageHtml += '<input type="hidden" class="imagefile" name="imagefilename[]" value="'+reader.result+'"';
                    imageHtml +='</span>';
                    console.error('123')
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
            }
        },
        computed: {

        },
        mounted(){

        }
    }
</script>
<style>
    div{
        font-size: 16px;
    }
    img{
        width: 100px;
        height: 100px;
    }
</style>
