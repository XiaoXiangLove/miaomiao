<template>
  <div class="movie_body">
	  <loading v-if="isLoading"/>
	  <Scroller v-else :HandleToScroll="HandleToScroll" :HandleToTouchEnd="HandleToTouchEnd">
		<ul>
			<li class="pullTip">{{pullTip}}</li>
			<li v-for="item in comingList" :key="item.id">
				<div class="pic_show" @tap="HandleToDetial(item.id)"><img :src="item.img | setImg('128.180')"></div>
				<div class="info_list">
					<h2 @tap="HandleToDetial(item.id)">{{item.nm}} <img v-if="item.version" src="@/assets/maxs.png"/></h2>
					<p><span class="person">{{item.wish}}</span> 人想看</p>
					<p>主演: {{item.star}}</p>
					<p>{{item.rt}}上映</p>
				</div>
				<div class="btn_pre">
					预售
				</div>
			</li>
		</ul>
		</Scroller>
	</div>
</template>

<script>
import Bscroll from "better-scroll";
export default {
	name:"comingsoon",
	data(){
		return {
			comingList:[],
			 pullTip:"",
			 isLoading:true,
			 prevCityId : -1
		}
	},
	activated(){
		let cityID = this.$store.state.city.id;
      	if(this.prevCityID===cityID) return;           //先获取本地存储的城市id,
        this.isLoading = true;
		this.axios.get("/api/movieComingList?cityId="+cityID).then((res)=>{
			if(res.data.msg === "ok"){
				this.isLoading = false;
				this.comingList = res.data.data.comingList;
				this.prevCityID = cityID;
			}	
		})
	},
	methods:{
		HandleToDetial(movieId){
			this.$router.push("/movie/detail/2/" + movieId);     //跳转到详情页并传递参数
		},
		//以下两个函数是给子组件传递的数据
		HandleToScroll(pos){
			if(pos.y > 30){
				this.pullTip = "正在更新中";         
			} 
		},
		HandleToTouchEnd(pos){
			if (pos.y > 30) {
				this.axios.get("/api/movieComingList?cityId=10").then((res)=>{
				if(res.data.msg == "ok"){
					this.pullTip = "更新成功";
					setTimeout(()=>{
						this.comingList = res.data.data.comingList;
						this.pullTip = "";
					},1000);
				}
				});
			}
		}
	}
}
</script>
<style lang="less" scoped>
.movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
.movie_body .pullTip{margin: 0;padding: 0;border: none;}
</style>