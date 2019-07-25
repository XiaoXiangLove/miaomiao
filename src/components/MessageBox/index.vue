<template>
    <div class="canvas">
        <div class="messageBox">
            <h2>{{title}}</h2>
            <p>{{content}}</p>
            <div class="btnGroup">
                <div v-if="cancel" @touchstart="handleCancel">{{cancel}}</div>
                <div v-if="ok" @touchstart="handleOk">{{ok}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"alert",
    data(){
        return {

        }
    }
}
</script>
<style lang="less" scoped>
.canvas{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    background: rgba(0,0,0,0.3);
.messageBox{
    width:200px;
    height:120px;
    border: 1px #ccc solid;
    border-radius: 4px;
    background: white;
    box-shadow: 3px 3px 3px 3px;
    position: absolute;
    left: 50%;top: 50%;
    margin: -60px 0 0 -100px;
    h2{
        text-align:  center;
        line-height: 40px;
        font-size: 18px;
    }
    p{
        text-align:  center;
        line-height: 40px;
    }
    .btnGroup{
        display: flex;
        position: absolute;
        bottom: 0;
        width: 100%;
        border-top: 1px #ccc solid;
        div{
            flex: 1;
            text-align: center;
            line-height: 30px;
            border-right: 1px #ccc solid;
        }
        div:last-child{border:none;}
    }
    }
}
</style>