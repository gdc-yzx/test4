import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import Login from "../components/Login";
// import Index from "../components/Index";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: resolve => require(['../components/Login'], resolve),
    },
    {
      path:"/screen",
      component:resolve => require(['../components/bigData/BigData'], resolve),
      name:'BigData'
    },
    {
      path: '/',
      redirect: '/login',
      component:  resolve => require(['../components/Index'], resolve),
      children:[
        {
          path:"/home",
          component:resolve => require(['../components/home/Home'], resolve),
          name:'home'
        },
        //角色管理
        {
          path:"/roleManagement",
          component:resolve => require(['../components/system/RoleManagement'], resolve),
          name:'roleManagement'
        },
        //用户管理
        {
          path:"/userManagement",
          component:resolve => require(['../components/system/UserManagement'], resolve),
          name:'userManagement'
        },
        //企业管理
        {
          path:"/enterpriseManage",
          component:resolve => require(['../components/system/EnterpriseManage'], resolve),
          name:'enterpriseManage'
        },
        //权限管理
        {
          path:"/authorManage",
          component:resolve => require(['../components/system/AuthorManage'], resolve),
          name:'authorManage'
        },
        //系统配置
        {
          path:"/systemConfig",
          component:resolve => require(['./components/system/systemConfig'], resolve),
          name:'systemConfig'
        },


        //cpe设备监控
        {
          path:"/flowControl",
          component:resolve => require(['../components/monitoring/FlowControl'], resolve),
          name:'flowControl'
        },
        //cpe设备监控
        {
          path:"/cpe",
          component:resolve => require(['../components/monitoring/CPE'], resolve),
          name:'cpe'
        },
        //pop设备监控
        {
          path:"/pop",
          component:resolve => require(['../components/monitoring/POP'], resolve),
          name:'pop'
        },
        //告警日志
        {
          path:"/warning",
          component:resolve => require(['../components/warn/Warning'], resolve),
          name:'warning'
        },
        //操作日志
        {
          path:"/operate",
          component:resolve => require(['../components/warn/Operate'], resolve),
          name:'operate'
        },
        //安全日志
        {
          path:"/safety",
          component:resolve => require(['../components/warn/Safety'], resolve),
          name:'safety'
        },
        //pop管理
        {
          path:"/popadmin",
          component:resolve => require(['../components/deviceAdmin/POPadmin'], resolve),
          name:'popadmin'
        },
        //cpe管理
        {
          path:"/cpeadmin",
          component:resolve => require(['../components/deviceAdmin/CPEadmin'], resolve),
          name:'cpeadmin'
        },
      ]
    }
  ]
})
