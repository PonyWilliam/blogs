<template>
    <div>
        <div class="weui-cells__title">文章标题</div>
        <div class="weui-cells">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <input maxlength="20" v-model="title" class="weui-input" type="text" placeholder="请输入标题"/>
                </div>
            </div>
        </div>
        <div class="weui-cells__title">文章内容</div>
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__bd">
                        <textarea v-model="content" class="weui-textarea" placeholder="你要发布的文章" maxlength="200"></textarea>
                        <div class="weui-textarea-counter"><span>0</span>/200</div>
                    </div>
                </div>
        </div>
        <div class="button-sp-area">
        <a @click="push" class="weui-btn weui-btn_plain-primary">发表</a>
        </div>
        <div class="weui-toptips weui-toptips_warn js_tooltips"></div>
    </div>
</template>
<style>
    .button-sp-area{
        margin-top:50px;
        background:rgba(255, 255, 255, .55);
        display:inline-block;
    }
</style>
<script>
import $ from 'jquery'
import axios from 'axios'
export default {
    name:'admin',
    data(){
        return{
            title:'',
            content:''
        }
    },
    methods:{
      tips(msg,time=1500){
            var $tooltips = $('.js_tooltips');
            $tooltips.html(msg)
            if ($tooltips.css('display') != 'none') return;
            $('.page.cell').removeClass('slideIn');

            $tooltips.css('display', 'block');
            setTimeout(function () {
                $tooltips.css('display', 'none');
            }, time);
      },
        push(){
            if(!this.title){
                this.tips("您的文章没有输入标题")
                return
            }
            if(!this.content){
                this.tips("您的文章没有输入内容")
                return
            }
            axios.post('/article',{
                title:this.title,
                content:this.content
            }).then((res)=>{
                console.log(res)
                if(res.data.code==1){
                      this.$weui.dialog({
                      title:'发表成功',
                      content:res.data.msg
                  })
                  this.title=""
                  this.content = ""
                }else{
                    this.tips(this.tips(res.msg))
                }
            }).catch((err)=>{
                this.tips("可能是网络错误，请截图给管理员:" + err,10000)
            })
        }
    }
}
</script>