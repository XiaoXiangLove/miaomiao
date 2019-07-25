<template>  
  <div id="main">
    <Head :title="'喵喵电影'"/>
    <div id="content">
      <div class="movie_menu">
        <router-link class="city_name" to="/movie/city">
            <span>{{$store.state.city.nm}}</span><i class="iconfont icon-lower-triangle"></i>
        </router-link>
        <div class="hot_swtich">
            <router-link class="hot_item" to="/movie/nowplaying">正在热映</router-link>
            <router-link class="hot_item" to="/movie/comingsoon">即将上映</router-link>
        </div>
        <router-link class="search_entry" to="/movie/serach">
            <i class="iconfont icon-sousuo"></i>
        </router-link>
      </div>
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
     <Foot/>
        <router-view name="detail"/>
  </div>
</template>

<script>
import Head from "@/components/Header/Header.vue"
import Foot from "@/components/Footer/Footer.vue"
import {messageBox} from "@/module/MessageBox/index.js"
export default {
  name:"movie",
  data(){
    return {

    }
  },
  mounted(){
    this.axios.get("/api/getLocation").then((res)=>{
      if(res.data.msg === "ok"){
        let nowCityData = res.data.data;
        if(nowCityData.id == this.$store.state.city.id){return;}    //城市信息与当前城市相符就不再提示  用==可以进行数据类型的隐式转换
        messageBox({
          title:"定位",
          content:nowCityData.nm,
          cancel:"取消",
          ok:"切换定位",
          handleCancel(){
            console.log(1);
          },
          handleOk(){
            window.localStorage.setItem("nowCitynm",nowCityData.nm);
            window.localStorage.setItem("nowCityid",nowCityData.id);
            window.location.reload();   //页面重新载入
          }
        });
      }
    })
    
  },
  components:{
    Head,
    Foot
  }
}
</script>
<style lang="less" scoped>
#content .movie_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-between; align-items:center; background:white; z-index:10;}
.movie_menu .city_name{ margin-left: 20px; height:100%; line-height: 45px;}
.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .hot_swtich{ display: flex; height:100%; line-height: 45px;}
.movie_menu .hot_item{ font-size: 15px; color:#666; width:80px; text-align:center; margin:0 12px; font-weight:700;}
.movie_menu .search_entry{ margin-right:20px; height:100%; line-height: 45px;}
.movie_menu .search_entry i{  font-size:24px; color:red;}
</style>