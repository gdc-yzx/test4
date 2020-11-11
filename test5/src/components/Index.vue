<template>
  <el-container style="height: 100%">
    <el-aside width="230px">
      <div class="gdc_logo">
        <img src="../assets/gdc_logo.png" alt="">
      </div>
      <div class="nav">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          @select="handleSelect"
          background-color="#3166AC"
          text-color="#F9F7FF"
          active-text-color="#fff"
          unique-opened
          router
        >

          <el-menu-item index="/home">
            <img class="align_img_text" src="../assets/home.png" alt="">
            <span slot="title" class="align_text" style="color: #fff!important;">首页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </el-menu-item>
          <el-menu-item index="/screen">
            <img class="align_img_text" src="../assets/data.png" alt="">
            <span slot="title" class="align_text" style="color: #fff!important;">数据大屏</span>
          </el-menu-item>

          <el-submenu index="1">
            <template slot="title">
              <img class="align_img_text" src="../assets/controll.png" alt="">
              <span class="align_text">监控管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/flowControl">租户流量监控</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/cpe">CPE设备监控</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/pop">POP设备监控</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <img class="align_img_text" src="../assets/equipment.png" alt="">
              <span class="align_text">设备管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/popadmin">POP管理</el-menu-item>
              <el-menu-item index="/cpeadmin">CPE管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <img class="align_img_text" src="../assets/configuration.png" alt="">
              <span class="align_text">设备配置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <img class="align_img_text" src="../assets/business.png" alt="">
              <span class="align_text">业务编排</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <img class="align_img_text" src="../assets/warning.png" alt="">
              <span class="align_text">报警日志</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/warning">告警日志</el-menu-item>
              <el-menu-item index="/operate">操作日志</el-menu-item>
              <el-menu-item index="/safety">安全日志</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <img class="align_img_text" src="../assets/system.png" alt="">
              <span class="align_text">系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/roleManagement">角色管理</el-menu-item>
              <el-menu-item index="/userManagement">用户管理</el-menu-item>
              <el-menu-item index="/enterpriseManage">企业管理</el-menu-item>
              <el-menu-item index="/authorManage">权限管理</el-menu-item>
              <el-menu-item index="/systemConfig">系统配置</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <div class="header_info">
          <span><i><img src="../assets/warn-icon.png" alt=""></i>警告</span>
          <span><i><img src="../assets/warn-icon.png" alt=""></i>账号设置</span>
          <span><i><img src="../assets/out.png" alt=""></i>退出</span>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>

      </el-main>
    </el-container>
  </el-container>

</template>

<script>
export default {
  name: "Index",
  data() {
    return {}
  },
  created() {
  },
  beforeCreate() {
  },
  mounted() {
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key,keyPath){
      console.log(key, keyPath);
      //单独开启大屏
      if (key=='/screen'){
        this.$router.replace('/screen');
      }
    }
  }
}
</script>

<style scoped lang="scss">
.el-header{
  color: #333;
  height: 80px;
  background: #FFFFFF;
  box-shadow: 0 2px 10px 0 rgba(216, 216, 216, 0.3);
  .header_info{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    span{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-family: Lantinghei SC;
      font-weight: 200;
      color: #A3ADBA;
      cursor: pointer;
    }
    span:nth-child(2){
      margin: 0 40px;
    }
  }
}

.el-aside {
  background-color: #3166AC;
  .gdc_logo{
    padding-top: 53px;
    box-sizing: border-box;
    img{
      width: 150px;
      height: 46px;
    }
  }
  .nav{
    .el-menu{
      border-right: none !important;
    }
    .el-submenu .el-menu-item{
      background:none !important;
    }
    .el-menu-item.is-active {
      background-color: #3886E6 !important;
      color: #fff !important;
    }
    .el-menu-item-group{
      background-color: #172F7F !important;
    }
    .el-submenu__title i{
      color: #ffffff !important;
      font-size: 16px !important;
    }
    .align_img{
      vertical-align: middle;
    }
    .align_text{
      vertical-align: middle;
      font-size: 16px;
      line-height: 15px;
      margin-left: 20px;
    }
    .el-menu-item{
      color: #74B6F6 !important;
    }
  }
}

.el-main {
  background-color: #f9f7ff;
  text-align: center;
  padding: 0;
  box-sizing: border-box;
  position: relative;
}
</style>
