<template>
  <div class="up_and_down">
    <el-carousel height="260px" indicator-position="none" arrow="never">
      <el-carousel-item>
        <div class="up_flow" id="screen_warn"></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  // name: "ScreenCPE",
  data() {
    return {
      screen_warn:null,

    }
  },
  created() {

  },
  beforeCreate() {
  },
  mounted() {
    this.initEcharts_warn();
    this.screenInterval = setInterval(()=>{
      this.screenAdapter()
    },500)
  },
  methods: {
    initEcharts_warn(){
      // 基于准备好的dom，初始化echarts实例
      this.screen_warn = this.$echarts.init(document.getElementById('screen_warn'))
      // 绘制图表
      this.screen_warn.setOption({
        title: {
          text: '告警个数TOP10' ,
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
          max : 100,
          min : 0,
          splitNumber : 5,
          axisLabel:{
            formatter:'{value}',
            textStyle: {
              color: '#7785D8'
            }
          },
          name:'(个)',
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
      this.screen_warn.resize();
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
