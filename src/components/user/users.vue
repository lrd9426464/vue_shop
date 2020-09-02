<template>
   <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
         <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item >用户管理</el-breadcrumb-item>
         <el-breadcrumb-item >用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图区 -->
      <el-card>
         <el-row :gutter="20">
            <el-col :span="8">
               <el-input @clear="getUsersList" clearable v-model="queryinfo.query" placeholder="请输入内容">
                  <el-button @click="getUsersList" slot="append" icon="el-icon-search"></el-button>
               </el-input>
            </el-col>
            <el-col :span="4">
               <el-button type="primary">添加用户</el-button>
            </el-col>
         </el-row>

         <!-- 用户列表区 -->
         <el-table :data="userList" style="width: 100%" border stripe>
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="username" label="姓名" width="180"></el-table-column>
            <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="role_name" label="角色"></el-table-column>
            <el-table-column label="状态">
               <template v-slot="slotProps">
                  <el-switch @change="stateChange(slotProps.row)" v-model="slotProps.row.mg_state"></el-switch>
               </template>
            </el-table-column>
            <el-table-column label="操作">
               <!-- <template v-slot="slotProps"> -->
                  <!-- 修改 -->
                  <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
                     <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
                  </el-tooltip>
                  <!-- 分配角色按钮 -->
                  <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                     <el-button size="mini" type="warning" icon="el-icon-setting"></el-button>
                  </el-tooltip>
                  <!-- 删除 -->
                  <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
                     <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
                  </el-tooltip>
                  <!-- {{slotProps}} -->
               <!-- </template> -->
            </el-table-column>
         </el-table>

         <!-- 分页区域 -->
         <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryinfo.pagenum"
            :page-sizes="[1, 2, 5, 10]"
            :page-size="queryinfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
         </el-pagination>
      </el-card>
   </div>
</template>

<script>
export default {
   data(){
      return {
         //获取用户列表的参数对象
         queryinfo:{
            query:"",
            //当前页码
            pagenum:1,
            //每页显示多少条数据
            pagesize:2
         },
         userList:[],
         total:0
      }
   },
   methods:{
      async getUsersList(){
         const {data:res}=await this.axios.get("users",{params:this.queryinfo});
         if(res.meta.status!==200) return this.$message.error("获取用户列表数据失败！")
         this.userList=res.data.users;
         this.total=res.data.total;
         // console.log(this.userList)
      },
      //监听pagesize的事件
      handleSizeChange(newSize){
         // console.log(newSize)
         this.queryinfo.pagesize=newSize;
         this.getUsersList();
      },
      //监听页码值改变的事件
      handleCurrentChange(newNum){
         // console.log(newCount)
         this.queryinfo.pagenum=newNum;
         this.getUsersList();
      },
      //监听switch状态的改变
      async stateChange(userinfo){
         const {data:res}=await this.axios.put(`users/${userinfo.id}/state/${userinfo.mg_state}`)
         if(res.meta.status!==200){
            userinfo.mg_state=!userinfo.mg_state;
            return this.$message.error("用户状态更新失败")
         }else{
            this.$message.success("用户状态更新成功")
         }
      }
   },
   created(){
      this.getUsersList()
   }
}
</script>

<style scoped>

</style>