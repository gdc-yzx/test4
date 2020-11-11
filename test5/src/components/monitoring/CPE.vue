<template>
  <div class="control_content">
      <div class="control_content_left">
        <el-menu
          default-active="1-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          @select="handleSelect"
          unique-opened
        >
          <el-submenu index="1">
            <template slot="title">
              <span class="align_text">广大通</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">直销最终用户A</el-menu-item>
              <el-menu-item index="1-2">直销最终用户A</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <span class="align_text">广大通</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">直销最终用户A</el-menu-item>
              <el-menu-item index="2-2">直销最终用户A</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="control_content_right">
        <div class="content_time">
          <span :class="selectedStyle === 1 ?'select_span':''" @click="changTab(1)">24小时</span>
          <span :class="selectedStyle === 2 ?'select_span':''" @click="changTab(2)">一周</span>
          <span :class="selectedStyle === 3 ?'select_span':''" @click="changTab(3)">实时</span>
        </div>
        <div class="content_echarts_system">
            <div class="system_target">
              <el-collapse v-model="activeSystem" @change="handleChangeSystem">
                <el-collapse-item title="系统指标" name="1">
                  <div class="echarts_item">
                    <div id="cpu" class="echarts_border"></div>
                    <div id="memory" class="echarts_border"></div>
                    <div id="network" class="echarts_border"></div>
                    <div id="hard_disk" class="echarts_border"></div>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
        </div>
        <div class="content_echarts_system">
          <div class="system_target">
            <el-collapse v-model="activeBusiness" @change="handleChangeSystem">
              <el-collapse-item title="业务指标" name="1">
                <div class="echarts_item">
                  <div id="wan" class="echarts_border"></div>
                  <div id="lan" class="echarts_border"></div>
                  <div id="fourG" class="echarts_border"></div>
                  <div id="wifi" class="echarts_border"></div>
                  <div id="tunnel" class="echarts_border"></div>
                  <div id="business" class="echarts_border"></div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "CPE",
  data() {
    return {
      selectedStyle:1,
      activeSystem:['1'],
      times:[],


      chartInstane_cpu:null,
      chartInstane_memory:null,
      chartInstane_network:null,
      chartInstane_hard_disk:null,

      chartInstane_wan:null,
      chartInstane_lan:null,
      chartInstane_fourG:null,
      chartInstane_wifi:null,
      chartInstane_tunnel:null,
      chartInstane_business:null,

      activeBusiness:['1'],
      screenInterval:null
    }
  },
  created() {
    this.times = this.get24Hour();
  },
  beforeCreate() {
  },
  mounted() {
    //系统指标
    this.initEcharts_cpu();
    this.initEcharts_memory();
    this.initEcharts_network();
    this.initEcharts_hard_disk();
    //业务指标
    this.initEcharts_wan();
    this.initEcharts_lan();
    this.initEcharts_fourG();
    this.initEcharts_wifi();
    this.initEcharts_tunnel();
    this.initEcharts_business();
    // window.addEventListener('resize', this.screenAdapter)
    // this.screenAdapter()
    this.screenInterval = setInterval(()=>{
      this.screenAdapter()
    },500)
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
      this.selectedStyle = 1;
      this.times = this.get24Hour();
      this.changTab(1)
    },
    changTab(index){
      this.selectedStyle = index;
      if (index == 1){
        this.times = []
        this.times = this.get24Hour();
      }
      if (index == 2){
        this.times = []
        this.times = this.formatWeek();
      }
      if (index == 3){
        // this.times = []
        // this.times = this.formatWeek();
      }
      this.initEcharts_cpu();
      this.initEcharts_memory();
      this.initEcharts_network();
      this.initEcharts_hard_disk();

      this.initEcharts_wan();
      this.initEcharts_lan();
      this.initEcharts_fourG();
      this.initEcharts_wifi();
      this.initEcharts_tunnel();
      this.initEcharts_business();
    },
    handleChangeSystem(val){
      console.log(val);
    },
    //系统指标
    initEcharts_cpu(){
      // 基于准备好的dom，初始化echarts实例
      this.chartInstane_cpu = this.$echarts.init(document.getElementById('cpu'))
      // 绘制图表
      this.chartInstane_cpu.setOption({
        title: {
          text: 'CPU使用率' ,
          x:'center',
          y:'bottom'
        },
        color:['#65D6B6','#8BC6FF','#2C89E2','#0458CC'],
        legend: {
          data: ['平均','cpu1', 'cpu2', 'cpu3', 'cpu4', 'cpu5'],
          x:'right',
          padding:[20,60,0,0]
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: this.times,
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          },
          axisLabel:{
            interval: 0,
            rotate:this.selectedStyle !=1 ? 0 : 45
          },
          nameTextStyle:{
            color: '#949EAD'
          }
        },
        yAxis: {
          type: 'value',
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          },
          scale : true,
          max : 100,
          min : 0,
          splitNumber : 5,
          axisLabel:{formatter:'{value} %'}

        },
        series: [
          {
          data: [20, 40, 30, 68, 70, 100],
          type: 'line',
          smooth: true,
          symbol: 'none',
            name:'平均',
            stack: '平均',
            itemStyle : {
              normal : {
                lineStyle:{
                  color:'#65D6B6'
                }
              }
            },
        },
          {
            data: [30, 60, 30, 48, 90, 10],
            type: 'line',
            smooth: true,
            symbol: 'none',
            name:'cpu1',
            itemStyle : {
              normal : {
                lineStyle:{
                  color:'#8BC6FF'
                }
              }
            },

          }
        ]
      });
    },
    initEcharts_memory(){
      // 基于准备好的dom，初始化echarts实例
      this.chartInstane_memory = this.$echarts.init(document.getElementById('memory'))
      // 绘制图表
      this.chartInstane_memory.setOption({
        title: {
          text: '内存使用率' ,
          x:'center',
          y:'bottom'
        },
        color:['#0458CC'],
        // legend: {
        //   data: ['平均','cpu1', 'cpu2', 'cpu3', 'cpu4', 'cpu5']
        // },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: this.times,
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          },
          axisLabel:{
            interval: 0,
            rotate:this.selectedStyle !=1 ? 0 : 45
          },
          nameTextStyle:{
            color: '#949EAD'
          }
        },
        yAxis: {
          type: 'value',
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          },
          scale : true,
          max : 100,
          min : 0,
          splitNumber : 5,
          axisLabel:{formatter:'{value} %'}

        },
        series: [
          {
            data: [20, 40, 30, 68, 70, 70],
            type: 'line',
            smooth: true,
            symbol: 'none',
            name:'平均',
            // stack: '平均',
            stack: 'all',    //堆叠图设置
            areaStyle: {
              color:'#B4DBFF',
              opacity:0.3,
              origin:'start'
            },   //堆叠图设置
            itemStyle : {
              normal : {
                lineStyle:{
                  color:'#0458CC'
                }
              }
            },

          },
          /*{
            data: [30, 60, 30, 48, 90, 10],
            type: 'line',
            smooth: true,
            symbol: 'none',
            name:'cpu1',
            stack: 'all',
            itemStyle : {
              normal : {
                lineStyle:{
                  color:'#8BC6FF'
                }
              }
            },
            areaStyle: {}

          }*/
        ]
      });
      /*window.addEventListener("resize", function () {
        this.chartInstane.resize();
      })*/
    },
    initEcharts_network(){
      // 基于准备好的dom，初始化echarts实例
      this.chartInstane_network = this.$echarts.init(document.getElementById('network'))
      // 绘制图表
      this.chartInstane_network.setOption({
        title: {
          text: '网卡使用率' ,
          x:'center',
          y:'bottom'
        },
        color:['#65D6B6','#8BC6FF','#2C89E2','#0458CC'],
        legend: {

          data: ['网卡1','网卡2', '网卡3',  '网卡4', '网卡5'],
          x:'right',
          padding:[20,60,0,0]
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: this.times,
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          },
          axisLabel:{
            interval: 0,
            rotate:this.selectedStyle !=1 ? 0 : 45
          },
          nameTextStyle:{
            color: '#949EAD'
          }
        },
        yAxis: {
          type: 'value',
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          },
          scale : true,
          max : 100,
          min : 0,
          splitNumber : 5,
          axisLabel:{formatter:'{value} %'}

        },
        series: [
          {
            data: [20, 40, 30, 68, 70, 100],
            type: 'line',
            smooth: true,
            symbol: 'none',
            name:'网卡1',
            stack: '网卡1',
            itemStyle : {
              normal : {
                lineStyle:{
                  color:'#65D6B6'
                }
              }
            },
          },
          {
            data: [30, 60, 30, 48, 90, 10],
            type: 'line',
            smooth: true,
            symbol: 'none',
            name:'网卡2',
            itemStyle : {
              normal : {
                lineStyle:{
                  color:'#8BC6FF'
                }
              }
            },

          }
        ]
      });
      /*window.addEventListener("resize", function () {
        this.chartInstane.resize();
      })*/
    },
    initEcharts_hard_disk(){
      // 基于准备好的dom，初始化echarts实例
      this.chartInstane_hard_disk = this.$echarts.init(document.getElementById('hard_disk'))
      // 绘制图表
      this.chartInstane_hard_disk.setOption({
        title: {
          text: '硬盘使用率' ,
          x:'center',
          y:'bottom'
        },
        color:['#65D6B6','#8BC6FF','#2C89E2','#0458CC'],
        legend: {

          data: ['硬盘1','硬盘2', '硬盘3',  '硬盘4', '硬盘5'],
          x:'right',
          padding:[20,60,0,0]
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: this.times,
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          },
          axisLabel:{
            interval: 0,
            rotate:this.selectedStyle !=1 ? 0 : 45
          },
          nameTextStyle:{
            color: '#949EAD'
          }
        },
        yAxis: {
          type: 'value',
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          },
          scale : true,
          max : 100,
          min : 0,
          splitNumber : 5,
          axisLabel:{formatter:'{value} %'}

        },
        series: [
          {
            data: [20, 40, 30, 68, 70, 100],
            type: 'line',
            smooth: true,
            symbol: 'none',
            name:'硬盘1',
            // stack: '硬盘1',
            itemStyle : {
              normal : {
                lineStyle:{
                  color:'#65D6B6'
                }
              }
            },
          },
          {
            data: [30, 60, 30, 48, 90, 10],
            type: 'line',
            smooth: true,
            symbol: 'none',
            name:'硬盘2',
            itemStyle : {
              normal : {
                lineStyle:{
                  color:'#8BC6FF'
                }
              }
            },

          }
        ]
      });
      /*window.addEventListener("resize", function () {
        this.chartInstane.resize();
      })*/
    },
    //业务指标
    initEcharts_wan(){
      // 基于准备好的dom，初始化echarts实例
      this.chartInstane_wan = this.$echarts.init(document.getElementById('wan'))
      // 绘制图表
      this.chartInstane_wan.setOption({
        title: {
          text: 'WAN流量' ,
          x:'center',
          y:'bottom'
        },
        color:['#65D6B6','#8BC6FF','#2C89E2','#0458CC'],
        legend: {
          data: ['接入流量','输出流量'],
          x:'right',
          padding:[20,60,0,0]
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: this.times,
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          },
          axisLabel:{
            interval: 0,
            rotate:this.selectedStyle !=1 ? 0 : 45
          },
          nameTextStyle:{
            color: '#949EAD'
          }
        },
        yAxis: {
          type: 'value',
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          },
          scale : true,
          max : 10,
          min : 0,
          splitNumber : 5,
          axisLabel:{formatter:'{value}'},
          name:'(M)'

        },
        series: [
          {
            data: [2, 4, 3, 6, 5, 7],
            type: 'line',
            smooth: true,
            symbol: 'none',
            name:'接入流量',
            stack: '接入流量',
            itemStyle : {
              normal : {
                lineStyle:{
                  color:'#65D6B6'
                }
              }
            },
          },
          {
            data: [3, 6, 3, 4, 9, 1],
            type: 'line',
            smooth: true,
            symbol: 'none',
            name:'输出流量',
            itemStyle : {
              normal : {
                lineStyle:{
                  color:'#8BC6FF'
                }
              }
            },

          }
        ]
      });

    },
    initEcharts_lan(){
      // 基于准备好的dom，初始化echarts实例
      this.chartInstane_lan = this.$echarts.init(document.getElementById('lan'))
      // 绘制图表
      this.chartInstane_lan.setOption({
        title: {
          text: 'LAN流量' ,
          x:'center',
          y:'bottom'
        },
        color:['#65D6B6','#8BC6FF'],
        legend: {
          data: ['接入流量','输出流量'],
          x:'right',
          padding:[20,60,0,0]
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: this.times,
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          },
          axisLabel:{
            interval: 0,
            rotate:this.selectedStyle !=1 ? 0 : 45
          },
          nameTextStyle:{
            color: '#949EAD'
          }
        },
        yAxis: {
          type: 'value',
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          },
          scale : true,
          max : 10,
          min : 0,
          splitNumber : 5,
          axisLabel:{formatter:'{value}'},
          name:'(M)'

        },
        series: [
          {
            data: [2, 4, 3, 6, 5, 7],
            type: 'line',
            smooth: true,
            symbol: 'none',
            name:'接入流量',
            stack: '接入流量',
            itemStyle : {
              normal : {
                lineStyle:{
                  color:'#65D6B6'
                }
              }
            },
          },
          {
            data: [3, 6, 3, 4, 9, 1],
            type: 'line',
            smooth: true,
            symbol: 'none',
            name:'输出流量',
            itemStyle : {
              normal : {
                lineStyle:{
                  color:'#8BC6FF'
                }
              }
            },

          }
        ]
      });

    },
    initEcharts_fourG(){
      // 基于准备好的dom，初始化echarts实例
      this.chartInstane_fourG = this.$echarts.init(document.getElementById('fourG'))
      // 绘制图表
      this.chartInstane_fourG.setOption({
        title: {
          text: '4G' ,
          x:'center',
          y:'bottom'
        },
        color:['#65D6B6','#8BC6FF'],
        legend: {
          data: ['上传','下载'],
          x:'right',
          padding:[20,60,0,0]
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: this.times,
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          },
          axisLabel:{
            interval: 0,
            rotate:this.selectedStyle !=1 ? 0 : 45
          },
          nameTextStyle:{
            color: '#949EAD'
          }
        },
        yAxis: {
          type: 'value',
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          },
          scale : true,
          max : 10,
          min : 0,
          splitNumber : 5,
          axisLabel:{formatter:'{value}'},
          name:'(Mbit/s)'

        },
        series: [
          {
            data: [2, 4, 3, 6, 5, 7],
            type: 'line',
            smooth: true,
            symbol: 'none',
            name:'接入流量',
            stack: '接入流量',
            itemStyle : {
              normal : {
                lineStyle:{
                  color:'#65D6B6'
                }
              }
            },
          },
          {
            data: [3, 6, 3, 4, 9, 1],
            type: 'line',
            smooth: true,
            symbol: 'none',
            name:'输出流量',
            itemStyle : {
              normal : {
                lineStyle:{
                  color:'#8BC6FF'
                }
              }
            },

          }
        ]
      });

    },
    initEcharts_wifi(){
      // 基于准备好的dom，初始化echarts实例
      this.chartInstane_wifi = this.$echarts.init(document.getElementById('wifi'))
      // 绘制图表
      this.chartInstane_wifi.setOption({
        title: {
          text: 'WIFI' ,
          x:'center',
          y:'bottom'
        },
        color:['#65D6B6','#8BC6FF'],
        legend: {
          data: ['上传','下载'],
          x:'right',
          padding:[20,60,0,0]
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: this.times,
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          },
          axisLabel:{
            interval: 0,
            rotate:this.selectedStyle !=1 ? 0 : 45
          },
          nameTextStyle:{
            color: '#949EAD'
          }
        },
        yAxis: {
          type: 'value',
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          },
          scale : true,
          max : 10,
          min : 0,
          splitNumber : 5,
          axisLabel:{formatter:'{value}'},
          name:'(Mbit/s)'

        },
        series: [
          {
            data: [2, 4, 3, 6, 5, 7],
            type: 'line',
            smooth: true,
            symbol: 'none',
            name:'接入流量',
            stack: '接入流量',
            itemStyle : {
              normal : {
                lineStyle:{
                  color:'#65D6B6'
                }
              }
            },
          },
          {
            data: [3, 6, 3, 4, 9, 1],
            type: 'line',
            smooth: true,
            symbol: 'none',
            name:'输出流量',
            itemStyle : {
              normal : {
                lineStyle:{
                  color:'#8BC6FF'
                }
              }
            },

          }
        ]
      });

    },
    initEcharts_tunnel(){
      // 基于准备好的dom，初始化echarts实例
      this.chartInstane_tunnel = this.$echarts.init(document.getElementById('tunnel'))
      // 绘制图表
      this.chartInstane_tunnel.setOption({
        title: {
          text: '隧道流量' ,
          x:'center',
          y:'bottom'
        },
        color:['#0458CC'],
        // legend: {
        //   data: ['平均','cpu1', 'cpu2', 'cpu3', 'cpu4', 'cpu5']
        // },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: this.times,
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          },
          axisLabel:{
            interval: 0,
            rotate:this.selectedStyle !=1 ? 0 : 45
          },
          nameTextStyle:{
            color: '#949EAD'
          }
        },
        yAxis: {
          type: 'value',
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          },
          scale : true,
          max : 10,
          min : 0,
          splitNumber : 5,
          axisLabel:{formatter:'{value}'},
          name:'(M)'

        },
        series: [
          {
            data: [2, 4, 3, 6, 5, 7],
            type: 'line',
            smooth: true,
            symbol: 'none',
            name:'平均',
            // stack: '平均',
            stack: 'all',    //堆叠图设置
            areaStyle: {
              color:'#B4DBFF',
              opacity:0.3,
              origin:'start'
            },   //堆叠图设置
            itemStyle : {
              normal : {
                lineStyle:{
                  color:'#0458CC'
                }
              }
            },

          },
          /*{
            data: [30, 60, 30, 48, 90, 10],
            type: 'line',
            smooth: true,
            symbol: 'none',
            name:'cpu1',
            stack: 'all',
            itemStyle : {
              normal : {
                lineStyle:{
                  color:'#8BC6FF'
                }
              }
            },
            areaStyle: {}

          }*/
        ]
      });
      /*window.addEventListener("resize", function () {
        this.chartInstane.resize();
      })*/
    },
    initEcharts_business(){
      // 基于准备好的dom，初始化echarts实例
      this.chartInstane_business = this.$echarts.init(document.getElementById('business'))
      // 绘制图表
      this.chartInstane_business.setOption({
        title: {
          text: '业务类型流量' ,
          x:'center',
          y:'bottom'
        },
        color:['#0458CC'],
        // legend: {
        //   data: ['平均','cpu1', 'cpu2', 'cpu3', 'cpu4', 'cpu5']
        // },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: this.times,
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          },
          axisLabel:{
            interval: 0,
            rotate:this.selectedStyle !=1 ? 0 : 45
          },
          nameTextStyle:{
            color: '#949EAD'
          }
        },
        yAxis: {
          type: 'value',
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          },
          scale : true,
          max : 10,
          min : 0,
          splitNumber : 5,
          axisLabel:{formatter:'{value}'},
          name:'(M)'

        },
        series: [
          {
            data: [2, 4, 3, 6, 7, 8],
            type: 'line',
            smooth: true,
            symbol: 'none',
            name:'平均',
            // stack: '平均',
            stack: 'all',    //堆叠图设置
            areaStyle: {
              color:'#B4DBFF',
              opacity:0.3,
              origin:'start'
            },   //堆叠图设置
            itemStyle : {
              normal : {
                lineStyle:{
                  color:'#0458CC'
                }
              }
            },

          },
          /*{
            data: [30, 60, 30, 48, 90, 10],
            type: 'line',
            smooth: true,
            symbol: 'none',
            name:'cpu1',
            stack: 'all',
            itemStyle : {
              normal : {
                lineStyle:{
                  color:'#8BC6FF'
                }
              }
            },
            areaStyle: {}

          }*/
        ]
      });
      /*window.addEventListener("resize", function () {
        this.chartInstane.resize();
      })*/
    },
    //屏幕适配
    screenAdapter () {
      this.chartInstane_cpu.resize()
      this.chartInstane_memory.resize()
      this.chartInstane_network.resize()
      this.chartInstane_hard_disk.resize()

      this.chartInstane_wan.resize()
      this.chartInstane_lan.resize()
      this.chartInstane_fourG.resize()
      this.chartInstane_wifi.resize()
      this.chartInstane_tunnel.resize()
      this.chartInstane_business.resize()
    },
    //格式化时间
    formatTime(chinaStandard){
      let date = new Date(chinaStandard);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      let minute = date.getMinutes();
      minute = minute < 10 ? ('0' + minute) : minute;
      let time = h+':'+minute;
      return time
    },
    //24小时
    get24Hour(){
      const timesArr =[];
      for (let i = 0; i<24;i++){
        let frontOneHour = new Date(new Date().getTime() - i * 60 * 60 * 1000);
        this.formatTime(frontOneHour)
        timesArr.push(this.formatTime(frontOneHour))
        // console.log('前',i,'个小时',new Date(new Date().getTime() - i * 60 * 60 * 1000)) // 前N个小时
      }
      return timesArr
      // console.log(this.times);
    },
    //格式一周的时间
    formatWeek(){
      const arr=[]
      for (let i = 1; i <= 7; i++) {
        const time = new Date(new Date().setDate(new Date().getDate() + i - 7));
        const year = time.getFullYear();
        const month = `0${time.getMonth() + 1}`.slice(-2);
        const strDate = `0${time.getDate()}`.slice(-2);
        arr.push(`${month}-${strDate}`);
      }
      return arr

    },

  },
  destroyed () {
    // 在组件销毁的时候, 需要将监听器取消掉
    // window.removeEventListener('resize', this.screenAdapter)
    clearInterval(this.screenInterval)
  },

}
</script>

<style scoped lang="scss">
.content_time{
  height: 89px;
  display: flex;
  flex-direction: row;
  background-color: #f9f7ff;
  padding-top: 30px;
  box-sizing: border-box;
  span{
    width: 120px;
    height: 40px;
    background: #FFFFFF;
    border: 1px solid #CACACA;
    border-radius: 5px;
    font-size: 16px;
    font-family: "Microsoft YaHei";
    //font-weight: 200;
    color: #000000;
    line-height: 40px;
    cursor: pointer;
    margin-right: 11px;
    font-weight: 500;
  }
  .select_span{
    color: #fff;
    background: #3166AC;
    border-radius: 5px;
    border: 1px solid #3166AC;
  }
}
.content_echarts_system{
  background-color: #fff;
  border: 1px solid #E1E5E9;
  box-shadow: 2px 1px 10px 0px rgba(213, 213, 213, 0.3);
  margin-bottom: 10px;
  border-radius: 5px;
  .system_target{
    padding: 30px 35px;
    box-sizing: border-box;
    margin-bottom: 10px;
    .echarts_item{
      width: 100%;
      height: 100%;
      //background-color: palegoldenrod;
      display: flex;
      flex-direction: row;
      //justify-content: left;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }

  }

}
</style>
