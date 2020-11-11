<template>
  <div class="up_and_down">
    <el-carousel height="260px" indicator-position="none" arrow="never">
      <el-carousel-item>
        <div class="up_flow" id="device_load"></div>
      </el-carousel-item>
      <el-carousel-item style="position: relative">
        <div class="up_flow" id="area_list"></div>
        <div class="legend_trip">
          <i style="background-color: #5F45FF;"></i>
          <span style="color: #5F45FF;">CPU</span>
          <i style="background-color: #02CDFF;"></i>
          <span style="color: #02CDFF;">内存</span>
          <i style="background-color: #FFE032;"></i>
          <span style="color: #FFE032;">磁盘</span>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  // name: "ScreenCPE",
  data() {
    return {
      chartInstance_device_load:null,
      chartInstance_area_list:null
    }
  },
  created() {

  },
  beforeCreate() {
  },
  mounted() {
    this.initEcharts_device_load();
    this.initEcharts_area_list();
    this.screenInterval = setInterval(()=>{
      this.screenAdapter()
    },500)
  },
  methods: {
    initEcharts_device_load(){
      // 基于准备好的dom，初始化echarts实例
      this.chartInstance_device_load = this.$echarts.init(document.getElementById('device_load'))
      // 绘制图表
      this.chartInstance_device_load.setOption({
        title: {
          text: '设备负载TOP10' ,
          x:'left',
          y:'top',
          textStyle:{
            color:'#fff',
            fontSize:16
          }
        },
        color:['#5F45FF','#02CDFF','#FFE032'],
        legend: {
          data: [
            {
              name:'CPU',
              textStyle:{
                color:'#5F45FF'
              }
            },
            {
              name:'内存',
              textStyle:{
                color:'#02CDFF'
              }
            },
            {
              name:'磁盘',
              textStyle:{
                color:'#FFE032'
              }
            },
          ],
          right:30,
          icon: 'rect',
          itemHeight: 7, //修改icon图形大小
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: ['1','2','3','4','5','6','7','8','9'],
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          },
          axisLabel:{
            interval: 0,
            rotate:0,
            textStyle: {
              color: '#7785D8'
            }
          },
          nameTextStyle:{
            color: '#7785D8'
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
          axisLabel:{
            formatter:'{value}',
            textStyle: {
              color: '#7785D8'
            }
          },
          name:'(B/S)',
          nameTextStyle:{
            color: '#7785D8'
          },
          splitLine:{
            show:true,
            lineStyle: {
              color:'#242D81'
            }
          }


        },
        series: [
          {
            data: [2, 4, 3, 6, 5, 7],
            type: 'bar',
            barWidth:'6',
            name:'CPU',
            itemStyle:{
              normal:{
                color: '#5F45FF'
              }
            },
          },
          {
            data: [2, 4, 3, 6, 5, 7],
            type: 'bar',
            barWidth:'6',
            name:'内存',
            itemStyle:{
              normal:{
                color: '#02CDFF'
              }
            },
          },
          {
            data: [2, 4, 3, 6, 5, 7],
            type: 'bar',
            barWidth:'6',
            name:'磁盘',
            itemStyle:{
              normal:{
                color: '#FFE032'
              }
            },
          },
        ]
      });
    },
    initEcharts_area_list(){
      // 基于准备好的dom，初始化echarts实例
      this.chartInstance_area_list = this.$echarts.init(document.getElementById('area_list'))
      this.chartInstance_area_list.setOption({
        title: {
          text: '地区分布' ,
          x:'left',
          y:'top',
          textStyle:{
            color:'#fff',
            fontSize:16
          }
        },
        color:['#5F45FF','#02CDFF','#FFE032'],
        /*legend: {
          data: [
            {
              name:'POP',
              textStyle:{
                color:'#5F45FF'
              }
            },
            {
              name:'CPE',
              textStyle:{
                color:'#02CDFF'
              }
            },
            {
              name:'云网关',
              textStyle:{
                color:'#FFE032'
              }
            },
          ],
          right:30,
          icon: 'rect',
          itemHeight: 7, //修改icon图形大小
        },*/
        tooltip: {},
        xAxis: {
          type: 'category',
          data: ['1','2','3','4','5','6','7','8','9'],
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          },
          axisLabel:{
            interval: 0,
            rotate:0,
            textStyle: {
              color: '#7785D8'
            }
          },
          nameTextStyle:{
            color: '#7785D8'
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
          axisLabel:{
            formatter:'{value}',
            textStyle: {
              color: '#7785D8'
            }
          },
          name:'(B/S)',
          nameTextStyle:{
            color: '#7785D8'
          },
          splitLine:{
            show:true,
            lineStyle: {
              color:'#242D81'
            }
          }


        },
        series: [
          {
            data: [2, 4, 3, 6, 5, 7],
            type: 'bar',
            barWidth:'6',
            name:'CPU',
            itemStyle:{
              normal:{
                color: '#5F45FF'
              }
            },
          },
          {
            data: [2, 4, 3, 6, 5, 7],
            type: 'bar',
            barWidth:'6',
            name:'内存',
            itemStyle:{
              normal:{
                color: '#02CDFF'
              }
            },
          },
          {
            data: [2, 4, 3, 6, 5, 7],
            type: 'bar',
            barWidth:'6',
            name:'磁盘',
            itemStyle:{
              normal:{
                color: '#FFE032'
              }
            },
          },
        ]
      });
    },
    //屏幕适配
    screenAdapter () {
      this.chartInstance_device_load.resize();
      this.chartInstance_area_list.resize();
    },
  },
  destroyed () {
    // 在组件销毁的时候, 需要将监听器取消掉
    clearInterval(this.screenInterval)
  },
}
</script>

<style scoped lang="scss">
.legend_trip{
  position: absolute;
  right: 36px;
  top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  i{
    width: 20px;
    height: 8px;
    margin-right: 5px;
  }
  span{
    font-size: 12px;
    font-family: "Microsoft YaHei";
    font-weight: 500;
    margin-right: 15px;
  }
}
</style>
