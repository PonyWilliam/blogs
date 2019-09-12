<template>
<div>
<div class="weui-cells__title">用户登陆</div>
    <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label">User:</label></div>
            <div class="weui-cell__bd">
                <input v-model="user" class="weui-input" type="text" pattern="[0-12]*"/>
            </div>
        </div>
            <div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label">Pwd:</label></div>
            <div class="weui-cell__bd">
                <input v-model="pwd" class="weui-input" type="password" pattern="[0-16]*"/>
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
    import qs from 'qs'
export default {
  name:'Login',
  data(){
      return{
          user:'',
          pwd:''
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
      login(){
          if(!this.user){
              this.tips("没有输入用户名，请输入用户名后重试",2000)
              return
          }
          if(!this.pwd){
              this.tips("没有输入密码，请输入密码后重试",2000)
              return
          }
          if(!this.pwd&&!this.user){
              this.tips("会js了不起啊？",3000)
              return
          }
          if(this.pwd&&this.user){
            axios.get(`/login?user=${this.user}&pwd=${this.pwd}`).then((res)=>{
                if(res.data.code!=0&&res.data.code!=1){
                    this.tips("网络错误，请检查网络")
                    return
                }
                if(res.data.code == 1){
                    //成功，跳转页面，由服务端再次验证是否有权访问，服务端会丢cookie的
                    this.$store.state.login += 1
                    console.log(this.$store.state.login)
                    this.$store.state.login += 1
                    console.log(this.$store.state.login)
                    this.$store.state.login += 1
                    console.log(this.$store.state.login)
                    this.$weui.dialog({
                        title:"登陆成功",
                        content:"点击确定跳转",
                        button:{
                            label:'确定',
                            type:'primary',
                            onClick:()=>{
                                console.log(this.$store.state.login)
                                this.$router.push('/admin')
                                }
                        }
                    })
                }else if(res.data.code == 0){
                    this.tips(res.data.msg)
                }else{
                    this.tips("未知错误")
                }
            })
          }else{
              this.tips("会js没用，我后端还有cookie，欢迎破解。")
          }
      }
  },
  created(){
      console.log(this.$store.state.login)
  }
}
</script>