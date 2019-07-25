<template>
  <div id="register">
      <div class="register_email">
          邮箱：<input v-model="email" class="register_text" type="text"> <button :disabled="disabled" @touchstart="handleToVerify">{{ verifyInfo }}</button>
      </div>
      <div>
          用户名：<input v-model="username" class="register_text" type="text">
      </div>
      <div>
          密码：<input v-model="password" class="register_text" type="password">
      </div>
      <div>
          确认密码：<input class="register_text" type="password">
      </div>
      <div>
          验证码：<input v-model="verify" class="register_text" type="text">
      </div>
      <div class="register_btn">
          <button @touchstart="handleToRegister">注册</button>
      </div>
      <div class="register_link">
          <router-link to="/mine/login">立即登录</router-link>
          <router-link to="/mine/findPassword">找回密码</router-link>
      </div>
  </div>
</template>

<script>
import {messageBox} from "@/module/MessageBox/index.js";
export default {
    name:"register",
    data(){
        return {
            username:"",
            password:"",
            email:"",
            verify:""
        }
    },
    methods:{
        handleToVerify(){
            this.axios.get("/api2/users/verify?email="+this.email).then((res)=>{
                if (res.data.status===0) {
                    messageBox({
                      title:"提示",
                      content:"验证码已发送",
                      ok:"确定"
                  })
                }else{
                    messageBox({
                      title:"提示",
                      content:"验证码发送失败",
                      ok:"确定"
                  })
                }
            })
        },
        handleToRegister(){
            this.axios.post("/api2/users/register",{
                username:this.username,
                password:this.password,
                email:this.email,
                verify:this.verify
            }).then((res)=>{
                let that = this;
                if(res.data.status===0){
                    messageBox({
                      title:"提示",
                      content:"注册成功",
                      ok:"确定",
                      handleOk(){
                          that.$router.push("/mine/login");
                      }
                  })
                }else{
                    messageBox({
                      title:"提示",
                      content:"注册失败",
                      ok:"确定"
                  })
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
#content #register{width:100%;}
#register .register_text{ width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;}
#register .register_btn{ height:50px; margin:10px;}
#register .register_email{ position: relative;}
#register .register_email button{ position: absolute; right:10px; top:10px; height:30px; border-radius: 3px; border:none; padding:5px;}
#register .register_btn button{ width:100%; height:100%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
#register .register_link{ display: flex; justify-content:space-between;}
#register .register_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}
</style>