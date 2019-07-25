<template>
  <div id="wrapper" ref="wrapper">
      <slot></slot>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
export default {
    name:"wrapper",
    props:{
        HandleToScroll:{
            type:Function,
            default:function(){}
        },
        HandleToTouchEnd:{
            type: Function,
            default : function(){}
        }
    },
    mounted(){
        let scroll = new Bscroll(this.$refs.wrapper,{
            tap:true,
            probeType:1
        })
        this.scroll = scroll;
        //一下两个函数是组件的默认函数，当父组件没有给该组件传递数据的时候，触发了对应时间即可调用该回调函数
        scroll.on("scroll",(pos)=>{
            this.HandleToScroll(pos);
        })
        scroll.on("touchEnd",(pos)=>{
            this.HandleToTouchEnd(pos);
        })
    },
    methods:{
        ScrollToTop(y){
            this.scroll.scrollTo(0,y);      //scrollTo方法是 better-scroll 插件自带的滚动方法，使用时需传入x和y轴的值
        }
    }
}
</script>
<style lang="less" scoped>
#wrapper{height: 100%;}
</style>