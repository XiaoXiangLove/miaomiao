<template>
    <div id="main">
        <Head :title="'我的喵喵'"/>
        <div id="content">
            <router-view />
        </div>
        <Foot/>
    </div>
</template>

<script>
import Head from "@/components/Header/Header.vue"
import Foot from "@/components/Footer/Footer.vue"
export default {
    name:"mine",
    data(){
        return {

        }
    },
    components:{
        Head,
        Foot
    }
}
</script>
<style lang="less" scoped>

</style>