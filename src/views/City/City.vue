<template>
	<div class="city_body">
		<div class="city_list">
			<Loading v-if="isLoading"/>
			<Scroller ref="city_list" v-else>
			<div>
				<div class="city_hot">
					<h2>热门城市</h2>
					<ul class="clearfix">
						<li v-for="item in hotCityList" :key="item.id" @tap="HandleToCity(item.nm,item.id)">{{item.nm}}</li>
					</ul>
				</div>
				<div class="city_sort" ref="city_sort">
					<div v-for="item in cityList" :key="item.index">
						<h2 >{{item.index}}</h2>
						<ul>
							<li v-for="sub in item.list" :key="sub.id" @tap="HandleToCity(sub.nm,sub.id)">{{sub.nm}}</li>
						</ul>
					</div>	
				</div>
			</div>
			</Scroller>
		</div>
		<div class="city_index">
			<ul>
				<li v-for="(item,index) in cityList" :key="index" @touchstart = "HandleToIndex(index)">{{item.index}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name:"city",
	data(){
		return {
			hotCityList:[],
			cityList:[],
			isLoading :true
		}
	},
	mounted(){
		let localDataHotCityList = window.localStorage.getItem("hotCityList");
		let localDataCityList = window.localStorage.getItem("cityList");
		//如果本地有储存城市数据，就从本地获取，反之则从后端获取
		if(localDataHotCityList&&localDataCityList){			
			this.hotCityList = JSON.parse(localDataHotCityList);
			this. cityList = JSON.parse(localDataCityList);
			this.isLoading = false;

		}else{
			this.axios.get('/api/cityList').then((res)=>{
			if(res.data.msg=="ok"){		//安全校验  每次请求都需要做
				let {hotCityList,cityList} = this.FormatCityList(res.data.data.cities);	//开始执行数据的整理
				this.hotCityList = hotCityList;
				this.cityList = cityList;		
				this.isLoading = false;
				//把数据存入本地，减少对后端的请求次数		因城市数据不经常变动
				window.localStorage.setItem("hotCityList",JSON.stringify(hotCityList));
				window.localStorage.setItem("cityList",JSON.stringify(cityList));
			}
		})
		}
		
	},
	methods:{
		//   格式化城市数据
		FormatCityList(cities){
			let hotCityList = [];
			let cityList = [];
			for (let i = 0; i < cities.length; i++) {
				if (cities[i].isHot ===1) {
					hotCityList.push(cities[i]);
				}
			}
			for (let i = 0; i < cities.length; i++) {
				let filter = cities[i].py.substring(0,1).toUpperCase();
				if(ToCom(filter)){		//新添加的数据
					cityList.push({index:filter,list:[{nm:cities[i].nm,id:cities[i].id}]})
				}
				else{			//追加已有的数据
					for (let j = 0; j < cityList.length; j++) {
						if (cityList[j].index===filter) {
							cityList[j].list.push({nm:cities[i].nm,id:cities[i].id})	
						}
					}
				}
			}
			cityList.sort((n1,n2)=>{	//排序	通过对比两条数据的索引	最终按照 A - Z 的顺序排列
				if(n1.index < n2.index){
					return -1;
				}else if(n1.index > n2.index){
					return 1;
				}else{
					return 0;
				}
			})
			function ToCom(filter){		//遍历存入的数据中是否有索引 与当前截取的字符相等
				for (let i = 0; i < cityList.length; i++) {
					if (cityList[i].index === filter) return false;
				}
				return true;
			}	
			return {hotCityList,cityList};
		},
		//点击页面右侧的索引可以移动到到对应的城市列表
		HandleToIndex(index){
			let h2 = this.$refs.city_sort.getElementsByTagName("h2");
			this.$refs.city_list.ScrollToTop(-h2[index].offsetTop);		//调用子组件自身的方法，并传入y轴的值
		},
		HandleToCity(nm,id){
			this.$store.commit("city/CITY_INFO",{nm,id});
			window.localStorage.setItem('nowCitynm',nm);
			window.localStorage.setItem('nowCityid',id);
			this.$router.push("./movie/nowplaying");	//编程式导航  跳转到正在热映页面
		}
	}
}
</script>
<style lang="less" scoped>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{background-color:transparent;width:0;}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>