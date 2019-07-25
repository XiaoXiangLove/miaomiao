<template>
    <el-container>
        <el-header>喵喵电影后台管理系统，欢迎{{$store.state.user.name}}</el-header>
        <el-container>
            <el-aside width="200px">
                <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                    <el-menu default-active="1">
                        <el-menu-item index="1">
                            <router-link to="/admin/user" tag="li" slot="title"><i class="el-icon-message"></i>用户管理</router-link>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <router-link to="/admin/movie" tag="li" slot="title"><i class="el-icon-menu"></i>电影管理</router-link>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <router-link to="/admin/cinema" tag="li" slot="title"><i class="el-icon-setting"></i>影院管理</router-link>
                        </el-menu-item>
                    </el-menu>
                </el-aside>

            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import axios from "axios";
export default {
    data(){
        return {

        }
    },
    beforeRouteEnter(to,from,next){
        axios.get("/api2/users/getUser").then((res)=>{
            if(res.data.status===0){
                next(vm=>{  
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
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    padding-left: 30px ;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>