<template>
    <div class="cinema_body">
        <Loading v-if="isLoading"/>
        <Scroller v-else>
        <ul>
            <li v-for="item in cinemaList" :key="item.id">
                <div>
                    <span>{{item.nm}}</span>
                    <span class="q"><span class="price">{{item.sellPrice}}</span> 元起</span>
                </div>
                <div class="address">
                    <span>{{item.addr}}</span>
                    <span>{{item.distance}}</span>
                </div>
                <div class="card">
                    <div v-for="(itemcard,key) in item.tag" :key="key" v-if="itemcard===1">{{key | FormatCard}}</div>
                </div>
            </li>
        </ul>
        </Scroller>
    </div>
</template>

<script>
export default {
    name:"CiList",
    data(){
        return {
            cinemaList:[],
            isLoading:true,
            prevCityID:-1
        }
    },
    activated(){
        let cityID = this.$store.state.city.id;
        if(this.prevCityID===cityID) return;           //先获取本地存储的城市id,
        this.isLoading = true;
        this.axios.get("/api/cinemaList?cityId="+cityID).then((res)=>{
            if(res.data.msg == "ok"){
                this.isLoading = false;
                this.cinemaList = res.data.data.cinemas;
                this.prevCityID = cityID;
            }
        })
    },
    filters:{
        FormatCard(key){
            let card = [
                {key : "allowRefund" , value : "退票"},
                {key : "endorse" , value : "改签"},
                {key : "sell" ,  value : "折扣卡"},
                {key : "snack" , value : "小吃"}
            ]
            for (let i = 0; i < card.length; i++) {
                if (card[i].key === key) {
                    return card[i].value;
                }
            }
            return ""
        }
    }
}
</script>
<style lang="less" scoped>
#content .cinema_body{ flex:1; overflow:auto;}
.cinema_body ul{ padding:20px;}
.cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
.cinema_body div{ margin-bottom: 10px;}
.cinema_body .q{ font-size: 11px; color:#f03d37;}
.cinema_body .price{ font-size: 18px;}
.cinema_body .address{ font-size: 13px; color:#666;}
.cinema_body .address span:nth-of-type(1){ width: 80%; overflow: hidden; white-space: nowrap; text-overflow:ellipsis; display: inline-block; }
.cinema_body .address span:nth-of-type(2){ float:right; }
.cinema_body .card{ display: flex;}
.cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
.cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
.movie_body .pullTip{margin: 0;padding: 0;border: none;}
</style>