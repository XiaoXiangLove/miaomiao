<template>
  <div id="detialContiner" class="slide-enter-active">
      <Head :title="'影片详情'">
          <i class="iconfont icon-right" @touchstart="handleToBack"></i>
      </Head>
	  <Loading v-if="isLoading"/>
		<div id="content" class="contentDetail" v-else>
			<div class="detail_list">
				<div class="detail_list_bg" :style="{ 'background-image' : 'url(' + movieDetailData.img.replace(/w\.h/,'148.208') +')'}"></div>
				<div class="detail_list_filter"></div>
				<div class="detail_list_content">
					<div class="detail_list_img">
						<img :src="movieDetailData.img | setImg('148.208')" alt="">
					</div>
					<div class="detail_list_info">
						<h2>{{movieDetailData.nm}}</h2>
						<p>{{movieDetailData.enm}}</p>
						<p>{{movieDetailData.sc}}</p>
						<p>{{movieDetailData.cat}}</p>
						<p>{{movieDetailData.src}} / {{movieDetailData.dur}}分钟</p>
						<p>{{movieDetailData.pubDesc}}</p>
					</div>
				</div>
			</div>
			<div class="detail_intro">
				<p>{{movieDetailData.dra}}</p>
			</div>
			<div class="detail_player swiper-container" ref="detail_player">
				<ul class="swiper-wrapper">
					<li class="swiper-slide" v-for="(item,index) in movieDetailData.photos" :key="index">
						<div>
							<img :src="item | setImg('140.270')" alt="">
						</div>

					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import Head from "@/components/Header/Header.vue"
export default {
	name:"detail",
	props:["movieID"],
	data(){
		return {
			movieDetailData:{},
			isLoading:true
		}
	},
	mounted(){
		this.axios.get("/api/detailmovie?movieId=" +this.movieID).then((res)=>{
			if(res.data.msg==="ok"){
				this.isLoading = false;
				this.movieDetailData = res.data.data.detailMovie;
				this.$nextTick(()=>{
					new Swiper(this.$refs.detail_player,{
						slidePerView:"auto",
						
						freeModeSticky:true
					})
				})
			}
		})
	},
	methods:{
		handleToBack(){
			this.$router.back();
		}
	},
	components:{
		Head
	}
}
</script>
<style lang="less" scoped>
#detialContiner{position: absolute;left: 0;top: 0;width:100%;min-height: 100%;z-index: 100;background: white;}
#detialContiner .slide-enter-active{animation: 5s slideMove;}
@keyframes slideMove{
	0%{transform: translateX(100%);}
	100%{transform:translateX(0);}
}
#content.contentDetail{ display: block; margin-bottom:0;}
#content .detail_list{ height:200px; width:100%; position: relative; overflow: hidden;}
.detail_list .detail_list_bg{ width:100%; height:100%; background:0 40%; filter: blur(20px); background-size:cover; position: absolute; left: 0; top: 0;}
.detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .55; position: absolute; left: 0; top: 0; z-index: 1;}
.detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
.detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
.detail_list .detail_list_img img{ width:100%; height: 100%;}
.detail_list .detail_list_info{ margin-top: 20px;}
.detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
.detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}
#content .detail_intro{ padding: 10px;}
#content .detail_player{ margin:20px;}
#content .detail_player .swiper-slide{ width:100px !important; overflow: hidden; margin-right: 20px; text-align: center; font-size: 14px; }
.detail_player .swiper-slide img{ width:100%; margin-bottom: 5px;}
.detail_player .swiper-slide p:nth-of-type(2){ color:#999;}

</style>