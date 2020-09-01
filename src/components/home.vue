<template>
   <el-container class="home_container">
      <!-- 头部区域 -->
      <el-header>
         <div>
            <img src="../assets/logo.png" alt="">
            <span>电商后台管理系统</span>
         </div>
         <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <!-- 页面主体区 -->
      <el-container>
         <!-- 侧边栏 -->
         <el-aside id="side" :width="isCollapse==true?'64px':'200px'">
            <div class="toggle" @click="toggleCollapse">|||</div>
            <!-- 侧边栏菜单 -->
            <el-menu
               router
               :collapse-transition="false"
               :collapse="isCollapse"
               unique-opened
               background-color="#333744"
               text-color="#fff"
               active-text-color="#409eff">
               <!-- 一级菜单 -->
               <el-submenu :index="item.path+''" v-for="item in menulist" :key="item.id">
                  <!-- 一级菜单的模板 -->
                  <template slot="title">
                     <!-- 图标 -->
                     <i :class="iconsObj[item.id]"></i>
                     <!-- 文本 -->
                     <span>{{item.authName}}</span>
                  </template>
                  <!-- 二级菜单 -->
                  <el-menu-item :index="'/'+item1.path" v-for="item1 in item.children" :key="item1.id">
                     <template slot="title">
                        <!-- 图标 -->
                        <i class="el-icon-menu"></i>
                        <!-- 文本 -->
                        <span>{{item1.authName}}</span>
                     </template>
                  </el-menu-item>
               </el-submenu>
            </el-menu>
         </el-aside>
         <!-- 内容主题 -->
         <el-main>
            <!-- 路由占位符 -->
            <router-view></router-view>
         </el-main>
      </el-container>
   </el-container>
</template>

<script>
export default {
   data(){
      return{
         isCollapse:false,
         // 左侧菜单数据
         menulist:[],
         iconsObj:{
            '125':'el-icon-user-solid',
            '103':'el-icon-s-tools',
            '101':'el-icon-s-cooperation',
            '102':'el-icon-s-order',
            '145':'el-icon-s-platform',
         }
      }
   },
   methods:{
      logout(){
         window.sessionStorage.clear()
         this.$router.push('/login')
      },
      // 获取左侧的菜单
      async getMenuList(){
         const { data:res } = await this.axios.get('menus');
         if(res.meta.status!==200) return this.$message.error(res.meta.msg);
         this.menulist = res.data;
         console.log(res)
      },
      //点击按钮切换菜单的折叠和展开
      toggleCollapse(){
         this.isCollapse=!this.isCollapse
      }
   },
   created(){
      this.getMenuList()
   }
}
</script>

<style scoped>
.el-header{
   background-color:#373d41;
   display: flex;
   justify-content: space-between;
   padding: 0;
   align-items: center;
   color: #fff;
   font-size: 20px;
}
.el-header>div{
   display: flex;
   align-items: center;
}
.el-header>div>span{
   margin-left: 15px;
}
.el-header img{
   width: 40px;
   height: 40px;
}
.el-aside{
   background-color: #333744;
   transition: all 0.4s;
}
.el-menu{
   border-right:0;
}
.el-main{
   background-color: #eaedf1;
}
.home_container{
   height: 100%;
}
.toggle{
   font-size: 10px;
   line-height: 24px;
   color: #fff;
   text-align: center;
   letter-spacing: 0.2em;
   background-color: #4a5064;
   cursor: pointer;
}
</style>