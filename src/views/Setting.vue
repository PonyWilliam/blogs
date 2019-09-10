<template>
<div>
<div class="weui-cells__title">账号密码设置</div>
    <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label">Pwd:</label></div>
            <div class="weui-cell__bd">
                <input v-model="pwd" class="weui-input" type="password" pattern="[0-16]*"/>
            </div>
        </div>
            <div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label">校验码:</label></div>
            <div class="weui-cell__bd">
                <input v-model="code" class="weui-input" type="password" pattern="[0-6]*"/>
            </div>
        </div>
    </div>

    <div class="weui-btn-area">
        <a class="weui-btn weui-btn_primary" @click="login" id="showTooltips">登陆</a>
    </div>


<div class="weui-toptips weui-toptips_warn js_tooltips"></div>
</div>
</template>
<script>
    import $ from 'jquery'
    import axios from 'axios'
export default {
  name:'Login',
  data(){
      return{
          pwd:'',
          code:''
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
      settings(){
          if(!this.pwd){
              tips("请输入要设置的密码")
              return
          }
          if(!this.code){
              tips("请输入校验码")
              return
          }
          axios.post({
              method:'get',
              url:'/setting',
              data:{'user':this.user,'password':this.password,'code':this.code}
          }).then((res)=>{
              if(res.data.code==1){
                  this.$weui.dialog({
                      title:'更改成功',
                      content:res.msg
                  })
                  this.password = ''
                  this.code = ''
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