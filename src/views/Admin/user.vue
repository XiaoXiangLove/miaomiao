<template>
    <div id="user">
        <el-table
        :data="tableData"
        height="250"
        border-style="width: 100%">
        <el-table-column
          prop="date"
          label="日期" >
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>
        <el-table-column
          label="操作">
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
export default {
  name:"users",
  data(){
    return {
      tableData:[]
    }
  },
  mounted(){
    console.log(123);
    this.axios.get("/api2/admin/userList").then((res)=>{
      console.log(res);
      if(res.data.status===0){
        this.tableData = res.data.data.userList;
      }
    })
  }
}
</script>
<style lang="less" scoped>
</style>