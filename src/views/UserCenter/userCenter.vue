<template>
    <div id="userCenter">
        个人中心：
        <p>当前用户：{{$store.state.user.name}}</p><a href="javescript:;" @touchstart="handleToLogout">退出</a>
        
        <div v-if="$store.state.user.isAdmin">当前身份：管理员  <a href="/admin" target="_blank">进入后台管理</a></div>
        <div v-else>当前身份：普通用户</div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name:"userCenter",
    data(){
        return {

        }
    },
    methods:{
        handleToLogout(){
            this.axios.get("/api2/users/logout").then((res)=>{
                if(res.data.status===0){
                    this.$store.commit("user/USER_NAME",{name:"",isAdmin:false})
                    this.$router.push("/mine/login");
                }
            })
        }
    },
    //在这个导航守卫的内部不能获取组件实例 'this'
    //因为在守卫执行前，组件还没有被实例化
    beforeRouteEnter(to,from,next){
        axios.get("/api2/users/getUser").then((res)=>{
            if(res.data.status===0){
                next(vm=>{  
                    //因为跳转到后台管理界面是用的a标签，刷新页面后无法使用状态管理
                    localStorage.setItem("name",res.data.data.username);
                    localStorage.setItem("isAdmin",res.data.data.isAdmin);
                    //但是在这里可以通过回调函数来访问vm的实例
                    vm.$store.commit("user/USER_NAME",{name:res.data.data.username,isAdmin:res.data.data.isAdmin})
                })
            }else{
                next('/mine/login');
            }
        })
    }
}
</script>
<style lang="less" scoped>
    a{color: red;}
</style>