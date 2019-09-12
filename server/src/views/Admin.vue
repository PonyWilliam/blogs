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
                        <textarea v-model="content" id="content" class="weui-textarea" placeholder="你要发布的文章" maxlength="200"></textarea>
                        <div class="weui-textarea-counter"><span id="now">{{now}}</span>/200</div>
                    </div>
                </div>
        </div>
            <div class="weui-cells weui-cells_form">
    <div class="weui-cell weui-cell_vcode">
        <div class="weui-cell__hd">
            <label class="weui-label">标签</label>
        </div>
        <div class="weui-cell__bd">
            <input class="weui-input" v-model="tags" type="tel" placeholder="请输入标签，暂时不支持多个">
        </div>
        <div class="weui-cell__ft">
            <a href="javascript:;" @click="select" class="weui-vcode-btn">从系统标签中选择</a>
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
    name:'Admin',
    data(){
        return{
            title:'',
            content:'',
            tags:'',
            now:0
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
      select(){
          this.$weui.picker([
            {
                label: '默认',
                value: 0,
            },
            {
                label: '心情',
                value: 1
            },
            {
                label: '感想',
                value: 3
            },
            {
                label: '觉悟',
                value: 4,
            }
            ], {
            className: 'custom-classname',
            container: 'body',
            defaultValue: [0],
            onChange: function (result) {
            },
            onConfirm: (result)=>{this.tags = result[0]['label']},
            id: 'singleLinePicker'
            });
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
                content:this.content,
                tags:this.tags
            }).then((res)=>{
                console.log(res)
                if(res.data.code==1){
                      this.$weui.dialog({
                      title:'发表成功',
                      content:res.data.msg,
                      buttons:[{
                          label:'返回主页',
                          type:'default',
                          onClick:()=>{this.Home()}
                      },
                      {
                          label:'留在本页',
                          type:'primary'
                      }
                      ],
                  })
                  this.title=""
                  this.content = ""
                }else{
                    this.tips(this.tips(res.data.msg))
                }
            }).catch((err)=>{
                this.tips("可能是网络错误，请截图给管理员:" + err,10000)
            })
        },
        Home(){
            this.$router.push('home')
        },
        setValue(key,value){
            this.$set(key,value)
        }
    },
    updated(){
        this.now = this.content.length
    },created(){
        //刚打开就触发
        console.log('admin中的login：' + this.$store.getters.isLogin)
        
        if(!this.$store.getters.isLogin){
            this.$router.push('/login')
        }
    }
}
</script>