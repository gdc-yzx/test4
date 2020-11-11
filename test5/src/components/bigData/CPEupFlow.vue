<template>
  <div class="up_and_down">
    <el-carousel height="260px" indicator-position="none" arrow="never">
      <el-carousel-item>
        <div class="up_flow" id="cpe_up_flow"></div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="up_flow" id="cpe_down_flow"></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  // name: "ScreenCPE",
  data() {
    return {
      chartInstance_cpe_up_flow:null,
      chartInstance_cpe_down_flow:null
    }
  },
  created() {

  },
  beforeCreate() {
  },
  mounted() {
    this.initEcharts_up();
    this.initEcharts_down();
    this.screenInterval = setInterval(()=>{
      this.screenAdapter()
    },500)
  },
  methods: {
    initEcharts_up(){
      // 基于准备好的dom，初始化echarts实例
      this.chartInstance_cpe_up_flow = this.$echarts.init(document.getElementById('cpe_up_flow'))
      // 绘制图表
      this.chartInstance_cpe_up_flow.setOption({
        title: {
          text: 'CPE节点上行流量TOP10' ,
          x:'left',
          y:'top',
          textStyle:{
            color:'#fff',
            fontSize:16
          }
        },
        // color:['#0458CC'],
        // legend: {
        //   data: ['平均','cpu1', 'cpu2', 'cpu3', 'cpu4', 'cpu5']
        // },
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
            barWidth:'20',
            itemStyle:{
              normal:{
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: "#1653FE" // 0% 处的颜色
                },{
                  offset: 1,
                  color: "#1CAAFF" // 100% 处的颜色
                }], false)
              }
            },
          },
        ]
      });
    },
    initEcharts_down(){
      // 基于准备好的dom，初始化echarts实例
      this.chartInstance_cpe_down_flow = this.$echarts.init(document.getElementById('cpe_down_flow'))
      this.chartInstance_cpe_down_flow.setOption({
        title: {
          text: 'CPE节点下行流量TOP10' ,
          x:'left',
          y:'top',
          textStyle:{
            color:'#fff',
            fontSize:16
          }
        },
        // color:['#0458CC'],
        // legend: {
        //   data: ['平均','cpu1', 'cpu2', 'cpu3', 'cpu4', 'cpu5']
        // },
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
            barWidth:'20',
            itemStyle:{
              normal:{
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: "#1653FE" // 0% 处的颜色
                },{
                  offset: 1,
                  color: "#1CAAFF" // 100% 处的颜色
                }], false)
              }
            },
          },
        ]
      });
    },
    //屏幕适配
    screenAdapter () {
      this.chartInstance_cpe_up_flow.resize();
      this.chartInstance_cpe_down_flow.resize();
    },
  },
  destroyed () {
    // 在组件销毁的时候, 需要将监听器取消掉
    clearInterval(this.screenInterval)
  },
}
</script>

<style scoped lang="scss">

</style>
